<template>
    <el-select v-model="trainingDirectionId.value" clearable placeholder="请选择实训方向" @change="getData">
        <el-option
                v-for="trainingDirectiones in trainingDirection"
                :key="trainingDirectiones.id"
                :label="trainingDirectiones.name"
                :value="trainingDirectiones.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "TrainingDirection",
        props: {
            trainingDirectionId: {
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
                trainingDirection:[],
            }
        },
        beforeCreate() {
            this.$axios.get(this.$api.GetTrainingDirection,{from:1,limit:30}).then(trainingDirection => {
                if (trainingDirection.data.code !== 200) {
                    this.$message.error("获取实训方向失败")
                }
                this.trainingDirection = trainingDirection.data.result.records;
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