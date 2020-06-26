// axios初始化配置
import axios from "axios";
import {Message} from "element-ui";

const instance = axios.create({
});
instance.interceptors.response.use(function (response){
    if(response.status!=200){
        Message.error(response.data.msg);
    }
    return response;
},function (error) {
    Message.error("服务器错误");
    return Promise.reject(error);
});
instance.interceptors.request.use(config=>{
    config.headers.Authorization = window.sessionStorage.getItem("token");
    return config
});

export {instance};