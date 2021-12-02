<template>
  <button class="mb-1 btn btn-primary" @click="isFullScreen = true">
    FullScreen
  </button>
  <fullscreen v-model="isFullScreen">
    <div :style="bgColor">
      <component :is="nextStep" :isFixationRest="changeFixationType">
        {{ stimulusText }}
      </component>
    </div>
  </fullscreen>
</template>

<script lang="ts">
import { ExpEnvSettings, ExperimentTimes } from "@/data-models/models";
import { experimentSteps, StepTypes } from "@/data-models/constants";
import { defineComponent } from "vue";
import BaseInstructions from "../ui/BaseInstructions.vue";
import BaseFixation from "../ui/BaseFixation.vue";
import { getItemsFrom } from "@/helpers";

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
      currentStep: StepTypes.Instructions, // enum containing names of steps
      isFixationRest: true,
      nBlocks: 2,
      nTasks: 5,
      stimuliSet: Array<[String, String, String, String]>(),
      stimulus: {} as FlankerStimulus,
      ItiSet: [],
    };
  },
  created() {
    this.getExperimentConfig();
  },
  mounted() {
    let self = this;

    window.addEventListener("keyup", function () {
      switch (self.currentStep) {
        case StepTypes.Instructions: {
          self.currentStep = StepTypes.Fixation;
          setTimeout(() => {
            self.currentStep = StepTypes.FixationTask;
            self.isFixationRest = false;
            setTimeout(() => {
              self.startExperiment();
            }, 500);
          }, self.experimentTimes["initial"] * 1000);
          break;
        }
        case StepTypes.Stimulus: {
          console.log("Stimuli");
          // log key press when in Stimulus step and move to the next stimulus
          break;
        }
      }
    });
  },
  methods: {
    getExperimentConfig() {
      this.experimentEnvSettings =
        this.$store.getters["experimentConfig/experimentEnvSettings"];
      this.experimentTimes = this.experimentEnvSettings.times;
      this.stimuliSet = this.$store.getters["experimentConfig/stimuliSet"];
      this.ItiSet = this.experimentEnvSettings.ITISet.intervals;
      console.log(this.experimentEnvSettings);
    },
    startExperiment() {
      let stimuli = getItemsFrom(this.stimuliSet); // random items generator
      let ITI = {
        LC: getItemsFrom(this.ItiSet),
        LI: getItemsFrom(this.ItiSet),
        RC: getItemsFrom(this.ItiSet),
        RI: getItemsFrom(this.ItiSet),
      };
      for (let block = 0; block < this.nBlocks; block++) {
        // task fixation should be shown
        for (let trial = 0; trial < this.nTasks; trial++) {
          this.currentStep = StepTypes.Stimulus;
          const [text, direction, congruency, code] = stimuli.next().value;
          let ItiTime = ITI[code].next().value;
          this.delay(trial, block, { text, direction, congruency }, ItiTime); 
          // after the stimulus is shown for x seconds, I want to show the task fixation
        }
      }
    },
    delay(trial, block, stimuli, ItiTime = 1) {
      setTimeout(() => {
        this.stimulus = {
          ...stimuli,
        };
      }, ItiTime * 2 * trial + 1 * block + 1 * 1000);
    },
  },
  computed: {
    changeFixationType() {
      return this.isFixationRest;
    },
    nextStep() {
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
