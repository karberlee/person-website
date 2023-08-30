<template>
  <div>Login Page</div>
  <div>username: <input type="text" v-model="userInfo.username"></div>
  <div>password: <input type="text" v-model="userInfo.password"></div>
  <button @click="login">Login</button>
</template>

<script>
import { ref, reactive, computed } from "vue";

export default {
  name: "Login",
  setup() {
    const userInfo = reactive({
      username: "",
      password: "",
    })

    const methods = {
      login() {
        this.$post("/login", userInfo)
      },
    }

    return {
      userInfo,
      ...methods
    }
  }
}
</script>

<style>

</style>