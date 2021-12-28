<template>
  <div class="vld-parent">
    <loading
      v-model:active="loading"
      :can-cancel="false"
      :is-full-page="true"
      color="#409eff"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapState } from 'vuex';

export default {
  components: {
    Loading,
  },
  computed: {
    ...mapState("loader", ["loading"]),
  },
};
</script>
