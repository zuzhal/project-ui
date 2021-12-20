<script lang="ts">
import { StepTypes, experimentSteps } from "@/data-models/constants";
import { ExperimentTimes, FlankerStimulus } from "@/data-models/models";
import { ExpEnvSettings } from "@/data-models/models";
import { getItemsFrom } from "@/helpers";
import {
  fromEvent,
  interval,
  merge,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from "rxjs";
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    // eslint-disable-next-line no-unused-vars
    const store = useStore();

    const isFullScreen = ref(false);
    // const nBlocks = ref(2);
    const nTasks = ref(5); // TODO from BE
    let nBlocksCopy = ref(2);
    let nTasksCopy = ref(5);
    const fixationTaskTime = ref(2000);

    /* Start Experiment */
    getExperimentConfig();
    subjectMerge();

    const key$ = reactive(fromEvent(window, "keyup"));
    const keyListener = () =>
      key$.pipe(takeUntil(onDestroy)).subscribe(() => {});
    onMounted(keyListener);

    const onDestroy = reactive(new Subject());
    const onExpFinish = reactive(new Subject());
    const finishSubscribtions = () => {
      onDestroy.next(null);
      onExpFinish.next(null);
    };
    onUnmounted(finishSubscribtions);

    const steps = experimentSteps;
    let currentStep = ref(StepTypes.Instructions);
    const nextStepComponent = computed(() => {
      return steps[currentStep.value].component;
    });

    let stimulus = reactive({} as FlankerStimulus);
    const stimulusText = computed(() => {
      return stimulus.text;
    });

    const bgColor = computed(() => {
      return {
        backgroundColor: `rgb(${experimentEnvSettings.background})`,
      };
    });

    const isFixationRest = ref(true);
    const changeFixationType = computed(() => {
      return isFixationRest;
    });

    const isEnd = ref(false);
    const isEndComp = computed(() => {
      return isEnd.value;
    });

    let experimentEnvSettings = reactive({} as ExpEnvSettings);
    let experimentTimes = reactive({} as ExperimentTimes);
    let itiTimesGenerator = reactive({}); // TODO TR, safety, also from BE right now, its manually calculated and put in the database
    let stimuliGenerator = ref<Generator>();
    function getExperimentConfig() {
      experimentEnvSettings =
        store.getters["experimentConfig/experimentEnvSettings"];
      experimentTimes = experimentEnvSettings.times;
      stimuliGenerator.value = getItemsFrom(
        store.getters["experimentConfig/stimuliSet"]
      );
      itiTimesGenerator = setItiTimesGenerator();
      console.log(experimentEnvSettings);
    }

    function setItiTimesGenerator() {
      const intervals = experimentEnvSettings.ITISet.intervals;
      return {
        LC: getItemsFrom(intervals),
        LI: getItemsFrom(intervals),
        RC: getItemsFrom(intervals),
        RI: getItemsFrom(intervals),
      };
    }

    const timer$ = reactive(new Subject());
    const timesUp$ = reactive(new Subject());
    function subjectMerge() {
      merge(timesUp$, key$)
        .pipe(takeUntil(onExpFinish))
        .subscribe((event) => {
          switch (currentStep.value) {
            case StepTypes.Instructions: {
              currentStep.value = StepTypes.FixationRest;
              const timeout = timer(experimentTimes.initial * 1000) // TODO use data from BE
                .pipe(take(1));
              timeout.subscribe(() => {
                startExperiment();
              });
              break;
            }
            case StepTypes.Stimulus: {
              currentStep.value = StepTypes.FixationTask;
              let fixationTime = itiTimesGenerator[stimulus.code].next().value;
              if (fixationTime < 2) {
                fixationTime = 1.5; // TODO toto tu nema co robit
              }
              if (event instanceof KeyboardEvent) {
                resetTimerStimulus();
              }
              const fixationTimer = timer(fixationTime * 1000).pipe(
                take(1),
                tap(() => setNextStimulusInfo())
              );
              fixationTimer.subscribe(() => {
                if (nTasksCopy.value == 0) {
                  resetTrialsForNextBlock();
                } else {
                  currentStep.value = StepTypes.Stimulus;
                  nTasksCopy.value -= 1;
                }
              });
              break;
            }
          }
        });
    }

    function resetTimerStimulus() {
      timer$.next(experimentTimes.stimulus * 1000);
    }

    function setNextStimulusInfo() {
      const [text, direction, congruency, code] =
        stimuliGenerator.value.next().value;
      stimulus = { text, direction, congruency, code };
    }

    function startExperiment() {
      setFixation(false, StepTypes.FixationTask);
      const startExp = timer(fixationTaskTime.value).pipe(take(1));
      startExp.subscribe(() => {
        setNextStimulusInfo();
        currentStep.value = StepTypes.Stimulus;
        setStimulusTimer();
      });
    }

    function resetTrialsForNextBlock() {
      setFixation(false, StepTypes.FixationTask);
      nTasksCopy.value = nTasks.value;
      nBlocksCopy.value -= 1;
      if (nBlocksCopy.value == 0) {
        finishExperiment();
      } else {
        setNextStimulusInfo();
        const resetBetweenBlocks = timer(fixationTaskTime.value).pipe(
          take(1),
          tap(() => setFixation(true, StepTypes.FixationRest)),
          switchMap(() => timer(experimentTimes.rest * 100).pipe()),
          tap(() => setFixation(false, StepTypes.FixationTask)),
          switchMap(() => timer(fixationTaskTime.value).pipe()),
          tap(() => (currentStep.value = StepTypes.Stimulus))
        );
        resetBetweenBlocks.subscribe();
      }
    }

    function setFixation(isRest: boolean, step: StepTypes) {
      currentStep.value = step;
      isFixationRest.value = isRest;
    }

    function setStimulusTimer(delay = 2000) {
      timer$
        .pipe(
          startWith(void 0),
          takeUntil(onDestroy),
          switchMap((period: number) => interval(period || delay))
        )
        .subscribe(() => timesUp$.next("TIME"));
    }

    function finishExperiment() {
      isEnd.value = true;
      const resetBetweenBlocks = timer(fixationTaskTime.value).pipe(
        take(1),
        tap(() => setFixation(true, StepTypes.FixationRest)),
        switchMap(() =>
          timer((experimentTimes.rest + experimentTimes.endrest) * 100).pipe()
        ),
        tap(() => (currentStep.value = StepTypes.End))
      );
      resetBetweenBlocks.subscribe(() => onExpFinish.next(null));
    }

    return {
      isFullScreen,
      bgColor,
      changeFixationType,
      nextStepComponent,
      stimulusText,
      isEndComp,
    };
  },
});
</script>

