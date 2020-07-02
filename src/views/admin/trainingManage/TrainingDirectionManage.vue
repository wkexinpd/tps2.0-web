<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>实训管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">选择未完成</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
                <el-row>
                    <el-button type="primary">导出未完成学生名单</el-button>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <CollegeClass @update="getTrainingDirectionNoFinishedData"  :collegeClassId.sync="queryInfo.collegeClassId"  />
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入学生姓名"
                                      v-model="queryInfo.studentName" clearable @clear="getTrainingDirectionNoFinishedData"></el-input>
                            <el-button type="primary" @click="getTrainingDirectionNoFinishedData">查找学生</el-button>
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
    import TableComponent from "../../../components/Table/TableComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "TrainingDirectionManage",
        data() {
            return {
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
            TableComponent,
            Pages
        },
        created() {
            this.getTrainingDirectionNoFinishedData();
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getTrainingDirectionNoFinishedData();
            },
            getTrainingDirectionNoFinishedData() {
                this.$axios.get(this.$api.TrainingDirectionNoFinished, {studentName: this.queryInfo.studentName, majorClassId: this.queryInfo.collegeClassId.value, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取完成方向选择信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.tableDate.options = res.data.result.records;
                        this.count = res.data.result.total;
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