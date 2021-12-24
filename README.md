# vue2-admin

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 路由传参
1.<router-link :to="path:'路由路径',query:{id:item.id,title:item.title}">
读取传参数据
$route.query.id
$route.query.title

2.params传参
路由文件中path：/page/user/:id/:title
传递：<router-link :to="name:'路由name',params:{id:item.id,title:item.title}">
错误：to中不允许使用path，只能使用路由name
读取参数
$route.params.id
$route.params.title

3.路由props。
哪个路由接收数据哪个路由添加props（路由index文件路径中）
props:true //若布尔值为真，会把路由收到的params参数，以props形式传递给相关组件（不会理会query参数）
另一种方法
props($route){
    return {id:$route.query.id,title:$route.query.title}
}//可简写为
props(query:{id,title}){
    return {id,title}
}
<keep-alive include="组件name">//不销毁某个组件路由
    <router-view></router-view>
</keep-alive>

4.路由生命周期钩子
  activated(){},//组件激活
  deactivated() {},组件失活

5.权限管理
路由添加权限配置
每个需要权限控制的路由都添加配置：
meta: { isAuth: true }, //可添加meta.title，meta.icon等
router.beforeEach((to, from, next) => {} //前置路由守卫
router.afterEach((to, from) => {document.title = to.meta.title || "后台管理系统"}//后置路由守卫

6.独享路由守卫 //无后置
beforeEnter: (to, from, next) => {}

7.组件内路由守卫
//通过路由规则进入该组件后调用
beforeRouteEnter (to, from, next) {},
//通过路由规则离开该组件后调用
beforeRouteLeave (to, from, next) {}

### history模式404问题
需后端人员配合修改，也可利用nginx解决：
nginx
location /{
  root html;
  index index.html index.htm;
  try_files $uri $uri/ /index.html; //新添加这一行就行
}