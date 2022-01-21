<template>
  <set-up-dialog
    :is-dialog-visible="isDialogVisible"
    @start-experiment="startExperiment"
  ></set-up-dialog>
  <component v-if="isExperimentOn" :is="experimentLink"></component>

  <!-- <fullscreen v-model="isExperimentOn">
  </fullscreen> -->
  <!-- <button class="mt-2 btn btn-primary" @click="isExperimentOn = !isExperimentOn">Turn on the experiment</button> -->
</template>

<script lang="ts">
import { saveResponsesDB } from "@/services/experiment-logging";
import { defineComponent } from "vue";
import SetUpDialog from "../dialogs/SetUpDialog.vue";

export default defineComponent({
  components: {
    SetUpDialog,
  },
  created() {
    this.setExperimentLink();
    // this.loadExperimentConfig();
    this.interval = setInterval(() => {
      saveResponsesDB();
    }, 10000);
  },
  unmounted() {
    if (this.interval !== null) {
      clearInterval(this.interval);
    }
  },
  data() {
    return {
      isExperimentOn: false,
      experimentLink: "",
      isDialogVisible: true,
      interval: null,
    };
  },
  methods: {
    setExperimentLink() {
      this.experimentLink =
        this.$store.getters["experimentConfig/experimentName"];
    },
    startExperiment() {
      this.isDialogVisible = false;
      this.isExperimentOn = true;
    },
    loadExperimentConfig() {
      this.$store
        .dispatch("experimentConfig/loadExpSettings")
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>

<style>
.fixation-center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.instructions-center {
  white-space: pre-wrap;
  height: 100vh;
  font-size: 1.8em;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5%;
}
</style>
