<template>
  <loader></loader>
  <the-header v-if="loggedIn"></the-header>
  <div class="container" id="app">
    <router-view v-slot="slotProps">
      <component :is="slotProps.Component"></component>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "./components/ui/TheHeader.vue";
import Loader from "./components/ui/Loader.vue";
import Home from "./components/views/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    Home,
    Loader,
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },
  computed: {
    loggedIn() {
      console.log(this.isLoggedIn);
      return this.isLoggedIn;
    },
  },
  watch: {
  '$store.state.authentication.loggedUser': function() {
    this.isLoggedIn = this.$store.getters["authentication/isAuthenticated"];
  },
}
});
</script>

<style lang="scss">
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

.badge.bg {
  &-success {
    background-color: #67c23a !important;
  }
  &-danger {
    background-color: #f56c6c !important;
  }
}
</style>
