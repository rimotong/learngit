<template>
  <div>
  <h1>职位的增删改查</h1>
  <!-- <div class="head">
      <el-row :gutter="20">
          <el-col :span="6">
              <el-input v-model="userInfo.name" placeholder="请输入你的公司名"></el-input>
          </el-col>
          <el-col :span="6">
              <el-input v-model="userInfo.position" placeholder="请输入你的职位"></el-input>
          </el-col>
          <el-col :span="6">
              <el-input v-model="userInfo.major" placeholder="请输入你的专业"></el-input>
          </el-col>
          <el-col :span="6">
              <el-input v-model="userInfo.number" placeholder="请输入数量"></el-input>
          </el-col>
      </el-row>
  </div> -->
  <!-- 主体内容 -->
  <div class="body">
  <el-button type="primary" @click="Visible = true" class="add-btn" plain>添加信息</el-button>
  <template>
  <el-table :data="tableData" style="width: 100%" v-loading="loading">
    <el-table-column label="序号" width="180"><template slot-scope="scope"> {{scope.$index + 1 }} </template></el-table-column>
      <el-table-column prop="name" label="公司名" width="180"></el-table-column>
      <el-table-column prop="position" label="职位"></el-table-column>
      <el-table-column prop="major" label="专业"></el-table-column>
      <el-table-column prop="number" label="数量"></el-table-column>
      <el-table-column prop="birthday" label="操作">
          <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row,scope.$index)" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.$index)" circle></el-button>
      </template>
      </el-table-column>
      </el-table>
      </template>
  </div>
    <!-- 添加用户信息 -->
    <el-dialog title="编辑用户信息" :visible.sync="Visible" width="30%" :before-close="Close">
      <div>
          <el-form ref="add" :model="userInfo" label-width="80px">
              <el-form-item label="公司名">
                  <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                  <el-input v-model="userInfo.position"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                  <el-input v-model="userInfo.major"></el-input>
              </el-form-item>
              <el-form-item label="数量">
                  <el-input v-model="userInfo.number"></el-input>
              </el-form-item>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Visible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
  </el-dialog>
  <!-- 编辑框 -->
  <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
          <el-form ref="form" :model="editObj" label-width="80px">
              <el-form-item label="公司名">
                  <el-input v-model="editObj.name"></el-input>
              </el-form-item>
              <el-form-item label="职位">
                  <el-input v-model="editObj.position"></el-input>
              </el-form-item>
              <el-form-item label="专业">
                  <el-input v-model="editObj.major"></el-input>
              </el-form-item>
              <el-form-item label="数量">
                  <el-input v-model="editObj.number"></el-input>
              </el-form-item>
          </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
      return {
          loading: false,
          userInfo: {
              name: '',
              position: '',
              major: '',
              number: '',
          },
          tableData:[],
          Visible:false,
          dialogVisible: false,
          editObj: {
              name: '',
              position: '',
              major: '',
              number: '',
          },
          userIndex: 0,
      }
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.$axios.get("/datas").then((res) => {
      this.tableData = res.data;
      // this.$store.commit("addrecord", this.tableData);
      this.loading = false;
    });
   }, 500);
  },
  methods: {
      //添加
      addUser() {
          if (!this.userInfo.name) {
              this.$message({
                  message: '请输入你的公司名！',

              });
              return;
          }
          if (!this.userInfo.position) {
              this.$message({
                  message: '请输入你的职位！',
                  type: 'warning'
              });
              return;
          }
          if (!this.userInfo.major) {
              this.$message({
                  message: '请输入你的专业！',
                  type: 'warning'
              });
              return;
          }
          if (!this.userInfo.number) {
              this.$message({
                  message: '请输入数量！',
                  type: 'warning'
              });
              return;
          }
          this.tableData.push(this.userInfo);
          this.userInfo = {
              name: '',
              position: '',
              major: '',
              number: '',
          };
          this.Visible = false
      },

      //删除
      delUser(idx) {
          this.$confirm('确认删除此用户信息？')
              .then(_ => {
                  this.tableData.splice(idx, 1);
              })
              .catch(_ => {});
      },
      //编辑
      editUser(item, idx) {
          this.userIndex = idx;
          this.editObj = {
              name: item.name,
              position: item.position,
              major: item.major,
              number: item.number,
          };
          this.dialogVisible = true;
      },

      handleClose() {
          this.dialogVisible = false;
      },
      Close() {
          this.Visible = false;
      },
      confirm() {
          this.dialogVisible = false;
          this.$set(this.tableData, this.userIndex, this.editObj);
      }
  },
}
</script>