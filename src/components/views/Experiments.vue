<template>
  <set-up-dialog :isDialogVisible="isDialog" @close-dialog="setDialogVisibility"></set-up-dialog>
  <el-table :data="experiments" height="250" style="width: 100%">
    <el-table-column label="Experiment Name">
      <template #default="scope">
        <base-button @click="isDialog = true"> 
          {{ scope.row.experimentName }}
        </base-button>
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
import SetUpDialog from "../dialogs/SetUpDialog.vue";

export default defineComponent({
  components: {
    BaseButton,
    SetUpDialog
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
    setDialogVisibility() {
      this.isDialog = false;
    }
  },
});
</script>

<style></style>
