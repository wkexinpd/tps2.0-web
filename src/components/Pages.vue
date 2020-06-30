<template>
    <div class="block" style="margin-top: 20px">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.from"
                :page-sizes="[5,10,15,20]"
                :page-size="queryInfo.limit"
                layout="total,sizes,prev, pager, next, jumper"
                :total="count"

                 >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pages",
        data(){
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
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get(this.$api.LectureFinishedData, {studentName: this.queryInfo.studentName, majorClassId: this.queryInfo.collegeClassId.value, from: this.queryInfo.from, limit: this.queryInfo.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取完成讲座选择信息失败");
                    }
                    this.options = res.data.result.records;
                    this.count = res.data.result.total;
                })
            },
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.getData();
                this.$emit("msg",this.queryInfo.limit + this.options + this.count)

            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.getData();
                this.$emit("msg",this.queryInfo.from+ this.options + this.count)

            },
        },
    }
</script>

<style scoped>

</style>