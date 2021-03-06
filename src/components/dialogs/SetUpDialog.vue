<template>
  <teleport to="body">
    <el-dialog
      v-model="isDialogOpened"
      title="Experiment info"
      width="35%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" label-width="80px" center>
        <div v-for="(value, k) in dialogInputs" :key="k">
          <el-form-item v-if="generateElement(k)" :label="k">
            <el-input v-model="form[k]"></el-input>
          </el-form-item>
          <el-form-item v-else-if="k !== 'id'" :label="k">
            <el-select
              v-model="form[k]"
              :placeholder="'select your ' + k"
              style="width: 100%"
            >
              <el-option
                v-for="(value, l, index) in dialogInputs[k]"
                :key="index"
                :label="dialogInputs[k][l]"
                :value="dialogInputs[k][l]"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$router.push({ path: '/end' })">Cancel</el-button>
          <el-button type="primary" @click="startExperiment()">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </teleport>
</template>

<script lang="ts">
import { LogStepTypes } from "@/data-models/constants";
import { defineComponent } from "vue";
import { ExperimentInfoDialog } from "../../data-models/models";
import { saveLogLocal } from "../../services/experiment-logging";

export default defineComponent({
  props: {
    isDialogVisible: { type: Boolean, default: false },
  },
  data() {
    return {
      isLoading: false,
      isDialogOpened: true,
      dialogInputs: {} as ExperimentInfoDialog,
      form: {},
    };
  },
  created() {
    this.loadDialogConfig();
  },
  watch: {
    isDialogVisible(val) {
      this.isDialogOpened = val;
    },
  },
  emits: ["startExperiment"],
  methods: {
    loadDialogConfig() {
      this.$store
        .dispatch("experimentConfig/loadSettingsDialog")
        .then(() => {
          this.dialogInputs =
            this.$store.getters["experimentConfig/settingsDialog"];

          this.initializeForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initializeForm() {
      for (const key in this.dialogInputs) {
        if (key == "id") continue;
        this.form[key] = "";
      }
    },
    generateElement(key) {
      if (key !== "id" && typeof this.dialogInputs[key] === "string")
        return true;
    },
    startExperiment() {
      this.$store.commit("experiments/setSubject", this.form.subject)
      saveLogLocal({step: LogStepTypes.StartLog});
      this.$emit("startExperiment");
    },
    handleClose() {
      console.log("close");
    },
  },
});
</script>

<style>
.el-form-item__label::first-letter {
  text-transform: uppercase !important;
}
</style>
