<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">考勤数据统计</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入学生姓名"
                                      v-model="queryInfo.studentName" clearable
                                      @clear="getAttendanceData"></el-input>
                            <el-button type="primary" @click="getAttendanceData">查找</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <el-table-column
                                prop="studentName"
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
                                prop="telephone"
                                label="联系方式"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="normal"
                                label="正常"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                label="迟到早退"
                                min-width="90"
                               prop="late">
                        </el-table-column>
                        <el-table-column
                                prop="truancy"
                                label="旷课"
                                min-width="90">
                        </el-table-column>
                        <el-table-column
                                prop="leave"
                                label="请假"
                                min-width="90">
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
                                :page-sizes="[5,10,15,20,50,100]"
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
        name: "AttendanceStatistics",
        data() {
            return {
                options: [
                ],
                queryInfo: {
                    studentName: '',
                    from: 1,
                    limit: 5,
                },
                count:0,
            }
        },
        created() {
            this.getAttendanceData();
        },
        methods: {
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize
                this.getLectureData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage
                this.getLectureData();
            },
            getAttendanceData(){
                  // this.$axios.get(this.$api.ClassGetAttendance,this.queryInfo).then(res => {
                  //     if (res.data.code==200){
                  //         this.options = res.data.result.records;
                  //         this.count = res.data.result.total;
                  //     }else{
                  //         this.$message.error(res.data.msg);
                  //
                  //     }
                  // })
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>


