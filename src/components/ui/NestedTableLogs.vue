<template>
  <el-table
    :data="tableData"
    max-height="350"
    style="width: 80%; margin-left: 10%"
    :header-cell-style="{ background: '#909399', color: 'white' }"
  >
    <el-table-column label="Guid" prop="guid" align="center"> </el-table-column>
    <el-table-column label="Subject" prop="subject" align="center">
    </el-table-column>
    <el-table-column label="Date" align="center">
      <template #default="scope">
        {{ formatDateTime(scope.row.dateTime) }}
      </template>
    </el-table-column>
    <el-table-column label="Action" align="center">
      <template #default="scope">
        <el-button
          size="mini"
          type="info"
          plain
          @click="
            loadExperimentLogs(experiment, scope.row.guid, scope.row.subject)
          "
        >
          Download Log
          <font-awesome-icon icon="download" />
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DateTime } from "luxon";

export default defineComponent({
  props: {
    tableData: { type: [], default: [] },
    experiment: { type: String, default: "" },
  },
  methods: {
    formatDateTime(dateTime) {
      return DateTime.fromISO(dateTime).toLocaleString(
        DateTime.DATETIME_SHORT_WITH_SECONDS
      );
    },
    loadExperimentLogs(name, guid, subject) {
      this.$store.dispatch("experiments/loadExperimentLogs", {
        name,
        guid,
        subject,
      });
    },
  },
});
</script>

<style scoped></style>
