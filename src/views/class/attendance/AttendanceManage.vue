<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">添加考勤</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <el-table-column
                                prop="name"
                                label="姓名"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                label="学号"
                                min-width="90"
                                prop="studentNumber">
                        </el-table-column>
                        <el-table-column
                                prop="majorClassName"
                                label="学院班级"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="majorClassName"
                                label="实训班级"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="联系方式"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="操作"
                                style="width: 16%"
                                min-width="150">
                            <template slot-scope="scope">
                                <ResetPassword :user-id="scope.row.userId" />
                                <el-button type="text" size="small">
                                    正常
                                </el-button>
                                <el-button type="text" size="small" style="color: red"
                                           >
                                    迟到早退
                                </el-button>
                                <el-button type="text" size="small" style="color: #1410ff"
                                >
                                    旷课
                                </el-button>
                                <el-button type="text" size="small" style="color: #ff68cf"
                                >
                                    请假
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script>
    export default {
        name: "AttendanceManage",
        data() {
            return {
                options: [
                ],
                queryInfo: {
                    studentName: '',
                    from: 1,
                    limit: 200,
                },
                count:0,
            }
        },
        created() {
            this.getAttendanceData();
        },
        methods: {
            getAttendanceData(){
                this.$axios.get(this.$api.StudentData,this.queryInfo).then(res => {
                    if (res.data.code==200){
                        this.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }else{
                        this.$message.error(res.data.msg);

                    }
                })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>


