<template>
  <div id="app">
    <!-- <div class="header"> -->
    <router-view name="top"></router-view>
    <!-- </div> -->
    <router-view></router-view>
    <!-- <box/> -->
  </div>
</template>

<script>
import './assets/normalize.css'
// import box from './插槽/index.vue'
// import Login from './admin/Login.vue'
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    // 
    // box
  }
}
</script>

<style>
html,body{ height:100%; }
body {
  background-color: rgb(238, 243, 250)
}
.box{
  display: flex;
  justify-content: space-around;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  height:100%;
}
.el-table--border{
    border: 1px solid #000000 !important;
}
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid #000000;
}
.el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border-right: 1px solid #000000;
}
</style>
