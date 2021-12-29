<template>
  <!-- <set-up-dialog :isDialogVisible="isDialog" @close-dialog="setDialogVisibility"></set-up-dialog> -->
  <el-table :data="experiments" height="250" style="width: 100%">
    <el-table-column label="Experiment Name">
      <template #default="scope">
        <base-button
          :to="`/experiment/${scope.row.id}/${scope.row.experimentLink}`"
          :disabled="!scope.row.active"
        >
          {{ scope.row.experimentName }}
        </base-button>
      </template>
    </el-table-column>
    <el-table-column label="Status">
      <template #default="scope">
        <h6>
          <span
            :class="`badge bg-${scope.row.active ? 'success' : 'danger'}`"
            >{{ scope.row.active ? "Active" : "Inactive" }}</span
          >
        </h6>
      </template>
    </el-table-column>
    <el-table-column label="Action">
      <template #default="scope">
        <el-button
          @click="setStatus(!scope.row.active, scope.row.id)"
          :type="`${scope.row.active ? 'danger' : 'success'}`"
          size="mini"
          >{{ scope.row.active ? "Inactivate" : "Activate" }}
          <font-awesome-icon
            :icon="`${scope.row.active ? 'times-circle' : 'check-circle'}`"
          />
        </el-button>
      </template>
    </el-table-column>
    <!--<el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="address" label="Id" />
    <el-table-column prop="address" label="Status" />
    <el-table-column prop="address" label="Visibility" />
    <el-table-column prop="address" label="Saving Format" /> -->
  </el-table>
</template>

<script lang="ts">
import { Experiments } from "../../data-models/models";
import { defineComponent } from "vue";
import BaseButton from "../ui/BaseButton.vue";

export default defineComponent({
  components: {
    BaseButton,
  },
  created() {
    this.loadExperiments();
  },
  data() {
    return {
      experiments: [] as Experiments[],
      isDialog: false,
    };
  },
  methods: {
    loadExperiments() {
      this.$store
        .dispatch("experiments/loadExperiments")
        .then(() => {
          this.experiments = this.$store.getters["experiments/experiments"];
          // console.log(this.experiments);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setStatus(active: boolean, id) {
      this.$store
        .dispatch("experiments/setStatus", { active, id })
        .then(() => this.loadExperiments());
    },
    /* setDialogVisibility() {
      this.isDialog = false;
    } */
  },
});
</script>

<style></style>
