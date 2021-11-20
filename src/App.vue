<template>
  <the-header></the-header>
  <div class="container">
    <home></home>
  </div>
</template>

<script>
import Home from "./components/views/Home.vue";
import TheHeader from "./components/ui/TheHeader.vue";

export default {
  components: {
    TheHeader,
    Home,
  },
};
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
