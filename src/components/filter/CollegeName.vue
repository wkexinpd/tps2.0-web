<template>
    <el-select v-model="queryInfo.curriculumId" clearable placeholder="请选择课程名称"
               @change="getData" prop="queryInfo.curriculumId">
        <el-option
                v-for="curriculum in currs"
                :key="curriculum.id"
                :label="curriculum.name"
                :value="curriculum.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "CollegeName",
        props: {
            collegeClassId: {
                type: Object,
                default: function() {
                    return {
                        value: '',
                    }
                }
            },
            status
        },
        data(){
            return{
                queryInfo: {
                    curriculumId:'',
                    from: 1,
                    limit: 5,
                },
                currs:[],
            }
        },
        beforeCreate() {
            this.$axios.get(this.$api.GetVideoData,this.queryInfo).then(res=>{
                if (res.data.code===200){
                    this.options = res.data.result.records;
                    this.tableColumnDate.options = res.data.result.records;
                    this.count = res.data.result.total;
                }else{
                    this.$message.error(res.data.msg)
                }
            })
        },
        methods: {
            getData(){
                if(this.status!==1){
                    this.$emit('update')
                }
            }
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>