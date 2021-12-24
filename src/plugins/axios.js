"use strict";

import Vue from 'vue';
import axios from "axios";
let config = {
    baseURL: 'https://www.fastmock.site/mock/746b3ac0671b15ec7dbaa430e4297d2c/ditu1' //默认接口路径
};
// 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//     config => {
//       if (localStorage.getItem('Authorization')) {
//         config.headers.Authorization = localStorage.getItem('Authorization');
//       }

//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     });
const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

_axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

Vue.use(Plugin)

export default Plugin;