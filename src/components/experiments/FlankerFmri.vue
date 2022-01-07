<template>
  <button class="mb-1 btn btn-primary" @click="isFullScreen = true">
    FullScreen
  </button>
  <fullscreen v-model="isFullScreen">
    <div :style="bgColor">
      <component
        :is="nextStepComponent"
        :isFixationRest="changeFixationType"
        :isEnd="isEnd"
      >
        {{ stimulusText }}
      </component>
    </div>
  </fullscreen>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */

import { ExpEnvSettings, ExperimentTimes } from "@/data-models/models";
import {
  experimentSteps,
  LogStepTypes,
  StepTypes,
  responseMapKeyBoardFlanker,
} from "@/data-models/constants";
import { defineComponent } from "vue";
import BaseInstructions from "../ui/BaseInstructions.vue";
import BaseFixation from "../ui/BaseFixation.vue";
import { getItemsFrom } from "@/utils/helpers";
import {
  Subject,
  takeUntil,
  fromEvent,
  timer,
  merge,
  switchMap,
  startWith,
  interval,
  take,
  tap,
} from "rxjs";
import { saveLogLocal, saveResponsesDB } from "@/services/experiment-logging";
import { now, elapsed } from "../../utils/helpers";

interface FlankerStimulus {
  text: string;
  direction: string;
  congruency: string;
  code: string;
}

