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
                                      v-model="queryInfo.studentName" clearable @clear="getAttendanceData"></el-input>
                            <el-button type="primary" @click="getAttendanceData">查找</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <TableComponent :tableDate="tableDate"></TableComponent>
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
    import TableComponent from "../../../components/Table/TableComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "AttendanceStatistics",
        data() {
            return {
                options: [],
                tableDate:{
                    options:[],
                    tableNames:[
                        {name:'请假',prop:'lea'},
                        {name:'学号',prop:'studentNumber'},
                        {name:'姓名',prop:'name'},
                        {name:'学院方向',prop:'majorName'},
                        {name:'班级',prop:'majorClassName'},
                        {name:'实训方向',prop:'directionName'},
                        {name:'实训班级',prop:'directionClassName'},
                        {name:'正常',prop:'normal'},
                        {name:'旷课',prop:'truancy'},
                        {name:'迟到早退',prop:'late'},
                    ],
                },
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
        components:{
            TableComponent,
            Pages
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getAttendanceData();
            },
            getAttendanceData(){
               // console.log("进来了")
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>


