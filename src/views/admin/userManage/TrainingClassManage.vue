<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">实训班级管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="addTrainingClassVisible = true">新增实训班级</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <TrainingDirection @update="getTrainingClassData"  :trainingDirectionId.sync="queryInfo.directionId"/>
                            <TrainingCompany @update="getTrainingClassData"  :trainingCompanyId.sync="queryInfo.companyUserId" />
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入班级名称"
                                      v-model="queryInfo.name" clearable @clear="getTrainingClassData"></el-input>
                            <el-button type="primary" @click="getTrainingClassData">查找班级</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px" :xs="24" :sm="24" :md="24">
                    <el-table
                            :data="options"
                            border
                            style="width: 100%">
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                prop="name"
                                label="操作"
                                align="center"
                                style="width:30%">
                            <template slot-scope="scope">
                                <ResetPassword :user-id="scope.row.userId"></ResetPassword>
                                <el-button type="text" size="small"
                                           @click="showEditTrainingClass(scope.row)">
                                    修改
                                </el-button>
                                <el-button type="text" size="small" style="color: red"
                                           @click="delTrainingClass(scope.row.userId)">
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
        <!--新增实训班级弹框-->
        <el-dialog title="新增实训班级" :visible.sync="addTrainingClassVisible" width="30%" @close="addDialogClosed">
            <el-form :model="addTrainingClassForm" :rules="addTrainingClassFormRules" ref="addTrainingClassFormRef"
                     label-width="20%">
                <el-form-item label="班级名称" prop="name">
                    <el-input v-model="addTrainingClassForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="teacher">
                    <el-input v-model="addTrainingClassForm.teacher" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="addTrainingClassForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课地点" prop="address">
                    <el-input v-model="addTrainingClassForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="实训方向" prop="directionId">
                    <TrainingDirection   :trainingDirectionId.sync="addTrainingClassForm.directionId"/>
                </el-form-item>
                <el-form-item label="实训企业" prop="companyUserId">
                    <TrainingCompany  :trainingCompanyId.sync="addTrainingClassForm.companyUserId" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTrainingClassVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTrainingClass">确 定</el-button>
            </div>
        </el-dialog>
        <!--修改实训班级弹框-->
        <el-dialog title="修改实训班级信息" :visible.sync="editTrainingClassVisible" width="30%" @close="editDialogClosed">
            <el-form :model="editTrainingClassForm" :rules="editTrainingClassFormRules" ref="editTrainingClassFormRef"
                     label-width="20%">
                <el-form-item label="班级名称" prop="name">
                    <el-input v-model="editTrainingClassForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="负责人" prop="teacher">
                    <el-input v-model="editTrainingClassForm.teacher" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="editTrainingClassForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="上课地点" prop="trainingClassSite">
                    <el-input v-model="editTrainingClassForm.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="实训方向" prop="trainingDirectionId">
                    <TrainingDirection  :trainingDirectionId.sync="editTrainingClassForm.directionId"/>
                </el-form-item>
                <el-form-item label="实训企业" prop="companyId">
                    <TrainingCompany  :trainingCompanyId.sync="editTrainingClassForm.companyUserId" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editTrainingClassVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTrainingClass">确 定</el-button>
            </div>
        </el-dialog>

    </div>

</template>

