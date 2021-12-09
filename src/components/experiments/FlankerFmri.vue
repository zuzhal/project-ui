<template>
  <button class="mb-1 btn btn-primary" @click="isFullScreen = true">
    FullScreen
  </button>
  <fullscreen v-model="isFullScreen">
    <div :style="bgColor">
      <component :is="nextStepComponent" :isFixationRest="changeFixationType">
        {{ stimulusText }}
      </component>
    </div>
  </fullscreen>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */

import { ExpEnvSettings, ExperimentTimes } from "@/data-models/models";
import { experimentSteps, StepTypes } from "@/data-models/constants";
import { defineComponent } from "vue";
import BaseInstructions from "../ui/BaseInstructions.vue";
import BaseFixation from "../ui/BaseFixation.vue";
import { getItemsFrom } from "@/helpers";
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
      experimentEnvSettings: {} as ExpEnvSettings, // settings of the experiment from BackEnd
      experimentTimes: {} as ExperimentTimes,
      isFullScreen: false,
      experimentSteps: experimentSteps, // object containing names of steps and components
      currentStep: StepTypes.Instructions, // enum containing names of steps, first step is showing instructions
      isFixationRest: true,
      nBlocks: 2, // TODO from BE
      nTasks: 5,
      stimuliGenerator: null,
      stimulus: {} as FlankerStimulus,
      ItiTimesGenerator: {}, // TODO TR, safety, also from BE right now, its manually calculated and put in the database
      timer$: new Subject(),
      timesUp$: new Subject(),
      key$: fromEvent(window, "keyup"),
      onDestroy: new Subject(),
    };
  },
  created() {
    this.getExperimentConfig();

    merge(this.timesUp$, this.key$)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((event) => {
        switch (this.currentStep) {
          case StepTypes.Instructions: {
            this.currentStep = StepTypes.FixationRest;
            let timeout = timer(2000) // TODO use data from BE
              .pipe(take(1))
              .subscribe(() => {
                this.startExperiment();
              });
            break;
          }
          case StepTypes.Stimulus: {
            let fixationTime = this.ItiTimesGenerator[this.stimulus.code].next().value;
              this.currentStep = StepTypes.FixationTask;
            if (fixationTime < 2) {
              fixationTime = 1.5 // TODO toto tu nema co robit
            }
            if (event instanceof KeyboardEvent) {
              this.resetTimerStimulus();
            }
            const fixationTimer = timer(
              fixationTime * 1000
            )
              .pipe(take(1), tap(this.setStimulusInfo()))
              .subscribe(() => (this.currentStep = StepTypes.Stimulus));
            break;
          }
        }
      });
  },
  mounted() {
    this.key$.pipe(takeUntil(this.onDestroy)).subscribe(() => {
      // this.keyDownHandler();
    });
  },
  unmounted() {
    this.onDestroy.next();
  },
  methods: {
    keyDownHandler(e) {
      switch (this.currentStep) {
        case StepTypes.Instructions: {
          break;
        }
      }
    },
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
      this.currentStep = StepTypes.FixationTask;
      this.isFixationRest = false;

      const startExp = timer(2000)
        .pipe(take(1))
        .subscribe(() => {
          this.setStimulusInfo();
          this.currentStep = StepTypes.Stimulus;
          this.setStimulusTimer();
        });
    },
    setStimulusTimer(delay = 5000) {
      this.timer$
        .pipe(
          startWith(void 0),
          takeUntil(this.onDestroy),
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
    setStimulusInfo() {
      const [text, direction, congruency, code] =
        this.stimuliGenerator.next().value;
      this.stimulus = { text, direction, congruency, code };
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
