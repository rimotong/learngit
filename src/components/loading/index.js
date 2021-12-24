import Loading from "./index.vue";

export default {
    // 实现插件必须的install方法
    install(Vue, options) {
        const LoadingConstructor = Vue.extend(Loading);

        let instance = new LoadingConstructor({
            el: document.createElement("div"),
        });
        console.log(instance, options);
        document.body.appendChild(instance.$el)
        if (options) {
            console.log(options);
        }
        const loadingMethods = {
            show(text) {
                instance.show = true;
                if (text) {
                    instance.text = text
                }
            },
            hide() {
                instance.show = false
            }
        }
        Vue.prototype.$loading = loadingMethods
    },
};