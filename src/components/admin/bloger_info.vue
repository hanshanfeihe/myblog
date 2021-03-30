<template>
  <div id="bloger-info">
    <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>本站信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="manage">
      <div class="title">
        账号密码管理
      </div>
      <div class="manage-pwd">
        <div class="label">用户名：</div>
        <el-input
          v-model="loginForm.username"
          placeholder="登录用户名"
        ></el-input>
        <div class="label">密码：</div>
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
        ></el-input>
        <div class="options" style="margin:10px 0;">
          <el-button type="primary" icon="el-icon-edit" @click="setLoginForm"
            >修改</el-button
          >
        </div>
      </div>
    </div>
    <div class="manage">
      <div class="title">
        个人信息展示管理
      </div>
      <div class="manage-pwd">
        <div class="label">昵称：</div>
        <el-input placeholder="请输入昵称" v-model="loginForm.name"></el-input>
        <div class="label">Git地址：</div>
        <el-input v-model="loginForm.git" placeholder="登录Git地址"></el-input>
        <div class="label">微博：</div>
        <el-input
          placeholder="请输入微博地址"
          v-model="loginForm.weibo"
        ></el-input>
        <div class="label">头像上传：</div>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:3000/upload/uploadimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="loginForm.avatar" :src="loginForm.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="options" style="margin:10px 0;">
          <el-button type="primary" @click="setBlogerForm">报存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "blogerInfo",
  data() {
    return {
      id: null,
      loginForm: {
        username: "",
        password: "",
        git: null,
        weibo: null,
        avatar: "",
        name: ""
      }
    };
  },
  methods: {
    // 获取用户名和密码
    async getLoginForm() {
      const { data: res } = await this.http.get(
        "http://127.0.0.1:3000/admin/loginform"
      );
      console.log(res);
      this.loginForm.username = res.data.username;
      this.loginForm.password = res.data.password;
      this.id = res.data.id;
      this.loginForm.git = res.data.git;
      this.loginForm.weibo = res.data.weibo;
      this.loginForm.avatar = res.data.avatar;
      this.loginForm.name = res.data.name;
    },
    //修改用户名和密码
    async setLoginForm() {
      const { data: res } = await this.http.put(
        "http://127.0.0.1:3000/admin/updateloginform",
        {
          password: this.loginForm.password,
          username: this.loginForm.username,
          id: this.id
        }
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message.success("修改成功");
      } else {
        this.$message.error("修改失败");
      }
    },
    //修改展示信息
    async setBlogerForm() {
      const { data: res } = await this.http.put(
        "http://127.0.0.1:3000/admin/setblogerinfo",
        {
          git: this.loginForm.git,
          weibo: this.loginForm.weibo,
          avatar: this.loginForm.avatar,
          name: this.loginForm.name,
          id: this.id
        }
      );
      console.log(res);
      if (res.meta.status === 200) {
        this.$message.success("修改成功");
      } else {
        this.$message.error("修改失败");
      }
    },
    handleAvatarSuccess(res) {
      console.log(res.data.url);
      console.log(this.loginForm.avatar);
      this.loginForm.avatar = res.data.url;
      // this.loginForm.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {
    console.log(this.loginForm);
    this.getLoginForm();
  }
};
</script>
<style lang="less">
#bloger-info {
  background: #fff;
  padding: 15px;
  .header {
    margin-bottom: 25px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed red !important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
