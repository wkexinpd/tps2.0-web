<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>讲座管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">选择已完成</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <Download :downloadDate="downloadDate"></Download>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <CollegeClass @update="getLectureNoFinishedData"  :collegeClassId.sync="queryInfo.collegeClassId"  />
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入学生姓名"
                                      v-model="queryInfo.studentName" clearable @clear="getLectureNoFinishedData"></el-input>
                            <el-button type="primary" @click="getLectureNoFinishedData">查找学生</el-button>
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
    import CollegeClass from "@/components/filter/CollegeClass";
    import Download from "@/components/Download";
    import TableComponent from "../../../components/Table/TableComponent";
    export default {
        name: "LectureFinished",
        data() {
            return {
                options: [],
                queryInfo: {
                    studentName: '',
                    collegeClassId: {},
                    from: 1,
                    limit: 5,
                },
                collegeClass: [],
                count: 0,
                downloadDate:{
                    file:{
                        name:'导出完成学生名单',
                        url:'',
                        studentName:"",
                        majorClassId: "",
                        from: "",
                        limit: "",
                    },
                    json_fields: {
                        "班级": "majorClassName",
                        "学号": "studentNumber",
                        "姓名": "studentName",
                    }
                },
                tableDate:{
                    options:[],
                    tableNames:[
                        {name:'已选数量',prop:'chooseNum'},
                        {name:'学号',prop:'studentNumber'},
                        {name:'姓名',prop:'studentName'},
                        {name:'班级',prop:'majorClassName'},
                        {name:'已选讲座',prop:'chooseLectures'},
                     ],
                }
            }
        },
        components:{
            CollegeClass,
            Download,
            TableComponent
        },
        created() {
            this.getLectureNoFinishedData();
        },
        methods: {
            getLectureNoFinishedData() {
                this.downloadDate.file.limit = this.queryInfo.limit;
                this.downloadDate.file.from = this.queryInfo.from;
                this.downloadDate.file.majorClassId = this.queryInfo.collegeClassId.value;
                this.downloadDate.file.studentName = this.queryInfo.studentName;
                this.downloadDate.file.url = this.$api.LectureFinishedData;
                this.$axios.get(this.$api.LectureFinishedData, {studentName: this.queryInfo.studentName, majorClassId: this.queryInfo.collegeClassId.value, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取完成讲座选择信息失败");
                    }
                    this.options = res.data.result.records;
                    this.tableDate.options = res.data.result.records;
                    this.count = res.data.result.total;
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.getLectureNoFinishedData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.getLectureNoFinishedData();
            },
        },
    }
</script>

<style scoped>

</style>