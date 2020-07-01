<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>讲座管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">按讲座汇总</i></el-breadcrumb-item>
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
                            <TrainingCompany @update="getLectureData"  :trainingCompanyId.sync="queryInfo.companyId" />
                        </div>
                        <div class="flex-right">
                            <el-input style="width: 180px;margin-right: 10px" placeholder="请输入讲座名称"
                                      v-model="queryInfo.lectureName" clearable
                                      @clear="getLectureData"></el-input>
                            <el-button type="primary" @click="getLectureData">查找讲座</el-button>
                        </div>
                    </div>

                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>

                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                label="讲座时间"
                                style="width: 15%"
                                min-width="180">
                            <template slot-scope="scope" v-if="scope.row.endedAt!=null">
                                {{scope.row.startedAt}} - {{scope.row.endedAt.substring(11,19)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="操作"
                                style="width: 5%"
                                min-width="90">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"
                                           @click="showEditLecture(scope.row.lectureId)">
                                    导出选择学生列表
                                </el-button>
                            </template>
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
    import TrainingCompany from "@/components/filter/TrainingCompany";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    export default {
        name: "LectureSelected",
        data() {
            return {
                options: [],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'讲座地址',prop:'lectureAddress'},
                        {name:'企业',prop:'companyName'},
                        {name:'讲座名称',prop:'lectureName'},
                        {name:'选择人数',prop:'selectedNum'}
                    ]
                },
                id: '',
                queryInfo: {
                    companyId: {},
                    lectureName: '',
                    from: 1,
                    limit: 5,
                },
                count: 0,
            }
        },
        created() {
            this.getLectureData();
        },
        components:{
            TrainingCompany,
            TableColumnComponent
        },
        methods: {
            getLectureData() {
                this.$axios.get(this.$api.LectureSelectedData, {companyId: this.queryInfo.companyId.value, lectureName: this.queryInfo.lectureName, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取讲座信息失败");
                    }
                    this.options = res.data.result.records;
                    this.tableColumnDate.options = res.data.result.records;
                    this.count = res.data.result.total;
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.getLectureData();
            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.getLectureData();
            },
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>