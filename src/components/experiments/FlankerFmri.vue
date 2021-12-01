<template>
  <button class="mb-1 btn btn-primary" @click="isFullScreen = true">
    FullScreen
  </button>
  <fullscreen v-model="isFullScreen">
    <div :style="bgColor">
      <!-- <base-instructions v-if="false"></base-instructions>
    <base-fixation></base-fixation> -->
      <component :is="nextStep" :isFixationRest="changeFixationType">
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
      experimentSteps: experimentSteps,
      isFixationRest: true,
      currentStep: StepTypes.Instructions,
      nBlocks: 2,
      nTasks: 5,
      stimuliSet: Array<[String, String, String, String]>(),
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
            }, 2000);
          }, self.experimentTimes["initial"] * 1000);
          break;
        }
        case StepTypes.Stimulus: {
          console.log("Stimuli");
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
      console.log(this.experimentEnvSettings);
      console.log(this.stimuliSet);
    },
    startExperiment() {
      this.currentStep = StepTypes.Stimulus;

      /* for (let block = 0; block < this.nBlocks; block++) {
        for (let trial = 0; trial < this.nTasks; trial++) {

        }
      } */
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
  },
});
</script>
