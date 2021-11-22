<template>
  <el-table :data="experiments" height="250" style="width: 100%">
    <el-table-column prop="experimentName" label="Experiment Name" />
    <!--<el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="address" label="Id" />
    <el-table-column prop="address" label="Status" />
    <el-table-column prop="address" label="Visibility" />
    <el-table-column prop="address" label="Saving Format" /> -->
  </el-table>
</template>

<script lang="ts">
import { Experiments } from "@/data-models/models";
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    this.loadExperiments();
  },
  data() {
    return {
      experiments: [] as Experiments[],
    };
  },
  methods: {
    loadExperiments() {
      this.$store
        .dispatch("experiments/loadExperiments")
        .then(() => {
          this.experiments =
            this.$store.getters["experiments/experiments"];
            console.log(this.experiments)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
});
</script>

<style></style>
