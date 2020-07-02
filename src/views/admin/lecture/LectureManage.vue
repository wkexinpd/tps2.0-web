<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>讲座管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">讲座信息管理</i></el-breadcrumb-item>
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
                            <TrainingDirection @update="getLectureData"  :trainingDirectionId.sync="queryInfo.directionId"/>
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入主讲人"
                                      v-model="queryInfo.speaker" clearable
                                      @clear="getLectureData"></el-input>
                            <el-button type="primary" @click="getLectureData">查找讲座</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                label="讲座大纲"
                                style="width: 5%;"
                                min-width="90"
                                :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="lectureOutline(scope.row.content,scope.row.title)">查看大纲</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="讲座时间"
                                style="width: 15%"
                                min-width="180">
                            <template slot-scope="scope" v-if="scope.row.endedAt!=null">
                                {{scope.row.startedAt}} - {{scope.row.endedAt.substring(11,19)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="讲座封面"
                                style="width: 5%"
                                min-width="90">
                            <template slot-scope="scope">
                                <el-image
                                        style="width: 100px; height: 60px"
                                        :src="scope.row.img"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="操作"
                                style="width: 15%"
                                min-width="180">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"
                                           @click="showEditLecture(scope.row)">
                                    修改时间地点
                                </el-button>
                                <el-button type="text" size="small" style="color: red"
                                           @click="delCompanyLecture(scope.row.id)">
                                    删除
                                </el-button>
                                <el-button type="text" size="small"
                                           @click="showVideo(scope.row.video)">
                                    查看视频
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <!--        分页区域-->
                <el-col><Pages @pageChange="pageChange" :total="count" :from="queryInfo.from"></Pages></el-col>
            </el-row>
        </el-card>
        <!--修改讲座弹框-->
        <el-dialog title="修改讲座" :visible.sync="editLectureVisible" width="30%"
                   @close="editLectureFormClosed">
            <el-form :model="editLectureForm" :rules="editLectureFormRules"
                     ref="editLectureFormRef"
                     label-width="80px">
                <el-form-item label="讲座地点" prop="lectureSite">
                    <el-input v-model="editLectureForm.lectureSite" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="讲座时间" prop="lectureTime">
                    <el-date-picker
                            v-model="editLectureForm.lectureTime"
                            type="datetimerange"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :default-time="['12:00:00']">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editLectureVisible = false">取 消</el-button>
                <el-button type="primary" @click="editLecture">确 定</el-button>
            </div>
        </el-dialog>
        <!--讲座大纲弹窗-->
        <el-dialog :title="lectureOutlineList.lectureName" :visible.sync="lectureOutlineVisible" width="40%"
                   @close="lectureOutlineClosed">
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                    <div v-html="lectureOutlineList.lectureOutline"></div>
                </div>
            </div>
        </el-dialog>
        <!--视频查看弹窗-->
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
    import TrainingDirection from "@/components/filter/TrainingDirection";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "LectureManage",
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
                showVideoVisible:false,
                options: [],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'讲座名称',prop:'title'},
                        {name:'主讲人',prop:'speaker'},
                        {name:'所属方向',prop:'directionName'},
                        {name:'讲座地址',prop:'place'},
                    ]
                },
                id: '',
                action: '',
                uploadVisible: true,
                dialogVisible: false,
                lectureOutlineVisible : false,
                lectureOutlineList: {
                    lectureOutline: '',
                    lectureName: '',
                },
                queryInfo: {
                    directionId: {},
                    speaker: '',
                    from: 1,
                    limit: 5,
                },
                count: 0,
                editLectureVisible: false,
                editLectureForm: {
                    lectureId: '',
                    lectureSite: '',
                    lectureTime: [],
                },
                editLectureFormRules: {
                    lectureSite: [
                        {required: true, message: '请输入讲座地址', trigger: 'blur'},
                    ],
                    lectureTime: [
                        {required: true, message: '请选择讲座时间', trigger: 'blur'},
                    ]
                },
            }
        },
        created() {
            this.getLectureData();
        },
        components:{
            TrainingDirection,
            TableColumnComponent,
            Pages
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getLectureData();
            },
            showVideo(videoUrl){
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: videoUrl, // url地址
                    }
                ];
                this.showVideoVisible = true;
            },
            getLectureData() {
                this.$axios.get(this.$api.CompanyLectureData, { directionId: this.queryInfo.directionId.value, speaker: this.queryInfo.speaker, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取讲座信息失败");
                    }
                    this.options = res.data.result.records;
                    this.tableColumnDate.options = res.data.result.records;
                    this.count = res.data.result.total;
                })
            },
            //    监听对话框关闭事件
            editLectureFormClosed() {
                this.$refs.editLectureFormRef.resetFields();
            },
            showEditLecture(lecture) {
                this.editLectureForm.lectureId = lecture.id;
                this.editLectureForm.lectureSite = lecture.place;
                if(lecture.startedAt){
                    this.editLectureForm.lectureTime[0] = lecture.startedAt;
                    this.editLectureForm.lectureTime[1] = lecture.endedAt;
                }
                this.editLectureVisible = true;
            },
            editLecture() {
                this.$refs.editLectureFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditLectureSite, {id:this.editLectureForm.lectureId,place:this.editLectureForm.lectureSite,startedAt:this.editLectureForm.lectureTime[0],endedAt:this.editLectureForm.lectureTime[1]}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改讲座信息成功");
                                this.editLectureVisible = false;
                                this.getLectureData();
                            } else {
                                this.$message.error("修改讲座信息失败");
                            }
                        })
                    }
                })
            },
            delCompanyLecture(id) {
                this.$confirm('此操作将永久删除该讲座信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelCompanyLecture, {id:id}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getLectureData();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            lectureOutline(content,title) {
                //查看讲座大纲
                this.lectureOutlineList.lectureName = title;
                this.lectureOutlineList.lectureOutline = content;
                this.lectureOutlineVisible = true;
            },
            lectureOutlineClosed() {
                this.lectureOutlineVisible = false;
                this.lectureOutlineList.lectureName = '';
                this.lectureOutlineList.lectureOutline = '';
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

        }
    }
</script>

<style scoped>

</style>