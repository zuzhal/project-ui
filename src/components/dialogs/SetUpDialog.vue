<template>
  <el-button type="text" @click="dialogVisible = true">
    click to open the Dialog
  </el-button>
  <el-dialog v-model="dialogVisible" title="Experiment info" width="30%">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Activity name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai"></el-option>
          <el-option label="Zone two" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      dialogInputs: {},
      form: {
        name: "",
        region: "",
      },
    };
  },
  created() {
    this.loadConfig();
  },
  methods: {
    async loadConfig() {
      try {
        await this.$store.dispatch("experimentConfig/loadSettingsDialog");
        this.dialogInputs =
          this.$store.getters["experimentConfig/settingsDialog"];
        console.log(this.dialogInputs);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style></style>