export default defineComponent({
  components: {
    BaseInstructions,
    BaseFixation,
  },
  data() {
    return {
      experimentEnvSettings: {} as ExpEnvSettings,
      experimentTimes: {} as ExperimentTimes,
      isFullScreen: false,
      isEnd: false,
      experimentSteps: experimentSteps,
      currentStep: StepTypes.Instructions,
      isFixationRest: true,
      nBlocks: 2, // TODO from BE
      nTasks: 5,
      nBlocksCounter: 1,
      nTasksCounter: 1,
      stimuliGenerator: null,
      stimulus: {} as FlankerStimulus,
      ItiTimesGenerator: {}, // TODO TR, safety, also from BE right now, its manually calculated and put in the database
      timer$: new Subject(),
      timesUp$: new Subject(),
      key$: fromEvent(window, "keyup"),
      onDestroy$: new Subject(),
      onExpFinish$: new Subject(),
      fixationTaskTime: 2000,
      experimentStarted: null,
      stimulusTime: null,
      reactionTime: null,
    };
  },
  created() {
    this.getExperimentConfig();

    merge(this.timesUp$, this.key$)
      .pipe(takeUntil(this.onExpFinish$))
      .subscribe((event) => {
        switch (this.currentStep) {
          case StepTypes.Instructions: {
            this.currentStep = StepTypes.FixationRest;
            saveLogLocal({ step: LogStepTypes.Fixation });
            let timeout = timer(this.experimentTimes.initial * 1000) // TODO use data from BE
              .pipe(take(1))
              .subscribe(() => {
                this.startExperiment();
              });
            break;
          }
          case StepTypes.Stimulus: {
            this.currentStep = StepTypes.FixationTask;
            let reactionTime = 0;
            let response = "-";
            let correct = "timeout";
            let fixationTime =
              this.ItiTimesGenerator[this.stimulus.code].next().value;
            if (event instanceof KeyboardEvent) {
              // if a key was pressed
              reactionTime = elapsed(this.stimulusTime, true);
              response = event.key;
              correct =
                responseMapKeyBoardFlanker[response] == this.stimulus.direction
                  ? "correct"
                  : "incorrect";
              this.resetTimerStimulus();
            }
            saveLogLocal({
              block: this.nBlocksCounter,
              trial: this.nTasksCounter,
              code: this.stimulus.code,
              direction: this.stimulus.direction,
              congruency: this.stimulus.congurency,
              ITI: fixationTime,
              response,
              correct,
              stimulusTime: this.stimulusTime,
              reactionTime,
            });
            if (fixationTime < 2) {
              fixationTime = 1.5; // TODO toto tu nema co robit
            }
            const fixationTimer = timer(fixationTime * 1000)
              .pipe(take(1), tap(this.setNextStimulusInfo()))
              .subscribe(() => {
                if (this.nTasksCounter == this.nTasks) {
                  this.resetTrialsForNextBlock();
                } else {
                  this.showStimulus();
                  this.nTasksCounter += 1;
                }
              });
            break;
          }
        }
      });
  },
  mounted() {
    this.key$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {});
  },
  unmounted() {
    saveResponsesDB();
    this.onDestroy$.next();
    this.onExpFinish$.next();
  },
  methods: {
    getExperimentConfig() {
      this.experimentEnvSettings =
        this.$store.getters["experimentConfig/experimentEnvSettings"];
      this.experimentTimes = this.experimentEnvSettings.times;
      this.stimuliGenerator = getItemsFrom(
        this.$store.getters["experimentConfig/stimuliSet"]
      );
      this.ItiTimesGenerator = this.setItiTimesGenerator();
      console.log(this.experimentEnvSettings);
    },
    startExperiment() {
      this.experimentStarted = now();
      saveLogLocal({ step: LogStepTypes.StartedExp });
      this.setFixation(false, StepTypes.FixationTask);
      const startExp = timer(this.fixationTaskTime)
        .pipe(take(1))
        .subscribe(() => {
          this.setNextStimulusInfo();
          this.showStimulus();
          this.setStimulusTimer();
        });
    },
    setStimulusTimer(delay = 5000) {
      this.timer$
        .pipe(
          startWith(void 0),
          takeUntil(this.onDestroy$),
          switchMap((period: number) => interval(period || delay))
        )
        .subscribe(() => this.timesUp$.next("TIME"));
    },
    resetTimerStimulus() {
      this.timer$.next(this.experimentTimes.stimulus * 1000);
    },
    setItiTimesGenerator() {
      const intervals = this.experimentEnvSettings.ITISet.intervals;
      return {
        LC: getItemsFrom(intervals),
        LI: getItemsFrom(intervals),
        RC: getItemsFrom(intervals),
        RI: getItemsFrom(intervals),
      };
    },
    setNextStimulusInfo() {
      const [text, direction, congruency, code] =
        this.stimuliGenerator.next().value;
      this.stimulus = { text, direction, congruency, code };
    },
    setFixation(isRest: boolean, step: StepTypes) {
      this.currentStep = step;
      this.isFixationRest = isRest;
    },
    resetTrialsForNextBlock() {
      this.setFixation(false, StepTypes.FixationTask);
      this.nTasksCounter = 1;
      this.nBlocksCounter += 1;
      if (this.nBlocksCounter - 1 == this.nBlocks) {
        this.finishExperiment();
      } else {
        this.setNextStimulusInfo();
        const resetBetweenBlocks = timer(this.fixationTaskTime)
          .pipe(
            take(1),
            tap((_) => this.setFixation(true, StepTypes.FixationRest)),
            switchMap(() => timer(this.experimentTimes.rest * 100).pipe()),
            tap((_) => this.setFixation(false, StepTypes.FixationTask)),
            switchMap(() => timer(this.fixationTaskTime).pipe()),
            tap((_) => this.showStimulus())
          )
          .subscribe();
      }
    },
    finishExperiment() {
      this.isEnd = true;
      const resetBetweenBlocks = timer(this.fixationTaskTime)
        .pipe(
          take(1),
          tap((_) => this.setFixation(true, StepTypes.FixationRest)),
          switchMap(() =>
            timer(
              (this.experimentTimes.rest + this.experimentTimes.endrest) * 100
            ).pipe()
          ),
          tap((_) => (this.currentStep = StepTypes.End))
        )
        .subscribe((_) => this.onExpFinish$.next());
    },
    showStimulus() {
      this.currentStep = StepTypes.Stimulus;
      this.stimulusTime = elapsed(this.experimentStarted);
    },
  },
  computed: {
    changeFixationType() {
      return this.isFixationRest;
    },
    nextStepComponent() {
      return this.experimentSteps[this.currentStep].component;
    },
    bgColor() {
      return {
        backgroundColor: `rgb(${this.experimentEnvSettings.background})`,
      };
    },
    stimulusText() {
      return this.stimulus.text;
    },
  },
});
</script>
