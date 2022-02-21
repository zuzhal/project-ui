<template>
  <div>
    <set-up-dialog
      :is-dialog-visible="isDialogVisible"
      @start-experiment="startExperiment"
    ></set-up-dialog>
    <fullscreen>
      <component v-if="isExperimentOn" :is="experimentLink"></component>
    </fullscreen>
  </div>
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
    /* to set interval for saving the logs every 10seconds to the database */
    this.interval = setInterval(() => {
      saveResponsesDB();
    }, 10000);
  },
  unmounted() {
    /* interval has to be cleared, it would create a memory leak otherwise 
    unmounted lifecycle is a good place for - when the component is destroyed
    */
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
      this.experimentLink = this.$store.getters["experimentConfig/experimentName"];
    },
    startExperiment() {
      this.isDialogVisible = false;
      this.isExperimentOn = true;
      this.$fullscreen.toggle();
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
