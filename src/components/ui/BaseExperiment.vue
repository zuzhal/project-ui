<template>
  <set-up-dialog
    :is-dialog-visible="isDialogVisible"
    @close-dialog="isDialogVisible = false"
    @start-experiment="startExperiment"
  ></set-up-dialog>
  <component v-if="isExperimentOn" :is="experimentLink"></component>
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
      this.experimentLink = this.$route.params.link;
    },
    startExperiment() {
      this.isDialogVisible = false;
      this.isExperimentOn = true;
    },
  },
});
</script>
