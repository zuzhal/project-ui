<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="formEl"
        @submit.prevent="submitForm(formEl)"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
            >Login</el-button
          >
        </el-form-item>
        <!--  <a class="forgot-password" href="https://oxfordinformatics.com/"
          >Forgot password ?</a
        > -->
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { ElForm } from "element-plus";
import { useStore } from "vuex";

const store = useStore()
const formEl = ref<InstanceType<typeof ElForm>>()
const loading = ref(false);
const model = reactive({
  username: "",
  password: "",
});
const rules = reactive({
  username: [
    {
      required: true,
      message: "Username is required",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
    {
      min: 5,
      message: "Password length should be at least 5 characters",
      trigger: "blur",
    },
  ],
});

function login() {
  store.dispatch("authentication/login", model);
}
function submitForm(formEl: InstanceType<typeof ElForm> | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login();
    } else {
      console.log("error submit!");
      return false;
    }
  });
}
</script>

<style lang="scss">
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}

.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}

.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
