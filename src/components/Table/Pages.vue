<template>
    <div class="block" style="margin-top: 20px">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="from"
                :page-sizes="[5,10,15,20]"
                :page-size="queryInfo.limit"
                layout="total,sizes,prev, pager, next, jumper"
                :total="total"
                 >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pages",
        props:{
            from:{
                type:Number
            },
            total:{
                type:Number
            }
        },
        data(){
            return {
                queryInfo: {
                    studentName: '',
                    collegeClassId: {},
                    from: 1,
                    limit: 5,
                }
            }
        },
        methods: {
            handleSizeChange(newSize) {
                this.queryInfo.limit = newSize;
                this.$emit('pageChange', this.queryInfo);

            },
            handleCurrentChange(newPage) {
                this.queryInfo.from = newPage;
                this.$emit('pageChange', this.queryInfo);
            },
        },
    }
</script>

<style scoped>

</style>