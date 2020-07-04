<template>
    <LectureManageComponent :show="show"></LectureManageComponent>
</template>

<script>
    import LectureManageComponent from "../../../components/other/LectureManageComponent";
    export default {
        name: "LectureManage",
        components:{
            LectureManageComponent
        },
        data(){
            return {
                show:false
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>