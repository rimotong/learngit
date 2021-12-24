import Vue from 'vue'
import "./assets/sass/theme.scss";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/axios'
import router from './router/index'
import store from './store'
import App from './App.vue'
import loading from './components/loading/index'

Vue.use(ElementUI);
Vue.use(loading, {
    size: 'small'
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')