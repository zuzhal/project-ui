<template>
  <el-table :data="experiments" height="250" style="width: 100%">
    <el-table-column type="expand">
      <template #default="scope">
        <el-button type="text" v-for="(value, k) in scope.row.connection.groupBy.guid" :key="k">
          {{ value.key }}
        </el-button>
      </template>
    </el-table-column>
    <el-table-column label="Experiment Name" prop="key"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Experiments } from "@/data-models/models";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return { experiments: [] as Experiments[] };
  },
  created() {
    this.setExperiments();
  },
  methods: {
    setExperiments() {
      this.experiments = this.$store.getters["experiments/experimentsWithLogs"];
    },
  },
});
</script>

<style></style>
