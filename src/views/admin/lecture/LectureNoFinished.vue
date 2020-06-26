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
                    <download-excel :data="json_data" :fields="json_fields" name="讲座选择未完成学生名单.xls" >
                        <el-button type="primary" @click="exportAll">导出未完成学生名单</el-button>
                    </download-excel>
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
                    <el-table
                            :data="options"
                            border>
                        <el-table-column
                                prop="majorClassName"
                                label="班级"
                                style="width: 20%"
                                min-width="180">
                        </el-table-column>
                        <el-table-column
                                prop="studentNumber"
                                label="学号"
                                style="width: 20%"
                                min-width="180">
                        </el-table-column>
                        <el-table-column
                                prop="studentName"
                                label="姓名"
                                style="width: 20%"
                                min-width="180">
                        </el-table-column>
                        <el-table-column
                                prop="chooseLectures"
                                label="已选讲座"
                                style="width: 20%"
                                min-width="180">
                        </el-table-column>
                        <el-table-column
                                prop="chooseNum"
                                label="已选数量"
                                style="width: 20%"
                                min-width="180">
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
    import CollegeClass from "@/components/filter/CollegeClass";
    export default {
        name: "LectureNoFinished",
        data() {
            return {
                json_fields: {
                    "班级": "majorClassName",
                    "学号": "studentNumber",
                    "姓名": "studentName",
                },
                json_data: [],
                json_meta: [
                    [
                        {
                            " key ": " charset ",
                            " value ": " utf- 8 "
                        }
                    ]
                ],
                options: [],
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
          CollegeClass
        },
        methods: {
            exportAll(){
                this.$axios.get(this.$api.LectureNoFinishedData, { studentName: this.queryInfo.studentName, majorClassId: this.queryInfo.collegeClassId.value, from: this.queryInfo.from, limit: 700,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取未完成讲座选择信息失败");
                    }else{
                        this.json_data = res.data.result.records;
                    }
                })
            },
            getLectureNoFinishedData() {
                this.$axios.get(this.$api.LectureNoFinishedData, { studentName: this.queryInfo.studentName, majorClassId: this.queryInfo.collegeClassId.value, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取未完成讲座选择信息失败");
                    }else{
                        this.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize
                this.getLectureNoFinishedData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage
                this.getLectureNoFinishedData();
            },
            download () {
                let url = window.URL.createObjectURL('');
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url
                link.setAttribute('download', '未完成讲座选择学生名单.xlsx');
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