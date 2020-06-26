<template>
    <el-select v-model="trainingClassId.value" clearable placeholder="请选择实训班级" @change="getData">
        <el-option
                v-for="trainingClasses in trainingClass"
                :key="trainingClasses.userId"
                :label="trainingClasses.name"
                :value="trainingClasses.userId">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "TrainingClass",
        props: {
            trainingClassId: {
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
                trainingClass:[],
            }
        },
        beforeCreate() {
            this.$axios.get(this.$api.GetTrainingClass,{from:1,limit:30}).then(trainingClass => {
                if (trainingClass.data.code !== 200) {
                    this.$message.error("获取实训班级失败")
                }
                this.trainingClass = trainingClass.data.result.records;
            });
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