<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>视频管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">课程管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="addCurriculumVisible=true">添加课程</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                label="课程封面"
                                min-width="90">
                            <template slot-scope="scope">
                                <el-image
                                        style="width: 100px; height: 60px"
                                        :src="scope.row.coverUrl"></el-image>
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
        <!--添加课程弹窗弹框-->
        <el-dialog title="添加课程" :visible.sync="addCurriculumVisible" width="40%"
                   @close="addFormClosed">
            <el-form :model="addForm" :rules="addFormRules"
                     ref="addFormRef"
                     label-width="80px">
                <el-form-item label="课程名称" prop="curriculumName">
                    <el-input v-model="addForm.curriculumName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主讲人" prop="curriculumTeacher">
                    <el-input v-model="addForm.curriculumTeacher" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程封面" style="width: 440px" prop="url">
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
                <el-form-item label="课程描述" prop="curriculumDescription">
                    <el-input
                            type="textarea"
                            :rows="2"
                            show-word-limit
                            placeholder="请输入内容"
                            v-model="addForm.curriculumDescription">
                    </el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCurriculumVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCurriculum">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Pages from "../../../components/Table/Pages";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    export default {
        name: "CurriculumManage",
        props: {
            limit: {
                type: Number,
                default: 1
            }
        },
        components:{
          Pages,
          TableColumnComponent
        },
        data() {
            return {
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'课程名称',prop:'name'},
                        {name:'主讲人',prop:'teacher'},
                        {name:'视频描述',prop:'description'},
                    ]
                },
                fileList: [],//文件列
                showProgress: false,//进度条的显示
                progress: 0, //进度条数据
                options: [
                ],
                addCurriculumVisible: false,
                queryInfo: {
                    from: 1,
                    limit: 5,
                },
                count:0,
                url:'',
                addForm:{
                    curriculumName:'',
                    curriculumTeacher:'',
                    url:'',
                    curriculumDescription:'',
                },
                addFormRules:{
                    curriculumName: [
                        {required: true, message: '请输入课程名称', trigger: 'blur'},
                    ],
                    curriculumTeacher: [
                        {required: true, message: '请输入主讲人', trigger: 'blur'},
                    ],
                    url: [
                        {required: true, message: '请上传课程封面', trigger: 'blur'},
                    ],
                    curriculumDescription: [
                        {required: true, message: '请输入视频描述', trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            this.getCurriculumData();
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getCurriculumData();
            },
            addCurriculum(){
                  this.$axios.post(this.$api.AddCurriculum,{coverUrl:this.addForm.url,description:this.addForm.curriculumDescription,name:this.addForm.curriculumName,teacher:this.addForm.curriculumTeacher}).then(res =>{
                      if (res.data.code===200){
                          this.$message.success("课程添加成功");
                          this.addCurriculumVisible = false;
                          this.getCurriculumData();
                      }else{
                          this.$message.error(res.data.msg)
                      }
                  })
            },
            addFormClosed() {
                this.$refs.addFormRef.resetFields();
            },
            getCurriculumData(){
                this.$axios.get(this.$api.GetCurriculumData,this.queryInfo).then(res=>{
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
                this.addCompanyLectureForm.lectureCover = '';
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
            Upload(file) {
                this.$upload.upload(this , file,0);
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>