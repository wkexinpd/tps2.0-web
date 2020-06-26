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
                <el-row>
                    <el-button type="primary" @click="addCompanyLectureVisible = true">新增讲座</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
               <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <el-select v-model="queryInfo.directionId" clearable placeholder="请选择实训方向"
                                       @change="getCompanyLectureData" prop="queryInfo.directionId">
                                <el-option
                                        v-for="trainingDirections in trainingDirection"
                                        :key="trainingDirections.id"
                                        :label="trainingDirections.name"
                                        :value="trainingDirections.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入主讲人姓名"
                                      v-model="queryInfo.speaker" clearable
                                      @clear="getCompanyLectureData"></el-input>
                            <el-button type="primary" @click="getCompanyLectureData">查找讲座</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <el-table-column
                                prop="directionName"
                                label="所属方向"
                                style="width: 5%"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="title"
                                label="讲座名称"
                                style="width: 15%"
                                min-width="180">
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
                                prop="speaker"
                                label="主讲人"
                                style="width: 5%"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="place"
                                label="讲座地址"
                                style="width: 15%"
                                min-width="180">
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
                                label="讲座大纲"
                                style="width: 5%;"
                                min-width="90"
                                :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="lectureOutline(scope.row.content,scope.row.title)">查看大纲</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="操作"
                                style="width: 15%"
                                min-width="180">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"
                                           @click="showEditCompanyLecture(scope.row)">
                                    修改
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
                <el-col>
                    <div class="block" style="margin-top: 20px">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="queryInfo.from"
                                :page-sizes="[5,10,15,20]"
                                :page-size="queryInfo.limit"
                                layout="total,sizes,prev, pager, next, jumper"
                                :total="count">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!--新增讲座弹框-->
        <el-dialog title="新增讲座" :visible.sync="addCompanyLectureVisible" width="80%"
                   @close="addFormClosed">
            <el-form :model="addForm" :rules="addFormRules" ref="addFormRef"
                     label-width="80px">
                <el-form-item label="讲座名称" prop="lectureName">
                    <el-input v-model="addForm.lectureName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="讲座封面" style="width: 440px" prop="url">
                    <el-upload
                            action
                            :http-request="Upload"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove"
                            :on-exceed="handleExceed"
                            drag
                            :limit="limit"
                            :file-list="fileList"
                            prop="url">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将图片拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div slot="tip" class="el-upload__tip">上传封面只能为png、jpg且大小不能超过 5M</div>
                    </el-upload>
                    <el-progress
                            v-show="showProgress"
                            :text-inside="true"
                            :stroke-width="15"
                            :percentage="progress"
                    ></el-progress>
                </el-form-item>
                <el-form-item label="主讲人" prop="lecturer">
                    <el-input v-model="addForm.lecturer" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="实训方向" prop="trainingDirectionId">
                    <el-select v-model="addForm.trainingDirectionId" clearable placeholder="请选择实训方向">
                        <el-option
                                v-for="trainingDirectiones in trainingDirection"
                                :key="trainingDirectiones.id"
                                :label="trainingDirectiones.name"
                                :value="trainingDirectiones.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="讲座大纲" prop="lectureOutline">
                    <quill-editor v-model="addForm.lectureOutline">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="视频上传" style="width: 440px" prop="videoUrl">
                    <video-player
                            ref="videoPlayer"
                            class="video-player vjs-custom-skin"
                            :playsinline="true"
                            :options="playerOptions" v-if="addForm.videoUrl!=''"/>
                    <el-upload
                            action
                            :http-request="videoUploads"
                            :before-upload="beforeVideoUpload"
                            :on-remove="videoHandleRemove"
                            :on-exceed="videoHandleExceed"
                            drag
                            :limit="limit"
                            :file-list="videoList"
                            prop="url" v-else>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将视频拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <div slot="tip" class="el-upload__tip">上传视频只能为MP4且大小不能超过 1G</div>
                    </el-upload>
                    <el-progress
                            v-show="videoShowProgress"
                            :text-inside="true"
                            :stroke-width="15"
                            :percentage="videoProgress"
                    ></el-progress>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCompanyLectureVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCompanyLecture">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改讲座弹框-->
        <el-dialog title="修改讲座" :visible.sync="editCompanyLectureVisible" width="80%"
                   @close="editCompanyLectureFormClosed">
            <el-form :model="editCompanyLectureForm" :rules="editCompanyLectureFormRules"
                     ref="editCompanyLectureFormRef"
                     label-width="80px">
                <el-form-item label="讲座名称" prop="lectureName">
                    <el-input v-model="editCompanyLectureForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主讲人" prop="lecturer">
                    <el-input v-model="editCompanyLectureForm.speaker" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="实训方向" prop="trainingDirectionId">
                    <el-select v-model="editCompanyLectureForm.directionId" clearable placeholder="请选择实训方向">
                        <el-option
                                v-for="trainingDirectiones in trainingDirection"
                                :key="trainingDirectiones.id"
                                :label="trainingDirectiones.name"
                                :value="trainingDirectiones.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="讲座大纲" prop="lectureOutline">
                    <quill-editor v-model="editCompanyLectureForm.content">
                    </quill-editor>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCompanyLectureVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCompanyLecture">确 定</el-button>
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
    export default {
        name: "CompanyLectureManage",
        props: {
            limit: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                OSSToken:this.$api.OSSToken,
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
                fileList: [],//文件列
                showProgress: false,//进度条的显示
                progress: 0, //进度条数据

                videoList: [],//文件列
                videoShowProgress: false,//进度条的显示
                videoProgress: 0, //进度条数据
                options: [

                ],
                id: '',
                action: '',
                lectureOutlineList: {
                    lectureOutline: '',
                    lectureName: '',
                },
                lectureOutlineVisible: false,
                uploadVisible: true,
                dialogVisible: false,
                queryInfo: {
                    directionId: '',
                    speaker: '',
                    from: 1,
                    limit: 5,
                },
                trainingDirection: [],
                count: 0,
                addCompanyLectureVisible: false,
                // eslint-disable-next-line no-dupe-keys,vue/no-dupe-keys
                addForm: {
                    lectureOutline: '',
                    lecturer: '',
                    lectureName: '',
                    url: '',
                    trainingDirectionId: '',
                    videoUrl:'',
                },
                editCompanyLectureVisible: false,
                editCompanyLectureForm: {
                    content:'',
                    directionId: '',
                    directionName:'',
                    id:'',
                    speaker: '',
                    title: ''
                },
                addFormRules: {
                    lectureOutline: [
                        {required: true, message: '请输入讲座大纲', trigger: 'blur'},
                    ],
                    lecturer: [
                        {required: true, message: '请输入主讲人', trigger: 'blur'},
                    ],
                    url:[
                        {required: true, message: '请上传讲座封面', trigger: 'blur'},
                    ],
                    lectureName: [
                        {required: true, message: '请输入讲座名称', trigger: 'blur'},
                    ],
                    trainingDirectionId: [
                        {required: true, message: '请选择实训方向', trigger: 'blur'},
                    ],
                    videoUrl: [
                        {required: true, message: '请上传视频文件', trigger: 'blur'}
                    ]
                },
                editCompanyLectureFormRules: {
                    content: [
                        {required: true, message: '请输入讲座大纲', trigger: 'blur'},
                    ],
                    speaker: [
                        {required: true, message: '请输入主讲人', trigger: 'blur'},
                    ],
                    title: [
                        {required: true, message: '请输入讲座名称', trigger: 'blur'},
                    ],
                    directionId: [
                        {required: true, message: '请选择实训方向', trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            this.getCompanyLectureData();
            this.count = this.options.length;
            this.$axios.get(this.$api.GetTrainingDirection,{from:1,limit:20}).then(trainingDirection => {
                if (trainingDirection.data.code !== 200) {
                    this.$message.error("获取实训方向失败")
                }else{
                    this.trainingDirection = trainingDirection.data.result.records;
                }
            });
        },
        methods: {
            showVideo(videoUrl){
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: videoUrl, // url地址
                    }
                ];
                this.showVideoVisible = true;
            },
            //文件上传前的校验
            beforeVideoUpload(file) {
                var type=file.name.substring(file.name.lastIndexOf('.')+1);
                const extension = type === 'mp4';
                const isLt5M = file.size / 1024 / 1024 < 1024;
                const isLt30 = file.name.length < 30;
                if (!extension) {
                    this.$message.error("请上传正确的视频格式");
                    return false;
                }
                if (!isLt5M) {
                    this.$message.error("上传视频大小必须小于1G哦!");
                    return false;
                }
                if (!isLt30) {
                    this.$message.error("上传视频文件名称长度必须要小于30个文字哦!");
                    return false;
                }
            },
            // 文件超出个数限制时的钩子
            handleExceed() {
                this.$message.warning(`每次只能上传 ${this.limit} 个文件`);
            },
            videoHandleExceed() {
                this.$message.warning(`每次只能上传 ${this.limit} 个视频文件`);
            },
            // 文件列表移除文件时的钩子
            handleRemove() {
                this.showProgress = false;
                this.addForm.url = '';
            },
            videoHandleRemove() {
                this.videoShowProgress = false;
                this.addForm.videoUrl = '';
            },
            //文件上传前的校验
            beforeAvatarUpload(file) {
                var type=file.name.substring(file.name.lastIndexOf('.')+1);
                const extension = type === 'jpg';
                const extension2 = type === 'png';
                const isLt5M = file.size / 1024 / 1024 < 5;
                const isLt30 = file.name.length < 30;
                if (!extension && !extension2) {
                    this.$message.error("请上传正确的图片格式");
                    return false;
                }
                if (!isLt5M) {
                    this.$message.error("上传图片大小必须小于5M哦!");
                    return false;
                }
                if (!isLt30) {
                    this.$message.error("上传图片文件名称长度必须要小于30个文字哦!");
                    return false;
                }
            },
            // http-request属性来覆盖默认的上传行为（即action="url"），自定义上传的实现
            Upload(file) {
                this.$upload.upload(this , file);
            },
            videoUploads(file) {
                this.$videoupload.videoUpload(this , file);
            },
            getCompanyLectureData() {
                this.$axios.get(this.$api.CompanyLectureData, this.queryInfo).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取讲座信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize
                this.getCompanyLectureData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage
                this.getCompanyLectureData();
            },
            //    监听对话框关闭事件
            addFormClosed() {
                this.fileList = [];
                this.progress = 0;
                this.showProgress = false;
                this.videoList = [];
                this.videoProgress = 0;
                this.videoShowProgress = false;
                this.$refs.addFormRef.resetFields();
                this.playerOptions.sources= [{
                    type: 'video/mp4',
                    src:'',
                }];
            },
            editCompanyLectureFormClosed() {
                this.fileList = [];
                this.progress = 0;
                this.showProgress = false;
                this.$refs.editCompanyLectureFormRef.resetFields();
            },
            addCompanyLecture() {
                this.$refs.addFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddCompanyLecture, {content:this.addForm.lectureOutline,directionId:this.addForm.trainingDirectionId,img:this.addForm.url,title:this.addForm.lectureName,speaker:this.addForm.lecturer,video:this.addForm.videoUrl}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加讲座成功");
                                this.addCompanyLectureVisible = false;
                                this.addFormClosed();
                                this.getCompanyLectureData();
                            } else {
                                this.$message.error("添加讲座失败");
                            }
                        })
                    }
                })
            },
            showEditCompanyLecture(lecture) {
                this.editCompanyLectureForm.id = lecture.id;
                this.editCompanyLectureForm.content = lecture.content;
                this.editCompanyLectureForm.speaker = lecture.speaker;
                this.editCompanyLectureForm.directionId = lecture.directionId;
                this.editCompanyLectureForm.directionName = lecture.directionName;
                this.editCompanyLectureForm.title = lecture.title;
                this.editCompanyLectureVisible = true;
            },
            editCompanyLecture() {
                this.$refs.editCompanyLectureFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditCompanyLecture, this.editCompanyLectureForm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改讲座信息成功");
                                this.editCompanyLectureVisible = false;
                                this.editCompanyLectureFormClosed();
                                this.getCompanyLectureData();
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
                    this.$axios.delete(this.$api.DelCompanyLecture,{id:id}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getCompanyLectureData();
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