<script>
    import TrainingDirection from "@/components/filter/TrainingDirection";
    import TrainingCompany from "@/components/filter/TrainingCompany";
    import ResetPassword from "@/components/ResetPassword";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "TrainingClassManage",
        data() {
            var checkMobile = (rule, value, callback) => {
                const regMobile = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if (regMobile.test(value)) {
                    return callback()
                } else {
                    callback(new Error('请输入合法的手机号'));
                }
            };
            var checkTrainingDirectionId = (rule,value,callback)=>{
                if (!value.value){
                    callback(new Error('请选择实训方向'));
                }else {
                    return callback()
                }
            };
            var checkCompanyId = (rule,value,callback)=>{
                if (!value.value){
                    callback(new Error('请选择实训企业'));
                }else {
                    return callback()
                }
            };
            return {
                queryInfo: {
                    companyUserId: {},
                    directionId: {},
                    name: '',
                    from: 1,
                    limit: 5,
                },
                options: [],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'企业',prop:'companyName'},
                        {name:'实训方向',prop:'directionName'},
                        {name:'班级名称',prop:'name'},
                        {name:'班主任',prop:'teacher'},
                        {name:'联系方式',prop:'phone'},
                        {name:'上课地址',prop:'address'},
                        {name:'学生人数',prop:'classPersonNumber'}
                    ]
                },
                count: 0,
                addTrainingClassVisible: false,
                addTrainingClassForm: {
                    name: '',
                    companyUserId: {},
                    directionId: {},
                    teacher: '',
                    phone: '',
                    address: '',
                },
                editTrainingClassVisible: false,
                editTrainingClassForm: {
                    userId: '',
                    name: '',
                    companyUserId: {},
                    directionId: {},
                    teacher: '',
                    phone: '',
                    address: '',
                },
                addTrainingClassFormRules: {
                    name: [
                        {required: true, message: '请输入班级名称', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入讲师联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                    companyUserId: [
                        {required: true, message: '请选择实训企业', trigger: 'blur'},
                        {validator: checkCompanyId, trigger: 'blur'},
                    ],
                    directionId:  [
                        {required: true, message: '请选择实训方向', trigger: 'blur'},
                        {validator: checkTrainingDirectionId, trigger: 'blur'},
                    ],
                    teacher: [
                        {required: true, message: '请输入班级讲师姓名', trigger: 'blur'},
                    ],
                    address:[
                        {required: true, message: '请输入上课地点', trigger: 'blur'},
                    ],
                },
                editTrainingClassFormRules: {
                    name: [
                        {required: true, message: '请输入学生姓名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入讲师联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                    companyUserId: [
                        {required: true, message: '请选择实训企业', trigger: 'blur'},
                        {validator: checkCompanyId, trigger: 'blur'},
                    ],
                    directionId:  [
                        {required: true, message: '请选择实训方向', trigger: 'blur'},
                        {validator: checkTrainingDirectionId, trigger: 'blur'},
                    ],
                    teacher: [
                        {required: true, message: '请输入班级讲师姓名', trigger: 'blur'},
                    ],
                    address:[
                        {required: true, message: '请输入上课地点', trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            this.getTrainingClassData();
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getTrainingClassData();
            },
            getTrainingClassData() {
                this.$axios.get(this.$api.GetTrainingClass, {companyUserId:this.queryInfo.companyUserId.value, directionId: this.queryInfo.directionId.value, name: this.queryInfo.name, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取实训班级信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            //    监听对话框关闭事件
            addDialogClosed() {
                this.$refs.addTrainingClassFormRef.resetFields();
                this.addTrainingClassForm.directionId = {};
                this.addTrainingClassForm.companyUserId = {};
            },
            editDialogClosed() {
                this.$refs.editTrainingClassFormRef.resetFields();
                this.editTrainingClassForm.directionId = {};
                this.editTrainingClassForm.companyUserId = {};
            },
            addTrainingClass() {
                this.$refs.addTrainingClassFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddTrainingClass, {  name: this.addTrainingClassForm.name, companyUserId: this.addTrainingClassForm.companyUserId.value, directionId: this.addTrainingClassForm.directionId.value, teacher: this.addTrainingClassForm.teacher, phone: this.addTrainingClassForm.phone, address: this.addTrainingClassForm.address,}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加实训班级成功");
                                this.addTrainingClassVisible = false;
                                this.getTrainingClassData();
                            } else {
                                this.$message.error("添加实训班级失败");
                            }
                        })
                    }
                })
            },
            showEditTrainingClass(classUser) {
                this.editTrainingClassForm.userId =  classUser.userId;
                this.editTrainingClassForm.name =  classUser.name;
                this.editTrainingClassForm.companyUserId.value = classUser.companyUserId;
                this.editTrainingClassForm.directionId.value = classUser.directionId;
                this.editTrainingClassForm.teacher = classUser.teacher;
                this.editTrainingClassForm.phone = classUser.phone;
                this.editTrainingClassForm.address = classUser.address;
                this.editTrainingClassVisible = true;
            },
            editTrainingClass() {
                this.$refs.editTrainingClassFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditTrainingClass, { userId: this.editTrainingClassForm.userId, name: this.editTrainingClassForm.name, companyUserId: this.editTrainingClassForm.companyUserId.value, directionId: this.editTrainingClassForm.directionId.value, teacher: this.editTrainingClassForm.teacher, phone: this.editTrainingClassForm.phone, address: this.editTrainingClassForm.address,}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改实训班级信息成功");
                                this.getTrainingClassData();
                                this.editTrainingClassVisible = false;
                            } else {
                                this.$message.error("修改实训班级信息失败");
                            }
                        })
                    }
                })
            },
            //删除实训班级
            delTrainingClass(id) {
                this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelTrainingClass, id).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getTrainingClassData();
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
        components: {
            ResetPassword,
            TrainingDirection,
            TrainingCompany,
            TableColumnComponent,
            Pages
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>