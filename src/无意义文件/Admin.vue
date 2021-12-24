<template>
  <div class="admin">
    <div class="header">
      <router-view name="top"></router-view>
    </div>
    <router-view></router-view>
    <el-tabs
      v-model="activeName"
      :tab-position="tabPosition"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane label="用户管理" name="first">
        <template>
         
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="编号">
               </el-table-column>
            <el-table-column prop="name" label="用户名"> </el-table-column>
            <el-table-column prop="role" label="角色"> </el-table-column>
            <el-table-column prop="phone" label="手机号码"> </el-table-column>
            <el-table-column prop="email" label="邮箱"> </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteData(scope.$index,tableData)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
      <!-- {{banner[0].id}} -->
      <el-tab-pane v-if="show" label="商品管理" name="second">
        <template>
          <el-table :data="table" style="width: 80%">
            <el-table-column prop="id" label="编号"> </el-table-column>
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="price" label="单价"> </el-table-column>
            <el-table-column prop="number" label="库存"> </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
 
<script>
// import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "Admin",
  computed: {
    ...mapState(["tableData"]),
    ...mapState(["table"]),
  },
  components: {
    top: "top",
  },
  data() {
    return {
      tabPosition: "left",
      activeName: "first",
      content: "",
      banner: "",
      body: "",
      show: true,
    };
  },
 
  mounted() {
    this.$axios.get("/users").then((res) => {
      console.log(res);
      this.banner = res.data;
      console.log(this.banner);
 
      //   const index = data.list.findIndex(item=>item.id === body.id);
      //   console.log(index);
    });
    this.$axios.get("/goods").then((resf) => {
      const user = resf.data;
      console.log(user);
      this.$store.commit("record", user);
      for (let i = 0; i < user.length; i++) {}
    });
  },
 
  methods: {
    getUserList(){
      this.$axios.get("/users").then((res) => {
      console.log(res);
      this.banner = res.data;
      console.log(this.banner);
    });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 删除
     deleteData(index,row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
            
          });
          this.tableData.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // console.log(index, row);
      // 传一个参数id post就直接传
      // 解构写法
      // const {data,res} = await('/api/get/user',{ id })
 
      // 如果是get请求
      /*       const {data,res} = await('/api/get/user',{ 
        params:{
          // id:id
          id
        } 
       }) */
    },
  },
};
</script>
 
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.header {
  width: 100%;
  background-color: #00bfff;
}
</style>