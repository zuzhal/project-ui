<template>
  <router-link :to="to" :disabled="isDisabled">
    <el-button type="text" :disabled="isDisabled">
      <slot></slot>
    </el-button>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    to: {
      type: String,
      required: false,
      default: "/",
    },
    disabled: { default: false },
  },
  computed: {
    isDisabled() {
      return this.disabled;
    },
  },
});
</script>

<style scoped></style>
