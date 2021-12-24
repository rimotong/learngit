<template>
  <div style="height: calc(100% - 50px);">
    <el-container style="height:100%">
      <el-col :span="3">
        <el-menu default-active="1" class="el-menu-vertical-demo" style="height:100%">
          <el-menu-item index="2">
            <i class="el-icon-setting"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
 
<script>
import top from "../admin/top";
export default {
  name: "Page",
  data() {
    return {
      loading: false,
    };
  },
  mounted() {},
  components: {
    top,
  },
  methods: {
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
/* .el-main {
  padding: 0;
} */
</style>