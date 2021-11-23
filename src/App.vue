<template>
  <the-header></the-header>
  <div class="container">
    <router-view v-slot="slotProps">
      <component :is="slotProps.Component"></component>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/ui/TheHeader.vue";
import Home from "./components/views/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    Home,
  },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}
</style>
