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
import { defineComponent } from "vue";
import SetUpDialog from "../dialogs/SetUpDialog.vue";

export default defineComponent({
  components: {
    SetUpDialog,
  },
  created() {
    this.setExperimentLink();
    this.loadExperimentConfig();
  },
  data() {
    return {
      isExperimentOn: false,
      experimentLink: "",
      isDialogVisible: true,
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
