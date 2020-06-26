<template>
    <el-button type="text" size="small" @click="resetPassword()">
        密码重置
    </el-button>
</template>

<script>
    export default {
        name: "ResetPassword",
        props: ['userId'],
        methods:{
            //密码重置
            resetPassword() {
                this.$axios.get(this.$api.ResetPassword, {userId: this.userId}).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success("密码重置成功");
                    } else {
                        this.$message.error("密码重置失败");
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>