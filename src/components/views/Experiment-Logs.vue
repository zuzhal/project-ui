<template>
  <el-table :data="experiments" max-height="450" style="width: 100%">
    <el-table-column type="expand">
      <template #default="scope">
        <nested-table-logs :table-data="scope.row.connection.values" :experiment="scope.row.key"></nested-table-logs>
      </template>
        <!-- <div v-for="(value, k) in scope.row.connection.values" :key="k">
          <el-button
            type="text"
            @click="
              loadExperimentLogs(scope.row.key, value.guid, value.subject)
            "
          >
            Subject: {{ value.subject }}
          </el-button>
          Guid: {{ value.guid }} Date: {{ value.dateTime }}
        </div> -->
    </el-table-column>
    <el-table-column label="Experiment Name" prop="key"> </el-table-column>
  </el-table>
</template>

<script lang="ts">
// import { Experiments } from "@/data-models/models";
import { defineComponent } from "vue";
import NestedTableLogs from "../ui/NestedTableLogs.vue";
export default defineComponent({
  components: {
    NestedTableLogs
  },
  data() {
    return { experiments: [] as any };
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
