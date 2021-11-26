<template>
  <div class="row">
    <div class="col text-center">
      <div class="instructions-center" :style="styleInstructions">
        <p :style="styleTitle"> {{ instructionsSett.title }} </p>
        <p>
          {{ instructionsSett.instructions }}
          <!-- IDK why is here an error -->
        </p>
      </div>
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
      backgroundColor: `rgb(${this.instructionsSett.background})`,
    };
    this.styleTitle = {
      fontSize: '1.9em',
      color: `rgb(${this.instructionsSett.titleColor})`,
    }
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
.instructions-center {
  white-space: pre-wrap;
  margin-top: 10%;
  font-size: 1.8em;
}
</style>
