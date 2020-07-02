<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">企业用户管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <el-button type="primary" @click="addCompanyVisible = true">新增企业用户</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-right">
                        <el-input style="width: 180px;margin-right: 10px" placeholder="请输入企业名称"
                                  v-model="queryInfo.query" clearable @clear="getCompanyData"></el-input>
                        <el-button type="primary" @click="getCompanyData">查找企业</el-button>
                    </div>
                </el-col>
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
                                <el-button type="text" size="small" @click="showEditCompany(scope.row)">
                                    修改
                                </el-button>
                                <el-button type="text" size="small" style="color: red" @click="delCompany(scope.row.userId)">
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
        <!--新增企业用户弹框-->
        <el-dialog title="新增企业用户" :visible.sync="addCompanyVisible" width="40%" @close="addDialogClosed">
            <el-form :model="addCompanyForm" :rules="addCompanyFormRules" ref="addCompanyFormRef" label-width="120px">
                <el-form-item label="企业名称" prop="companyName">
                    <el-input v-model="addCompanyForm.companyName" ></el-input>
                </el-form-item>
                <el-form-item label="所授课程方向" prop="companyDirection">
                    <el-input v-model="addCompanyForm.companyDirection"></el-input>
                </el-form-item>
                <el-form-item label="企业负责人" prop="companyLeader">
                    <el-input v-model="addCompanyForm.companyLeader" ></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="companyTelephone">
                    <el-input v-model="addCompanyForm.companyTelephone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addCompanyVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCompany">确 定</el-button>
            </div>
        </el-dialog>
        <!--  修改企业用户信息-->
        <el-dialog title="修改企业用户" :visible.sync="editCompanyVisible" width="40%">
            <el-form :model="editCompanyForm" :rules="editCompanyFormRules" ref="editCompanyFormRef"
                     label-width="120px">
                <el-form-item label="企业名称" prop="companyName">
                    <el-input v-model="editCompanyForm.companyName" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="所授课程方向" prop="companyDirection">
                    <el-input v-model="editCompanyForm.companyDirection" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="企业负责人" prop="companyLeader">
                    <el-input v-model="editCompanyForm.companyLeader" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="companyTelephone">
                    <el-input v-model="editCompanyForm.companyTelephone" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editCompanyVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCompany">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import ResetPassword from "../../../components/ResetPassword";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "CompanyUserManage",
        components: {ResetPassword,TableColumnComponent,Pages},
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
                        {name:'企业名称',prop:'companyName'},
                        {name:'所授课程方向',prop:'directions'},
                        {name:'企业负责人',prop:'leader'},
                        {name:'联系方式',prop:'phone'},
                    ]
                },
                id: '',
                queryInfo: {
                    query: '',
                    from: 1,
                    limit: 5,
                },
                count: '',
                addCompanyVisible: false,
                addCompanyForm: {
                    companyName: '',
                    companyLeader: '',
                    companyTelephone: '',
                    companyDirection: '',
                },
                addCompanyFormRules: {
                    companyName: [
                        {required: true, message: '请输入企业名称', trigger: 'blur'},
                    ],
                    companyLeader: [
                        {required: true, message: '请输入企业负责人', trigger: 'blur'},
                    ],
                    companyTelephone: [
                        {required: true, message: '请输入企业联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                    companyDirection: [
                        {required: true, message: '请输入所授课程方向', trigger: 'blur'},
                    ],
                },
                editCompanyForm: {
                    companyId: '',
                    companyName: '',
                    companyLeader: '',
                    companyTelephone: '',
                    companyDirection: '',
                },
                editCompanyFormRules: {
                    companyDirection: [
                        {required: true, message: '请输入所授课程方向', trigger: 'blur'},
                    ],
                    companyLeader: [
                        {required: true, message: '请输入企业负责人', trigger: 'blur'},
                    ],
                    companyTelephone: [
                        {required: true, message: '请输入企业联系方式', trigger: 'blur'},
                        {validator: checkMobile, trigger: 'blur'},
                    ],
                },
                editCompanyVisible: false,
            }
        },
        created() {
            this.getCompanyData();
            this.count = this.options.length;
        },
        methods: {
            getCompanyData() {
                this.$axios.get(this.$api.CompanyData, this.queryInfo).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取企业信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getCompanyData();
            },
            //    监听对话框关闭事件
            addDialogClosed() {
                this.$refs.addCompanyFormRef.resetFields();
            },

            addCompany() {
                this.$refs.addCompanyFormRef.validate(validate => {
                    if (validate===false) {
                        return
                    } else {
                        this.$axios.post(this.$api.AddCompany, {companyName:this.addCompanyForm.companyName,directions:this.addCompanyForm.companyDirection,leader:this.addCompanyForm.companyLeader,phone:this.addCompanyForm.companyTelephone}).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("添加企业成功");
                                this.addCompanyVisible = false;
                                this.getCompanyData();
                            } else {
                                this.$message.error("添加企业失败");
                            }
                        })
                    }
                });
            },
            showEditCompany(row) {
                this.editCompanyForm.companyId = row.userId;
                this.editCompanyForm.companyDirection = row.directions;
                this.editCompanyForm.companyLeader = row.leader;
                this.editCompanyForm.companyTelephone = row.phone;
                this.editCompanyForm.companyName = row.companyName;
                this.editCompanyVisible = true
            },
            editCompany(){
                this.$refs.editCompanyFormRef.validate(valid => {
                    if (!valid) {
                        return
                    } else {
                        this.$axios.post(this.$api.EditCompany, this.editCompanyForm).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success("修改企业信息成功");
                                this.addCompanyVisible = false;
                                this.getCompanyData();
                            } else {
                                this.$message.error("修改企业信息失败");
                            }
                        })
                    }
                })
            },
            delCompany(id){
                this.$confirm('此操作将永久删除该企业信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelCompany,id).then(res=>{
                        if (res.data.code===200){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getCompanyData();
                        }else{
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