<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>实训管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">学生成绩管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
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
                    <TableComponent :tableDate="tableDate"></TableComponent>
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
    import CollegeDirection from "@/components/filter/CollegeDirection";
    import CollegeClass from "@/components/filter/CollegeClass";
    import TrainingDirection from "@/components/filter/TrainingDirection";
    import TrainingClass from "@/components/filter/TrainingClass";
    import TableComponent from "../../../components/Table/TableComponent";
    export default {
        name: "AchievementManage",
        data() {
            return {
                options: [],
                tableDate:{
                    options:[],
                    tableNames:[
                        {name:'成绩',prop:'achievement'},
                        {name:'学号',prop:'studentNumber'},
                        {name:'姓名',prop:'name'},
                        {name:'学院方向',prop:'majorName'},
                        {name:'班级',prop:'majorClassName'},
                        {name:'实训方向',prop:'directionName'},
                        {name:'实训班级',prop:'directionClassName'}
                    ],
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
            }
        },
        created() {
            this.getStudentData();
        },
        components: {
            TrainingDirection,
            TrainingClass,
            CollegeDirection,
            CollegeClass,
            TableComponent
        },
        methods: {
            getStudentData() {
                this.$axios.get(this.$api.StudentData, {directionClassId:this.queryInfo.trainingClassId.value,directionId:this.queryInfo.trainingDirectionId.value,from:this.queryInfo.from,limit:this.queryInfo.limit,majorClassId:this.queryInfo.collegeClassId.value,majorId:this.queryInfo.collegeDirectionId.value}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取学生信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.getStudentData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.getStudentData();
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>