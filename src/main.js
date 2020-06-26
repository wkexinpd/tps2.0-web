import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from "./api/methods.js";
//导入富文本编辑器
import VueQuillEditor from "vue-quill-editor/src";
//导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VideoPlayer from "vue-video-player";
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import JsonExcel from 'vue-json-excel';

Vue.component('downloadExcel', JsonExcel);

// 引入api文件
import api from "./api/api";
import upload from "./api/upload";
import videoUpload from "./api/videoUpload";
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$upload = upload;
Vue.prototype.$videoupload = videoUpload;
Vue.config.productionTip = false;
Vue.use(VueQuillEditor);
Vue.use(VideoPlayer);
//添加全局前置导航守卫
router.beforeEach((to, form, next) => {
    if (to.name !== "login" && !sessionStorage.getItem('login') && !sessionStorage.getItem('token')) {
        next({name: "login"});
    } else {
        next()
    }
});

if(sessionStorage.getItem('route')){
    store.commit("updateRouteData",sessionStorage.getItem('route'));
}


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
