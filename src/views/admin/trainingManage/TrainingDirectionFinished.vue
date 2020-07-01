<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>实训管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">选择已完成</i></el-breadcrumb-item>
                    </el-breadcrumb>
                    <el-col :span="14" style="margin-left: 1180px;">
                        <Download :downloadDate="downloadDate"></Download>
                    </el-col>
                    <el-col :span="5" style="margin-left:-600px">
                        <download-excel name="首选方向信息名单.xls" >
                            <el-button type="primary">首选优先</el-button>
                        </download-excel>
                    </el-col>
                    <el-col :span="5" style="margin-left:-490px">
                        <download-excel  name="备选方向信息名单.xls" >
                            <el-button type="primary">备选优先</el-button>
                        </download-excel>
                    </el-col>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <CollegeClass @update="getTrainingDirectionFinishedData"  :collegeClassId.sync="queryInfo.collegeClassId"  />
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入学生姓名"
                                      v-model="queryInfo.studentName" clearable @clear="getTrainingDirectionFinishedData"></el-input>
                            <el-button type="primary" @click="getTrainingDirectionFinishedData">查找学生</el-button>
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
    import TableComponent from "../../../components/TableComponent";
    export default {
        name: "TrainingDirectionFinished",
        data() {
            return {
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
                        "首选方向": "firstDirectionName",
                        "备选方向": "secondDirectionName"
                    }
                },
                options: [],
                tableDate:{
                    options:[],
                    tableNames:[
                        {name:'备选方向',prop:'secondDirectionName'},
                        {name:'学号',prop:'studentNumber'},
                        {name:'姓名',prop:'studentName'},
                        {name:'班级',prop:'majorClassName'},
                        {name:'首选方向',prop:'firstDirectionName'},
                    ],
                },
                queryInfo: {
                    studentName: '',
                    collegeClassId: {},
                    from: 1,
                    limit: 5,
                },
                count: 0,
            }
        },
        components:{
            CollegeClass,
            Download,
            TableComponent
        },
        created() {
            this.getTrainingDirectionFinishedData();
        },
        methods: {
            getTrainingDirectionFinishedData() {
                this.downloadDate.file.limit = this.queryInfo.limit;
                this.downloadDate.file.from = this.queryInfo.from;
                this.downloadDate.file.majorClassId = this.queryInfo.collegeClassId.value;
                this.downloadDate.file.studentName = this.queryInfo.studentName;
                this.downloadDate.file.url = this.$api.TrainingDirectionFinished;
                this.$axios.get(this.$api.TrainingDirectionFinished, {studentName: this.queryInfo.studentName, majorClassId: this.queryInfo.collegeClassId.value, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取完成方向选择信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }

                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize
                this.getTrainingDirectionFinishedData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage
                this.getTrainingDirectionFinishedData();
            },
            download () {
                let url = window.URL.createObjectURL('');
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url
                link.setAttribute('download', '已完成讲座选择学生名单.xlsx');
                document.body.appendChild(link);
                link.click()
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>