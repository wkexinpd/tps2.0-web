<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>讲座管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">选择未完成</i></el-breadcrumb-item>
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
                    <Pages @pageChange="pageChange" :total="count" :from="queryInfo.from"></Pages>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script>
    import CollegeClass from "@/components/filter/CollegeClass";
    import Download from "@/components/Download";
    import TableComponent from "../../../components/Table/TableComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "LectureNoFinished",
        data() {
            return {
                downloadDate:{
                    file:{
                        name:'导出未完成学生名单',
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
                options: [],
                tableDate:{
                    options:[],
                    tableNames:[
                        {name:'已选数量',prop:'chooseNum'},
                        {name:'姓名',prop:'studentName'},
                        {name:'班级',prop:'majorClassName'},
                        {name:'学号',prop:'studentNumber'},
                        {name:'已选讲座',prop:'chooseLectures'},
                    ],
                },
                queryInfo: {
                    studentName: '',
                    collegeClassId: {},
                    from: 1,
                    limit: 5,
                },
                collegeClass: [],
                count: 0,
            }
        },
        created() {
            this.getLectureNoFinishedData();
        },
        components:{
          CollegeClass,
            Download,
            TableComponent,
            Pages
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getLectureNoFinishedData();
            },
            getLectureNoFinishedData() {
                this.downloadDate.file.limit = this.queryInfo.limit;
                this.downloadDate.file.from = this.queryInfo.from;
                this.downloadDate.file.majorClassId = this.queryInfo.collegeClassId.value;
                this.downloadDate.file.studentName = this.queryInfo.studentName;
                this.downloadDate.file.url = this.$api.LectureNoFinishedData;
                this.$axios.get(this.$api.LectureNoFinishedData, {
                    studentName: this.queryInfo.studentName,
                    majorClassId: this.queryInfo.collegeClassId.value,
                    from: this.queryInfo.from,
                    limit: this.queryInfo.limit,
                }).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取未完成讲座选择信息失败");
                    } else {
                        this.options = res.data.result.records;
                        this.count = res.data.result.total;
                        this.tableDate.options = res.data.result.records;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>