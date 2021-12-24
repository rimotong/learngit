<template>
  <div class="home">
    <div class="homebox" v-loading="loading">
      <h3>个人后台管理系统</h3>
      <div>
        <!-- 输入框-->
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" label-width="0px" style="width: 500px;margin: auto;">
          <!-- 用户名 prop="username" 与表单验证属性对应-->
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item prop="sidentify">
            <input v-model="loginForm.sidentify" placeholder="点击图片可切换验证码" clearable  class="box1" maxlength="4"/>
            <div @click="refreshCode" class="box2">
              <!--验证码组件-->
              <s-identify :identifyCode="identifyCode"></s-identify>
            </div>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item style="margin-top: 0%;">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import SIdentify from './canvas.vue';
  export default {
    components:{SIdentify},
    name: "Login",
    data() {
      const sidentify = (rule, value, callback) => {
          let newVal = value.toLowerCase()
          let identifyStr = this.identifyCode.toLowerCase()
          if (newVal === '') {
              callback(new Error('请输入验证码'))
          } else if (newVal !== identifyStr) {
              console.log('validateVerifycode:', value)
              callback(new Error('验证码不正确'))
          } else {
              callback()
          }
      };
      return {
        loading: false,
        identifyCode: '',
        identifyCodes: '1234567890',//abcdefjhijklinopqrsduvwxyz
        // 表单数据
        loginForm: {
          username: '',
          password: '',
          sidentify:''
        },
        // 表单验证
        loginRules: {
          username: [
            // trigger: 'blur' 表示失去焦点触发
            {required: true, message: '请输入登录账号', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          sidentify: [
              {validator: sidentify, trigger: 'blur'},
              {min: 4, max: 4, message: '长度为4个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 刷新验证码
      refreshCode () {
          this.identifyCode = ''
          this.makeCode(this.identifyCodes,4);
      },
      makeCode (o,l) {
          for (let i = 0; i<l; i++) {
              this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
          }
      },
      randomNum (min, max) {
          return Math.floor(Math.random() * (max - min) + min)
      },
      // 重置登录表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      // 登录
      login() {
        // 登录前参数验证
        this.$refs.loginFormRef.validate(async (valid) => {
          if (!valid) {
            console.log("参数验证失败")
            return
          }else{
        this.$axios.get("/todo").then((v) => {
          this.loading = true;
          const uname = [];
          const passw = [];
          console.log(v);
          const res = v.data;
          for (var i = 0; i < res.length; i++) {
            uname.push(res[i].name);
            passw.push(res[i].pwd);
          }
          setTimeout(() => {
            if (uname.indexOf(this.loginForm.username) === -1) {
              this.loading = false;
              this.$message.error("账号不存在，请重新输入！");
            } else if(uname.indexOf(this.loginForm.username) != -1 && this.loginForm.username == 'admin'){
              var index = uname.indexOf(this.loginForm.username);
              console.log(passw[index]);
              if (passw[index] == this.loginForm.password) {
                this.loading = false;
                this.$message({
                  message: "欢迎来到管理员页面！",
                  type: "success",
                });
                // sessionStorage.setItem('username',this.username)
                this.$store.commit("setUser", this.loginForm.username);
                this.$router.push("./Page");
              } else {
                this.loading = false;
                this.$message.error("密码错误，请重新输入");
              }
            }else{
              var index = uname.indexOf(this.loginForm.username);
              console.log(passw[index]);
              if (passw[index] == this.loginForm.password) {
                this.loading = false;
                this.$message({
                  message: "欢迎登陆用户页面！！！",
                  type: "success",
                });
                this.$store.commit("setUser", this.loginForm.username);
                // window.sessionStorage.setItem('username',this.username)
                this.$router.push("./Page2");
              } else {
                this.loading = false;
                this.$message.error("密码错误，请重新输入");
              }
            }
          }, 2000);
        });
          }
        })
      }
    },
    mounted () {
        // 初始化验证码
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
    },
  }
</script>
<style scoped>
/* body {
  background-color: rgb(238, 243, 250)
} */
 /* /deep/  .el-table, .el-table__expanded-cell {
    background-color: rgb(238, 243, 250);rgb(137, 186, 255);
    background-color: transparent;//这是设置透明背景色
  } */
.homebox {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -175px;
  margin-left: -300px;
  width: 600px;
  height: 350px;
  background-color: rgb(255, 255, 255);
}
h3 {
  padding: 20px 0;
}
.input {
  margin-bottom: 10px;
}
.box1 {width: 200px;float:left; display:inline;height: 30px;}
.box2 {float:left; display:inline;}
</style>