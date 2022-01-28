<template>
  <the-header></the-header>
  <div class="container">
    <user-card></user-card>
    <base-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="Experiments" name="first">
          <experiments></experiments>
        </el-tab-pane>
        <el-tab-pane label="Experiment Logs" name="second">
          <experiment-logs></experiment-logs>
        </el-tab-pane>
      </el-tabs>
    </base-card>
  </div>
</template>

<script lang="ts">
import UserCard from "./UserCard.vue";
import Experiments from "./Experiments.vue";
import { defineComponent } from "vue";
import ExperimentLogs from "./Experiment-Logs.vue";
import TheHeader from "../ui/TheHeader.vue";

export default defineComponent({
  components: {
    UserCard,
    Experiments,
    ExperimentLogs,
    TheHeader,
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
});
</script>

<style></style>
