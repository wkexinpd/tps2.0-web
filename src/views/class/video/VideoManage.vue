<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>视频管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">视频数据管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <el-select v-model="queryInfo.curriculumId" clearable placeholder="请选择课程名称"
                                       @change="getVideoData" prop="queryInfo.curriculumId">
                                <el-option
                                        v-for="curriculum in currs"
                                        :key="curriculum.id"
                                        :label="curriculum.name"
                                        :value="curriculum.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="flex-right" v-if="len!==0">
                            <el-button type="primary" @click="addVideoVisible=true">上传视频</el-button>
                        </div>
                    </div>
                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                prop="name"
                                label="操作"
                                min-width="90">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"
                                           @click="showVideo(scope.row.url)">
                                    查看视频
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <!--        分页区域-->
                <el-col>
                    <Pages @pageChange="pageChange" :total="count" :from="queryInfo.from"></Pages>
                </el-col>
            </el-row>
        </el-card>
        <!--添加视频弹框-->
        <el-dialog title="添加视频" :visible.sync="addVideoVisible" width="40%"
                   @close="addFormClosed">
            <el-form :model="addForm" :rules="addFormRules"
                     ref="addFormRef"
                     label-width="80px">
                <el-form-item label="视频名称" prop="videoName">
                    <el-input v-model="addForm.videoName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属课程" prop="curriculumId">
                    <el-select v-model="addForm.curriculumId" clearable placeholder="请选择课程名称"
                               prop="queryInfo.curriculumId">
                        <el-option
                                v-for="curriculum in currs"
                                :key="curriculum.id"
                                :label="curriculum.name"
                                :value="curriculum.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item >

                </el-form-item>
                <el-form-item label="视频上传" style="width: 440px" prop="url">
                    <video-player
                            ref="videoPlayer"
                            class="video-player vjs-custom-skin"
                            :playsinline="true"
                            :options="playerOptions" v-if="addForm.url!=''"/>
                    <el-upload
                            action
                            :http-request="Upload"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                            :on-exceed="handleExceed"
                            drag
                            :limit="limit"
                            :file-list="fileList"
                            prop="url" v-else>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将视频拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div slot="tip" class="el-upload__tip">上传视频只能为MP4且大小不能超过 1G</div>
                    </el-upload>
                    <el-progress
                            v-show="showProgress"
                            :text-inside="true"
                            :stroke-width="15"
                            :percentage="progress"
                    ></el-progress>
                </el-form-item>
                <el-form-item label="视频描述" prop="videoDescription">
                    <el-input
                            type="textarea"
                            :rows="2"
                            show-word-limit
                            placeholder="请输入内容"
                            v-model="addForm.videoDescription">
                    </el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVideoVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVideo">确 定</el-button>
            </div>
        </el-dialog>
        <!--视频展示-->
        <el-dialog :visible.sync="showVideoVisible" width="40%"
                   @close="showVideoClosed">
            <VideoPlayerComponent :videoUrl="videoUrl" :showVideoVisible="showVideoVisible"></VideoPlayerComponent>
        </el-dialog>
    </div>
</template>

<script>
    import Pages from "../../../components/Table/Pages";
    import VideoPlayerComponent from "../../../components/Video/VideoPlayerComponent";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    export default {
        name: "VideoManage",
        props: {
            limit: {
                type: Number,
                default: 1
            }
        },
        components:{Pages,VideoPlayerComponent,TableColumnComponent},
        data() {
            return {
                playerOptions: {
                    playbackRates: [0.7, 1.0, 1.5, 2.0],
                    autoplay: false, // 如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [
                        {
                            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                            src: this.videoUrl // url地址
                        }
                    ],
                    hls: true,
                    poster: this.videoCoverUrl, // 你的封面地址
                    width: document.documentElement.clientWidth, // 播放器宽度
                    height: document.documentElement.clientHeight,
                    notSupportedMessage: '视频加载中...', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                showVideoVisible:false,
                videoUrl:'',
                fileList: [],//文件列
                showProgress: false,//进度条的显示
                progress: 0, //进度条数据
                options: [
                ],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'课程名称',prop:'curriculumName'},
                        {name:'主讲人',prop:'curriculumTeacher'},
                        {name:'视频名称',prop:'name'},
                        {name:'视频描述',prop:'description'},
                    ]
                },
                addVideoVisible: false,
                queryInfo: {
                    curriculumId:'',
                    from: 1,
                    limit: 5,
                },
                currs:[],
                addForm:{
                    videoName:'',
                    curriculumId:'',
                    url:'',
                    videoDescription:'',
                },
                addFormRules:{
                    videoName: [
                        {required: true, message: '请输入视频名称', trigger: 'blur'},
                    ],
                    curriculumId: [
                        {required: true, message: '请选择所属课程', trigger: 'blur'},
                    ],
                    url: [
                        {required: true, message: '请上传视频', trigger: 'blur'},
                    ],
                    videoDescription: [
                        {required: true, message: '请添加视频描述', trigger: 'blur'},
                    ],
                },
                count:0,
                //记录班级课程数
                len:0,
            }
        },
        created() {
            this.getCurriculumList();
            this.getVideoData();
        },
        computed: {
            player () {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getVideoData();
            },
            showVideo(url){
                this.videoUrl = url;
                this.showVideoVisible = true;
            },
            getCurriculumList(){
                this.$axios.get(this.$api.GetCurriculumList,this.queryInfo).then(res=>{
                    if (res.data.code===200){
                        if (sessionStorage.getItem('route')==='class') {
                            this.len = res.data.result.length;
                        }
                        this.currs = res.data.result;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            addVideo(){
                this.$axios.post(this.$api.AddVideo,{curriculumId:this.addForm.curriculumId,description:this.addForm.videoDescription,name:this.addForm.videoName,url:this.addForm.url}).then(res=>{
                    if (res.data.code===200){
                      this.$message.success("视频添加成功");
                      this.getVideoData();
                      this.addVideoVisible = false;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getVideoData(){
                this.$axios.get(this.$api.GetVideoData,this.queryInfo).then(res=>{
                    if (res.data.code===200){
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            handleExceed() {
                this.$message.warning(`每次只能上传 ${this.limit} 个文件`);
            },
            // 文件列表移除文件时的钩子
            handleRemove() {
                this.showProgress = false;
                this.addForm.url = '';
            },
            //文件上传前的校验
            beforeAvatarUpload(file) {
                var type=file.name.substring(file.name.lastIndexOf('.')+1);
                const extension = type === 'mp4';
                const isLt5M = file.size / 1024 / 1024 < 1024;
                const isLt30 = file.name.length < 30;
                if (!extension) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!isLt5M) {
                    this.$message.error("上传图片大小必须小于1G哦!");
                    return false;
                }
                if (!isLt30) {
                    this.$message.error("上传图片文件名称长度必须要小于30个文字哦!");
                    return false;
                }
            },
            Upload(file) {
                this.$upload.upload(this , file,1);
            },
            addFormClosed() {
                this.$refs.addFormRef.resetFields();
                this.fileList=[];
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: '', // url地址
                    }
                ];
            },
            showVideoClosed(){
                this.showVideoVisible = false;
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: '', // url地址
                    }
                ];
            }

        },
        mounted() {

        },

    }
</script>

<style scoped>

</style>