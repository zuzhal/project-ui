<template>
  <user-card></user-card>
  <base-card>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Experiments" name="first"
        ><experiments></experiments>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">Participants</el-tab-pane>
    </el-tabs>
  </base-card>
  <set-up-dialog></set-up-dialog>
</template>

<script>
import UserCard from "../ui/UserCard.vue";
import BaseCard from "../ui/BaseCard.vue";
import Experiments from "./Experiments.vue";
import SetUpDialog from "../dialogs/SetUpDialog.vue";

export default {
  components: {
    UserCard,
    BaseCard,
    Experiments,
    SetUpDialog,
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
};
</script>

<style></style>
