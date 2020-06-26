<template>
    <el-select v-model="trainingCompanyId.value" clearable placeholder="请选择实训企业"
               @change="getData">
        <el-option
                v-for="companys in trainingCompany"
                :key="companys.userId"
                :label="companys.companyName"
                :value="companys.userId">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "TrainingCompany",
        props: {
            trainingCompanyId: {
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
                trainingCompany:[],
            }
        },
        beforeCreate() {
            this.$axios.get(this.$api.GetCompanyList,{from:1,limit:50}).then(trainingCompany => {
                if (trainingCompany.data.code !== 200) {
                    this.$message.error("获取实训企业失败")
                }
                this.trainingCompany = trainingCompany.data.result.records;
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