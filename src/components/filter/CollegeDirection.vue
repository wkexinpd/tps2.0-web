<template>
    <el-select v-model="collegeDirectionId.value" clearable placeholder="请选择学院方向" @change="getData()">
        <el-option
                v-for="collegeDirections in collegeDirection"
                :key="collegeDirections.id"
                :label="collegeDirections.name"
                :value="collegeDirections.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "CollegeDirection",
        props: {
            collegeDirectionId: {
                type: Object,
                default: function() {
                    return {
                        value: '',
                    }
                }
            }
        },
        data(){
            return{
                collegeDirection:[],
            }
        },
        beforeCreate() {
            this.$axios.get(this.$api.GetCollegeDirection,{from:1,limit:30}).then(collegeDirection => {
                if (collegeDirection.data.code !== 200) {
                    this.$message.error("获取实训方向失败")
                }
                this.collegeDirection = collegeDirection.data.result.records;
            });
        },
        methods: {
            getData(){
               this.$emit('update')
            }
        },
        mounted() {

        },
    }
</script>

<style scoped>

</style>
    }
