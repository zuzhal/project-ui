<template>
  <div class="row">
    <div class="col">
      <base-card class="py-0">
        <div class="row p-3">
          <div class="pb-avatar-image me-3 pb-avatar-man"></div>
          <div class="col">
            <div class="row">
              <div class="col">
                <h3>{{ userNames }}</h3>
              </div>
              <div class="col text-end">
                <h4>
                  <span class="badge bg-info mt-2 me-5">{{ user.role.name }}</span>
                </h4>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <font-awesome-icon icon="user" /> {{ user.username }}
              </div>
            </div>
            <div class="row">
              <div class="col"><font-awesome-icon icon="at" /> {{ user.email }}</div>
            </div>
          </div>
        </div>
      </base-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "@/data-models/models";

export default defineComponent({
  data() {
    return { user: {} as User };
  },
  created() {
    this.user = this.$store.getters["authentication/loggedUser"];
  },
  computed: {
    userNames() {
      return this.user.firstName + " " + this.user.lastName;
    },
  },
});
</script>

<style lang="scss">
.pb-avatar-image {
  width: 100px !important;
  height: 100px;
  background-size: 100%;

  &.pb-avatar-man {
    background-image: url("../../assets/avatar.png");
  }
}

.row {
  text-align: left;
}
</style>
