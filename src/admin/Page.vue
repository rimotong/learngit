<template>
  <div style="height: calc(100% - 50px);">
    <el-container style="height: 100%">
      <el-col :span="3" >
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" style="height: 100%">
          <el-menu-item index="1" @click="btn1">
            <i class="el-icon-menu"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2" @click="btn2">
            <i class="el-icon-setting"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="btn3">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">增删改查</span>
          </el-menu-item>
          <el-menu-item index="4" @click="btn4">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">git查询</span>
          </el-menu-item>
          <el-menu-item index="5" @click="btn5">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">插槽</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- <background></background> -->
  </div>
</template>

<script>
// import top from "../admin/top";
// import background from '../components/background.vue';
export default {
  name: "Page",
  data() {
    return {
      loading: false,
    };
  },
  // components:{background},
  mounted() {},
  // components: {
  //   top,
  // },
  methods: {
    btn1() {
      this.$router.push("./user");
    },
    btn3() {
      this.$router.push("./ceshi");
    },
    btn2() {
      this.$router.push("./commodity");
    },
    btn4() {
      this.$router.push("./git");
    },
    btn5() {
      this.$router.push("./chacao");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
 
<style scoped>

</style>