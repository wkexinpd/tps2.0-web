<template>
    <el-select v-model="collegeClassId.value" clearable placeholder="请选择学院班级" @change="getData()">
        <el-option
                v-for="collegeClasses in collegeClass"
                :key="collegeClasses.id"
                :label="collegeClasses.name"
                :value="collegeClasses.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "CollegeClass",
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
                collegeClass:[],
            }
        },
        beforeCreate() {
            this.$axios.get(this.$api.GetCollegeClass,{from:1,limit:30}).then(collegeClass => {
                if (collegeClass.data.code !== 200) {
                    this.$message.error("获取学院班级失败")
                }
                this.collegeClass = collegeClass.data.result.records;
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