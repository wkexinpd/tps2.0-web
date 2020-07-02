<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">学生信息管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="addStudentVisible = true">新增学生</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <CollegeDirection @update="getStudentData" :collegeDirectionId.sync="queryInfo.collegeDirectionId"  />
                            <CollegeClass @update="getStudentData"  :collegeClassId.sync="queryInfo.collegeClassId"  />
                            <TrainingDirection @update="getStudentData"  :trainingDirectionId.sync="queryInfo.trainingDirectionId"/>
                            <TrainingClass @update="getStudentData" :trainingClassId.sync="queryInfo.trainingClassId"/>
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入学生姓名"
                                      v-model="queryInfo.studentName" clearable @clear="getStudentData"></el-input>
                            <el-button type="primary" @click="getStudentData">查找学生</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table
                            :data="options"
                            border
                    width="100%">
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                prop="name"
                                label="操作"
                                style="width: 16%"
                                min-width="150">
                            <template slot-scope="scope">
                                <ResetPassword :user-id="scope.row.userId" />
                                <el-button type="text" size="small" @click="showEditStudent(scope.row)">
                                    修改
                                </el-button>
                                <el-button type="text" size="small" style="color: red"
                                           @click="delStudent(scope.row.studentId)">
                                    删除
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
        <!--新增学生用户弹框-->
        <el-dialog title="新增学生用户" :visible.sync="addStudentVisible" width="40%" @close="addDialogClosed">
            <el-form :model="addStudentForm" :rules="addStudentFormRules" ref="addStudentFormRef" label-width="20%">
                <el-form-item label="学号" prop="sno">
                    <el-input v-model="addStudentForm.sno" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="studentName">
                    <el-input v-model="addStudentForm.studentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="studentTelephone">
                    <el-input v-model="addStudentForm.studentTelephone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="collegeClassId">
                    <CollegeClass :collegeClassId="addStudentForm.collegeClassId" ></CollegeClass>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addStudentVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStudent">确 定</el-button>
            </div>
        </el-dialog>
        <!--  修改学生用户信息-->
        <el-dialog title="修改学生用户" :visible.sync="editStudentVisible" width="40%" @close="editDialogClosed">
            <el-form :model="editStudentForm" :rules="editStudentFormRules" ref="editStudentFormRef" label-width="20%">
                <el-form-item label="学号" prop="sno">
                    <el-input v-model="editStudentForm.sno" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="studentName">
                    <el-input v-model="editStudentForm.studentName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="studentTelephone">
                    <el-input v-model="editStudentForm.studentTelephone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="班级" prop="collegeClassId">
                    <CollegeClass :collegeClassId.sync="editStudentForm.collegeClassId" ></CollegeClass>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editStudentVisible = false">取 消</el-button>
                <el-button type="primary" @click="editStudent">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import CollegeDirection from "@/components/filter/CollegeDirection";
    import CollegeClass from "@/components/filter/CollegeClass";
    import TrainingDirection from "@/components/filter/TrainingDirection";
    import TrainingClass from "@/components/filter/TrainingClass";
    import ResetPassword from "../../../components/ResetPassword";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "StudentUserManage",
        data() {
            var checkMobile = (rule, value, callback) => {
                const regMobile = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if (regMobile.test(value)) {
                    return callback()
                } else {
                    callback(new Error('请输入合法的手机号'));
                }
            };
            var checkCollegeClassId = (rule,value,callback)=>{
                if (!value.value){
                    callback(new Error('请选择学院班级'));
                }else {
                    return callback()
                }
            };
            return {
                options: [],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'学号',prop:'studentNumber'},
                        {name:'姓名',prop:'name'},
                        {name:'联系方式',prop:'phone'},
                        {name:'学院方向',prop:'majorName'},
                        {name:'班级',prop:'majorClassName'},
                        {name:'实训方向',prop:'directionName'},
                        {name:'实训班级',prop:'directionClassName'}
                    ]
                },
                id: '',
                queryInfo: {
                    studentName: '',
                    collegeDirectionId: {},
                    //学院班级
                    collegeClassId: {},
                    //实训班级
                    trainingClassId: {},
                    trainingDirectionId: {},
                    from: 1,
                    limit: 5,
                },
                count: 0,
                addStudentVisible: false,
                addStudentForm: {
                    studentName: '',
                    sno: '',
                    studentTelephone: '',
                    collegeClassId: {},
                },
                editStudentVisible: false,
                editStudentForm: {
                    studentId: '',
                    studentName: '',
                    sno: '',
                    studentTelephone: '',
                    collegeClassId: {},
                },
                addStudentFormRules: {
                    studentName: [
                        {required: true, message: '请输入学生姓名', trigger: 'blur'},
                    ],
                    studentTelephone: [
                        {required: true, message: '请输入学生联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                    sno: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                    ],
                    collegeClassId:[
                        {required: true, message: '请选择学生班级', trigger: 'blur'},
                        {validator: checkCollegeClassId, trigger: 'blur'},
                    ],
                },
                editStudentFormRules: {
                    studentName: [
                        {required: true, message: '请输入学生姓名', trigger: 'blur'},
                    ],
                    studentTelephone: [
                        {required: true, message: '请输入学生联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                    sno: [
                        {required: true, message: '请输入学号', trigger: 'blur'},
                    ],
                    collegeClassId:[
                        {required: true, message: '请选择学生班级', trigger: 'blur'},
                        {validator: checkCollegeClassId, trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            this.getStudentData();
        },
        components: {
            ResetPassword,
            TrainingDirection,
            TrainingClass,
            CollegeDirection,
            CollegeClass,
            TableColumnComponent,
            Pages
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getStudentData();
            },
            getStudentData() {
                this.$axios.get(this.$api.StudentData, {directionClassId:this.queryInfo.trainingClassId.value,directionId:this.queryInfo.trainingDirectionId.value,from:this.queryInfo.from,limit:this.queryInfo.limit,majorClassId:this.queryInfo.collegeClassId.value,majorId:this.queryInfo.collegeDirectionId.value}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取学生信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            //    监听对话框关闭事件
            addDialogClosed() {
                this.$refs.addStudentFormRef.resetFields();
                this.addStudentForm.collegeClassId = {};
            },
            addStudent() {
                this.$refs.addStudentFormRef.validate(valid => {
                    if (valid === false) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddStudent, {name:this.addStudentForm.studentName, phone:this.addStudentForm.studentTelephone, studentNumber:this.addStudentForm.sno,majorClassId:this.addStudentForm.collegeClassId.value}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加学生成功");
                                this.addStudentVisible = false;
                                this.getStudentData();
                            } else {
                                this.$message.error("添加学生失败");
                            }
                        })
                    }
                })
            },
            editDialogClosed() {
                this.$refs.editStudentFormRef.resetFields();
                this.editStudentForm.collegeClassId = {};
            },
            showEditStudent(student) {
                this.editStudentForm.studentId = student.userId;
                this.editStudentForm.studentName = student.name;
                this.editStudentForm.sno = student.studentNumber;
                this.editStudentForm.studentTelephone = student.phone;
                this.editStudentForm.collegeClassId.value = student.majorClassId;
                this.editStudentVisible = true;
            },
            editStudent() {
                this.$refs.editStudentFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditStudent, this.editStudentForm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改学生信息成功");
                                this.addStudentVisible = false;
                                this.getStudentData();
                            } else {
                                this.$message.error("修改学生信息失败");
                            }
                        })
                    }
                })
            },
            delStudent(id) {
                this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelStudent, id).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getStudentData();
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
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>