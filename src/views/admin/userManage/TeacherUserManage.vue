<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">教师用户管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="addTeacherVisible = true">新增教师用户</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table
                            :data="options"
                            border>
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                label="操作"
                                style=" width: 25%"
                                :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <template slot-scope="scope">
                                <ResetPassword :user-id="scope.row.userId" />
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
        <!--新增教师用户弹框-->
        <el-dialog title="新增教师用户" :visible.sync="addTeacherVisible" width="40%" @close="addDialogClosed">
            <el-form :model="addTeacherForm" :rules="addTeacherFormRules" ref="addTeacherFormRef" label-width="120px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addTeacherForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="addTeacherForm.qq"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phone">
                    <el-input v-model="addTeacherForm.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTeacherVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTeacher">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import ResetPassword from "../../../components/ResetPassword";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    export default {
        name: "TeacherUserManage",
        components: {ResetPassword,TableColumnComponent},
        data() {
            var checkMobile = (rule, value, callback) => {
                const regMobile = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
                if (regMobile.test(value)) {
                    return callback()
                } else {
                    callback(new Error('请输入合法的手机号'));
                }
            };
            return {
                options: [],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'用户名',prop:'name'},
                        {name:'联系方式',prop:'phone'},
                        {name:'QQ',prop:'qq'}
                    ]
                },
                id: '',
                queryInfo: {
                    query: '',
                    from: 1,
                    limit: 5,
                },
                count: '',
                addTeacherVisible: false,
                addTeacherForm: {
                    name: '',
                    phone: '',
                    qq: '',
                },
                addTeacherFormRules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                    qq: [
                        {required: true, message: '请输入qq', trigger: 'blur'},
                    ],
                },
            }
        },
        created() {
            this.getTeacherData();
            this.count = this.options.length;
        },
        methods: {
            getTeacherData() {
                this.$axios.get(this.$api.GetTeacher, this.queryInfo).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取教师信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.getTeacherData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.getTeacherData();
            },
            //    监听对话框关闭事件
            addDialogClosed() {
                this.$refs.addTeacherFormRef.resetFields();
            },

            addTeacher() {
                this.$refs.addTeacherFormRef.validate(validate => {
                    if (validate===false) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddTeacher, {name:this.addTeacherForm.name,qq:this.addTeacherForm.qq,phone:this.addTeacherForm.phone}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加教师成功");
                                this.addTeacherVisible = false;
                                this.getTeacherData();
                            } else {
                                this.$message.error("添加教师失败");
                            }
                        })
                    }
                });
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>