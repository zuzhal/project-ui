<template>
  <div class="instructions-center" :style="styleInstructions">
    <div>
      <p :style="styleTitle">{{ instructionsSett.title }}</p>
      <p>
        {{ instructionsSett.instructions }}
        <!-- IDK why is here an error -->
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Instructions } from "@/data-models/models";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  created() {
    this.instructionsSett =
      this.$store.getters["experimentConfig/instructionsSettings"];
    this.styleInstructions = {
      color: `rgb(${this.instructionsSett.instructionsColor})`,
      // backgroundColor: `rgb(${this.instructionsSett.background})`,
    };
    this.styleTitle = {
      fontSize: "1.9em",
      color: `rgb(${this.instructionsSett.titleColor})`,
    };
  },
  data() {
    return {
      instructionsSett: Object as PropType<Instructions>,
      styleInstructions: {},
      styleTitle: {},
    };
  },
});
</script>

<style>
</style>
