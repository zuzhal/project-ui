<template>
  <base-instructions></base-instructions>
</template>

<script lang="ts">
import { ExpEnvSettings } from "@/data-models/models";
import { defineComponent } from "vue";
import BaseInstructions from "../ui/BaseInstructions.vue";

export default defineComponent({
  components: {
    BaseInstructions,
  },
  data() {
    return {
      experimentEnvSettings: {} as ExpEnvSettings,
    };
  },
  created() {
    this.getExperimentConfig();
  },
  methods: {
    getExperimentConfig() {
      this.experimentEnvSettings =
        this.$store.getters["experimentConfig/experimentEnvSettings"];
    },
  },
});
</script>

<style></style>
