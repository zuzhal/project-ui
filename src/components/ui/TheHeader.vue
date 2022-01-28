<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div>
        <div class="text-end">
          <button
            type="button"
            class="btn btn-outline-light me-2 float-right"
            @click="logout"
          >
            <font-awesome-icon icon="sign-out-alt" /> Log out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("authentication/setLoggedUser", {});
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
