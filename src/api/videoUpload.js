export default {
    getFileNameUUID(){
        function rx() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        }
        return `${+new Date()}_${rx()}${rx()}`
    },
    videoUpload(that,file){
        let ossUrl = '';
        ossUrl = that.$api.OSSToken1;
        //获取签名
        that.$axios.get(ossUrl).then(res => {
            if(res.data.code == 200){
                that.aliyunOssToken = res.data.result;
                let temporary = file.file.name.lastIndexOf(".");
                let fileNameLength = file.file.name.length;
                let fileFormat = file.file.name.substring(
                    temporary + 1,
                    fileNameLength
                );
                let fileName = this.getFileNameUUID();
                if (file.length == 0) {
                    alert("请选择文件");
                    return
                }
                const req = new FormData();

                req.append('key', that.aliyunOssToken.dir + fileName+'.'+fileFormat); //存储在oss的文件路径
                req.append('OSSAccessKeyId', that.aliyunOssToken.accessId); //accessKeyId
                req.append('policy', that.aliyunOssToken.policy); //policy
                req.append('Signature', that.aliyunOssToken.signature); //签名
                req.append("file", file.file);
                req.append('success_action_status', 200); //成功后返回的操作码
                var url = that.aliyunOssToken.host;
                var fileUrl = that.aliyunOssToken.dir + fileName+'.'+fileFormat;
                that.$axios.post(url,req, { "Content-Type": "multipart/form-data" }, e => {
                    that.videoShowProgress = true;
                    that.videoProgress = (e.loaded/e.total) * 100;
                }).then(res=>{
                    if(res.status==200){
                        //  fileUrl;
                        that.videoList = [{
                            name: fileName+'.'+fileFormat,
                            url: fileUrl
                        }];
                        that.$axios.get(that.$api.OSSTestVideo,{videoPath:fileUrl}).then(res=>{
                            that.playerOptions.sources= [{
                                type: 'video/mp4',
                                src: res.data.result.url
                            }];
                        });
                        that.addForm.videoUrl = fileUrl;
                    }
                }).catch(function(error){
                    that.$message.error(error)
                    return
                });
            }else{
                this.$message.error(res.data.msg);
                return
            }
        }).catch(function(error){
            that.$message.error(error)
            return
        });

    },
}