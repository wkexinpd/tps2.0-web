<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>实训管理</el-breadcrumb-item>
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
                    </div>
                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <el-table-column
                                prop="curriculumName"
                                label="课程名称"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="curriculumTeacher"
                                label="主讲人"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                label="视频名称"
                                min-width="90"
                                prop="name">
                        </el-table-column>
                        <el-table-column
                                prop="description"
                                label="视频描述"
                                min-width="180">
                        </el-table-column>
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
                    <div class="block" style="margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="queryInfo.from"
                                :page-sizes="[5,10,15,20,50,100]"
                                :page-size="queryInfo.limit"
                                layout="total,sizes,prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!--视频展示-->
        <el-dialog :visible.sync="showVideoVisible" width="40%"
                   @close="showVideoClosed">
                    <video-player
                            ref="videoPlayer"
                            class="video-player vjs-custom-skin"
                            :playsinline="true"
                            :options="playerOptions" v-if="showVideoVisible===true"/>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CompanyVideoManage",
        props: {
            limit: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                showVideoVisible:false,
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
                            src: '', // url地址
                        }
                    ],
                    hls: true,
                    poster: this.videoCoverUrl, // 你的封面地址
                    width: document.documentElement.clientWidth, // 播放器宽度
                    height: document.documentElement.clientHeight,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // 全屏按钮
                    }
                },
                // fileList: [],//文件列
                // showProgress: false,//进度条的显示
                // progress: 0, //进度条数据
                options: [
                ],
                // addVideoVisible: false,
                queryInfo: {
                    curriculumId:'',
                    from: 1,
                    limit: 5,
                },
                currs:[],
                count:0,
                //记录班级课程数
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
            showVideo(url){
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: url, // url地址
                    }
                ];
                this.showVideoVisible = true;
            },
            getCurriculumList(){
                this.$axios.get(this.$api.AdminGetCurriculumList,this.queryInfo).then(res=>{
                    if (res.data.code==200){
                        this.currs = res.data.result;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getVideoData(){
                let apis;
                if(sessionStorage.getItem('route')=='company'){
                    apis=this.$api.CompanyGetVideo
                }else{
                    apis=this.$api.AdminGetVideo
                }
                this.$axios.get(apis,this.queryInfo).then(res=>{
                    if (res.data.code==200){
                        this.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize
                this.getLectureData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage
                this.getLectureData();
            },
            addFormClosed() {
                this.$refs.addFormRef.resetFields();
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