<template>
  <the-header v-if="loggedIn()"></the-header>
  <div class="container" id="app">
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
  methods: {
    loggedIn() {
      const user = this.$store.getters["authentication/loggedUser"];
      console.log(user);
      return Object.keys(user).length === 0 ? false : true; 
    }
  }
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

html {
  font-family: Roboto, sans-serif;
}
</style>
