<template>
  <div class="instructions-center">
    <div>
      <p :style="stimulusStyle">
        <slot></slot>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { StimulusSettings } from "@/data-models/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  created() {
    this.stimulusSettings =
      this.$store.getters["experimentConfig/stimulusSettings"];
    this.stimulusStyle = {
      color: `rgb(${this.stimulusSettings.stimulusColor})`,
      fontSize: `${this.stimulusSettings.height}em`,
    };
  },
  data() {
    return {
      stimulusStyle: {},
      stimulusSettings: Object as PropType<StimulusSettings>,
    };
  },
});
</script>

<style></style>
