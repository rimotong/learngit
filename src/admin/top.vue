<template>
  <div class="header">
    <div class="header-left">
      <div class="left">个人后台管理系统</div>
    </div>
    <div class="header-right">
      <!-- 切换背景颜色 -->
      <!-- <button class="btn" @click="modelChange">模式切换</button> -->
      <div class="header-right__logout">
        <el-button type="danger" size="20" @click="logout">退出</el-button>
      </div>
      <div class="header-right__info">
        <div class="right">{{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "top",
  data() {
    return {
      name: "",
      dark:false,
    };
  },
  mounted() {
    this.name = this.user
    // sessionStorage.getItem("username");
    // window.document.documentElement.setAttribute( "data-theme", 'light' );
  },
  methods: {
    // modelChange(){
    //   this.dark = !this.dark;
    //   if(this.dark){
    //     window.document.documentElement.setAttribute( "data-theme", 'dark' );
    //   }else{
    //     window.document.documentElement.setAttribute( "data-theme", 'light' );
    //   }
    // },
    logout() {
      this.$confirm("您确定要退出吗, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.clear();
          this.$message({
            message: "你已经退出登陆！请重新登录账号",
            type: "warning",
          });
          this.$router.push({ path: "/" });
        })
        .catch((err) => err);
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  //通过路由规则进入该组件后调用
  // beforeRouteEnter (to, from, next) {},
  //通过路由规则离开该组件后调用
  // beforeRouteLeave (to, from, next) {}
};
</script>

<style lang="scss">
// @import '../assets/sass/theme.scss';
.header {
  height: 50px;
  line-height: 50px;
  background-color: rgb(73, 80, 96);
  padding: 0 50px;
  color: #fff;
}
.left {
  color: #fff;
  float: left;
}
.header-right__info {
  float: right;
  margin: 0 20px;
}
.header-right__logout {
  float: right;
}
// #app{
//   //在此使用了背景颜色变量
//   @include background_color("background_color");
//   //再次使用了文字颜色变量
//   @include font_color("text-color");
//   width: 100vw;
//   height: 100vh;
//   .btn{
//     width: 100px;
//     height: 40px;
//     margin:  0 auto;
//   }
// }
</style>