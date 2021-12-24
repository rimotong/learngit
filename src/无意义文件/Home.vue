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
// @ is an alias to /src
 
export default {
  name: "Home",
  data() {
    return {
      username: "",
      password: 123,
      loading: false,
    };
  },
  methods: {
    login() {
      this.$axios.get("/users").then((res) => {
        const home = res.data;
        this.$store.commit("addrecord", home);
        console.log(home);
 
        this.loading = true;
        var timer = setTimeout(() => {
          this.loading = false;
          for (let i = 0; i < home.length; i++) {
            console.log(home[i].name);
            if (this.username == home[i].name && this.password == 123) {
              this.loading = false;
              this.$message({
                message: "恭喜你，登陆成功！",
                type: "success",
              });
              
              return this.$router.push("/admin");
            }
          }
          for (let j = 0; j < home.length; j++) {
            console.log(home[j].name);
            if (this.username != home[j].name || this.password != 123) {
              this.$message.error("错了哦，这是一条错误消息");
              return this.$router.push("/home");
            }
          }
        }, 2000);
        console.log(res);
      });
      this.$axios.get("/goods").then((resf) => {
        const user = resf.data;
        console.log(user);
        this.$store.commit("record", user);
        for (let i = 0; i < user.length; i++) {}
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
  padding-top: 20px;
}
.input {
  margin-bottom: 20px;
}
</style>