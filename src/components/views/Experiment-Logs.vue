<template>
  <el-table :data="experiments" height="250" style="width: 100%">
    <el-table-column type="expand">
      <template #default="scope">
        <div v-for="(value, k) in scope.row.connection.values" :key="k">
          <el-button
            type="text"
            @click="loadExperimentLogs(scope.row.key, value.guid, value.subject)"
          >
            Subject: {{ value.subject }}
          </el-button>
          Guid: {{ value.guid }}
          Date: {{ value.dateTime }}
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Experiment Name" prop="key"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
// import { Experiments } from "@/data-models/models";
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return { experiments: [] as any[] };
  },
  created() {
    this.setExperiments();
  },
  methods: {
    setExperiments() {
      this.experiments = this.$store.getters["experiments/experimentsWithLogs"];
    },
    loadExperimentLogs(name, guid, subject) {
      this.$store.dispatch("experiments/loadExperimentLogs", { name, guid, subject });
    },
  },
});
</script>

<style></style>
