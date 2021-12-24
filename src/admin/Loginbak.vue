<template>
  <div class="home">
    <div class="homebox" v-loading="loading">
      <h3>KGC后台管理系统</h3>
      <el-input
        class="input"
        v-model="username"
        style="width: 500px"
        placeholder="用户名"
      ></el-input>
      <el-input
        class="input"
        placeholder="密码"
        style="width: 500px"
        v-model="password"
        show-password
      ></el-input>
      <el-button
        type="primary"
        size="medium "
        @click="login"
        style="width: 500px"
        >登陆</el-button
      >
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "li",
      password: 123,
      loading: false,
    };
  },
  mounted() {},
  methods: {
    login() {
      this.$axios.get("https://www.fastmock.site/mock/746b3ac0671b15ec7dbaa430e4297d2c/ditu1/todo").then((v) => {
        this.loading = true;
        const uname = [];
        const passw = [];
        const res = v.data;
        for (var i = 0; i < res.length; i++) {
          uname.push(res[i].name);
          passw.push(res[i].pwd);
        }
        // console.log(uname);
        // console.log(passw);
        // console.log(uname.indexOf(this.username) === -1);
        setTimeout(() => {
          if (uname.indexOf(this.username) === -1) {
            this.loading = false;
            this.$message.error("账号不存在，请重新输入！");
          } else if(uname.indexOf(this.username) != -1 && this.username == 'admin'){
            var index = uname.indexOf(this.username);
            console.log(passw[index]);
            if (passw[index] == this.password) {
              this.loading = false;
              this.$message({
                message: "欢迎来到管理员页面！",
                type: "success",
              });
              // sessionStorage.setItem('username',this.username)
              this.$store.commit("setUser", this.username);
              this.$router.push("./Page");
            } else {
              this.loading = false;
              this.$message.error("密码错误，请重新输入");
            }
          }else{
            var index = uname.indexOf(this.username);
            console.log(passw[index]);
            if (passw[index] == this.password) {
              this.loading = false;
              this.$message({
                message: "欢迎登陆用户页面！！！",
                type: "success",
              });
              this.$store.commit("setUser", this.username);
              // window.sessionStorage.setItem('username',this.username)
              this.$router.push("./Page2");
            } else {
              this.loading = false;
              this.$message.error("密码错误，请重新输入");
            }
          }
        }, 2000);
      });
    },
  },
};
</script>
<style>
body {
  background-color: rgb(238, 243, 250);
}
.homebox {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -300px;
  width: 600px;
  height: 300px;
  background-color: rgb(255, 255, 255);
}
h3 {
  padding: 20px 0;
}
.input {
  margin-bottom: 20px;
}
</style>