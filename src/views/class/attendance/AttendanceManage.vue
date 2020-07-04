<template>
    <div>
        <el-container >
            <ClassTableComponent style="width: 100%" :name="name"></ClassTableComponent>
        </el-container>
    </div>

</template>

<script>
    import ClassTableComponent from "../../../components/other/ClassTableComponent";
    export default {
        name: "CurrentAttendance",
        data(){
            return {
                name:"添加考勤"
            }
        },
        components:{
            ClassTableComponent
        }
    }
</script>

<style scoped>

</style>


