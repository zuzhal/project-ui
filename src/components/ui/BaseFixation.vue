<template>
  <!-- <teleport to="body"> -->
  <div class="fixation-center">
    <span class="dot" :style="setFixationColor"></span>
  </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { FixationSettings } from "@/data-models/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    isFixationRest: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    this.fixationSettings =
      this.$store.getters["experimentConfig/fixationSettings"];
    this.fixationStyle = {
      height: `${this.fixationSettings.fixationRadius}px`,
      width: `${this.fixationSettings.fixationRadius}px`,
    };
  },
  data() {
    return {
      fixationStyle: {},
      fixationSettings: Object as PropType<FixationSettings>,
    };
  },
  methods: {
    fixationColor() {
      return this.isFixationRest
        ? this.fixationSettings.fixationColorRest
        : this.fixationSettings.fixationColorTask;
    },
  },
  watch: {
    isFixationRest() {
      this.fixationColor();
    },
  },
  computed: {
    setFixationColor() {
      return {
        ...this.fixationStyle,
        backgroundColor: `rgb(${this.fixationColor()})`,
      };
    },
  },
});
</script>

<style lang="scss">
.dot {
  border-radius: 50%;
  display: inline-block;
}
</style>
