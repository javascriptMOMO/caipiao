<template>
  <div class="login">
    <div class="bg">
      <el-form label-position="top" label-width="80px" :model="loginForm">
        <el-form-item label="用户名">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginFuc">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { loginIt } from "api/mainApi.js";
import { ElMessage } from "element-plus";
export default {
  setup(props) {
    const loginForm = reactive({ username: "", password: "" });
    const router = useRouter();
    const loginFuc = async () => {
      console.log("登录", loginForm);
      if (!loginForm.username || !loginForm.password) {
        ElMessage({ type: "error", message: "用户名或密码不能为空" });
        return;
      }
      if (
        loginForm.username != "maxxiang" ||
        loginForm.password != "kainuo123"
      ) {
        ElMessage({ type: "error", message: "用户名或密码错误" });
        return;
      }
      const { data } = await loginIt();
      console.log(data);
      if (data.code==0) {
         router.replace('/home')
      }
    };
    return {
      loginForm,
      loginFuc,
    };
  },
};
</script>
<style lang="scss" scoped>
.login {
  position: relative;
  height: 98vh;
  background: #1b2e56;
  // background-image: url("../../src/assets/images/bg.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-position: center;
  .bg {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    height: 260px;
    width: 20vw;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
  }
}
</style>
