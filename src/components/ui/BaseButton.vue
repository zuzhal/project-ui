<template>
  <router-link :to="to">
    <el-button type="text">
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
  },
});
</script>

<style scoped></style>
