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
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
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
                    <Pages @pageChange="pageChange" :total="count" :from="queryInfo.from"></Pages>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    import Pages from "../../../components/Table/Pages";
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
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'学号',prop:'chooseDirectionInfo.studentNumber'},
                        {name:'姓名',prop:'chooseDirectionInfo.studentName'},
                        {name:'原方向',prop:'nowDirectionName'},
                        {name:'申请方向',prop:'modifyDirection'},
                        {name:'申请理由',prop:'reson'}
                    ]
                },
                count: 0,
            }
        },
        created() {
            this.getChangeDirectionManageData();
        },
        components:{
            TableColumnComponent,
            Pages
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getChangeDirectionManageData();
            },
            getChangeDirectionManageData() {
                this.$axios.get(this.$api.ChangeDirectionManage, {from:1}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取学生申请修改信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                    }
                })
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