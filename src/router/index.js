import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../admin/Login.vue";
import Page from "../admin/Page.vue";
import Page2 from "../admin/Page2.vue";
import User from "../admin/User.vue";
import Commodity from "../admin/Commodity.vue";
import top from "../admin/top.vue";
// import top1 from "../admin/top1.vue";
import Ceshi from "../ceshi.vue"
import git from "../githubss/index.vue"
import notFound from "../admin/404.vue"
import chacao from "../插槽/index.vue"
Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/Login",
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },
    {
        path: "/page",
        name: "Page",
        components: {
            default: Page,
            top,
            // top1
        },
        children: [{
                meta: { isAuth: true },
                path: "/page",
                redirect: "/page/user",
            },
            {
                path: "/page/user",
                name: "User",
                component: User,
                meta: { isAuth: true, title: '用户管理' },
            },
            {
                path: "/page/commodity",
                name: "Commodity",
                component: Commodity,
                meta: { isAuth: true, title: '商品管理' },
            },
            {
                path: "/page/ceshi",
                name: "Ceshi",
                component: Ceshi,
                meta: { isAuth: true, title: '增删改查' },
            },
            {
                path: "/page/git",
                name: "git",
                component: git,
                meta: { isAuth: true, title: 'git搜索' },
            },
            {
                path: "/page/chacao",
                name: "chacao",
                component: chacao,
                meta: { isAuth: true, title: '插槽管理' },
            }
        ],
    },
    {
        path: "/page2",
        name: "Page2",
        components: {
            default: Page2,
            top,
            // top1
        },
        children: [{
                path: "/page2",
                redirect: "/page2/commodity",
            },
            {
                path: "/page2/commodity",
                name: "Commodity",
                component: Commodity,
                meta: { isAuth: true },
            },
        ],
    },
    {
        path: "/404",
        name: "notFound",
        component: notFound
    }, {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/404"
    }
];

const router = new VueRouter({
    routes,
    mode: "history", //兼容性略差
});
// if (to.path == "/login") {
//     next();
// } else {
//     let token = window.sessionStorage.getItem("user"); //username

//     if (!token) {
//         next("/login");
//     } else {
//         next();
//     }
// }
//路由添加权限配置
// if(to.meta.isAuth)
router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        let token = window.sessionStorage.getItem("user"); //username
        if (!token) {
            next("/login");
        } else {
            next();
        }
    } else {
        next();
    }
});
//后置路由守卫
router.afterEach((to, from) => {
    document.title = to.meta.title || "后台管理系统"
})
const originalPush = VueRouter.prototype.push;
// 重写了原型上的push方法，统一的处理了错误信息
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
export default router;