// 请求方法封装
import {instance} from "./init";

export default {
    get(url, data = {}) {
        return instance({
            method: "get",
            url,
            params: data
        })
    },
    post(url, data,header,onUploadProgress = {}){
        return instance({
            method: "post",
            url,
            data,
            header,
            onUploadProgress
        })
    },
    put(url, data ,headers = {}){
        return instance({
            method: "put",
            url,
            headers,
            params: data
        })
    },
    delete(url, data = {}){
        return instance({
            method: "delete",
            url,
            params: data
        })
    },
}