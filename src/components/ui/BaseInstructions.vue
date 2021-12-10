<template>
  <div class="instructions-center" :style="textStyle">
    <div v-if="!isEnd">
      <p :style="styleTitle">{{ textSett.title }}</p>
      <p>
        {{ textSett.instructions }}
      </p>
    </div>
    <div v-else>
      <p>
        {{ textSett.report }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Instructions, ReportSettings } from "@/data-models/models";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isEnd: { type: Boolean, default: false },
  },
  created() {
    console.log("created");
    if (!this.isEnd) {
      this.textSett =
        this.$store.getters["experimentConfig/instructionsSettings"];
      this.textStyle = {
        color: `rgb(${this.textSett.instructionsColor})`,
      };
      this.styleTitle = {
        fontSize: "1.9em",
        color: `rgb(${this.textSett.titleColor})`,
      };
    } else {
      this.textSett = this.$store.getters["experimentConfig/reportSettings"];
      this.textStyle = {
        fontSize: `${this.textSett.reportFontSize}em`,
        color: `rgb(${this.textSett.reportColor})`,
      };
    }
  },
  data() {
    return {
      textSett: {} as Instructions | ReportSettings,
      textStyle: {},
      styleTitle: {},
    };
  },
});
</script>

<style></style>
