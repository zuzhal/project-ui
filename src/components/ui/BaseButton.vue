<template>
  <router-link
    :to="{ name: 'startExperiment', params: { status, id, link } }"
    :disabled="isDisabled"
  >
    <el-button type="text" :disabled="isDisabled">
      <slot></slot>
    </el-button>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    /* to: {
      type: String,
      required: false,
      default: "/",
    }, */
    id: { default: null },
    link: { default: "" },
    status: { default: false },
  },
  computed: {
    isDisabled() {
      return !this.status;
    },
  },
});
</script>

<style scoped></style>
