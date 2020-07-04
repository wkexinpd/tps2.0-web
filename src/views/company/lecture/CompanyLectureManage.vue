<template>
    <LectureManageComponent :show="show"></LectureManageComponent>
</template>

<script>
    import LectureManageComponent from "../../../components/other/LectureManageComponent";
    export default {
        name: "CompanyLectureManage",
        components:{
            LectureManageComponent
        },
        data(){
            return {
                show:true
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>