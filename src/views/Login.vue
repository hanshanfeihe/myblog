<template>
  <div class="login">
    <div class="login-container">
      <h1>管理员登录</h1>
      <div class="login-form">
        <div class="label-item">
          <label for="username" class="label">用户名：</label>
          <input
            type="text"
            name="username"
            id="username"
            v-model="admin.username"
          />
        </div>
        <div class="label-item">
          <label for="password" class="label">密码：</label>
          <input
            type="text"
            name="password"
            id="password"
            v-model="admin.password"
          />
        </div>
        <div class="options">
          <button class="btn-submit" @click="commitAdmin">登录</button>
          <button class="btn-reset">重置</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      admin: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async commitAdmin() {
      console.log(this.admin);
      if (this.admin.username && this.admin.password) {
        const { data: res } = await this.http.post(
          "http://127.0.0.1:3000/admin/login",
          this.admin
        );
        console.log(res);
        if (res.meta.status === 200) {
          this.$router.push("manage");
          window.localStorage.setItem("token", res.data.token);
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  min-height: 100vh;
  .login-container {
    width: 300px;
    height: 350px;
    border: 1px solid #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    h1 {
      text-align: center;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      color: #fff;
      background-color: skyblue;
      margin-bottom: 5px;
    }
    .label-item {
      display: flex;
      padding: 10px;
      flex-direction: column;
      margin-bottom: 15px;
      .label {
        padding-left: 5px;
        color: #333;
        font-size: 12px;
      }
      input {
        padding: 2px 10px 2px 15px;
        border-radius: 25px;
        border: none;
        line-height: 40px;
        // background: #000;
        background-color: #e8e8e8;
        transition: all 0.3s linear;
      }
      input:focus {
        border: 1px;
        border-style: solid;
        border-color: sandybrown;
        background-color: steelblue;
        color: #fff;
      }
    }
    .options {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        appearance: none;
        outline: none;
        border: none;
        padding: 5px 15px;
        white-space: nowrap;
        margin-left: 5px;
        background-color: #e8e8e8;
        color: white;
        border-radius: 5px;
        transition: all 0.5s;
        cursor: pointer;
      }
      .btn-submit {
        background-color: skyblue;
      }
      .btn-reset {
        color: #333;
        background-color: #ccc;
      }
      .btn-reset:hover {
        background-color: skyblue;
        color: #fff;
      }
    }
  }
}
</style>
