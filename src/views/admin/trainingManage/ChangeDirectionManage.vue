<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>实训管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">申请修改方向</i></el-breadcrumb-item>
                    </el-breadcrumb>
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
                        <el-table-column
                                prop="chooseDirectionInfo.studentNumber"
                                label="学号"
                                style="width: 15%"
                                min-width="60">
                        </el-table-column>
                        <el-table-column
                                prop="chooseDirectionInfo.studentName"
                                label="姓名"
                                style="width: 15%"
                                min-width="50">
                        </el-table-column>
                        <el-table-column
                                prop="nowDirectionName"
                                label="原方向"
                                style="width: 15%"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="modifyDirection"
                                label="申请方向"
                                style="width: 15%"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="reson"
                                label="申请理由"
                                style="width: 15%"
                                min-width="190">
                        </el-table-column>
                        <el-table-column
                                label="操作"
                                style=" width: 25%"
                                :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                            <template slot-scope="scope">
                                <ResetPassword :user-id="scope.row.userId" />
                                <el-button type="text" size="small" @click="Agree(scope.row.id)">
                                    同意
                                </el-button>
                                <el-button type="text" size="small" style="color: red" @click="Reject(scope.row.id)">
                                    驳回
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
    </div>
</template>
<script>
    export default {
        name: "TrainingDirectionFinished",
        data() {
            return {
                options: [],
                queryInfo: {
                    studentName: '',
                    collegeClassId: {},
                    from: 1,
                    limit: 5,
                },
                count: 0,
            }
        },
        created() {
            this.getChangeDirectionManageData();
        },
        methods: {
            getChangeDirectionManageData() {
                this.$axios.get(this.$api.ChangeDirectionManage, {from:1}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取学生申请修改信息失败");
                    }else{
                        this.options = res.data.result.records;
                    }

                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.getTrainingDirectionFinishedData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.getTrainingDirectionFinishedData();
            },
            Reject (id) {
                this.$confirm('是否确认驳回?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get(this.$api.RejectChangeDirection,{id:id}).then(res=>{
                        if (res.data.code===200){
                            this.$message({
                                type: 'success',
                                message: '驳回成功!'
                            });
                            this.getChangeDirectionManageData();
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
                        message: '已取消驳回'
                    });
                });
            },
            Agree (id) {
                this.$confirm('是否确认同意申请?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.get(this.$api.AgreeChangeDirection,{id:id}).then(res=>{
                        if (res.data.code===200){
                            this.$message({
                                type: 'success',
                                message: '同意申请成功!'
                            });
                            this.getChangeDirectionManageData();
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
                        message: '已取消同意'
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