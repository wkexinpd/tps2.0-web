<template>
    <el-row>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item><i style="color: #393fb6;">密码修改</i></el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>
        <el-col :span="6">
            <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="passwordChange">
                <el-form-item label="原始密码" prop="oldPass">
                    <el-input type="password" v-model="ruleForm.oldPass" placeholder="请输入8~12位旧密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" placeholder="请输入8~12位新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" placeholder="请再次确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "PasswordChange",
        data() {
            var validatePassword =(rule, value, callback) => {
                let reg = /^[a-zA-Z]{1}\w*$/;
                if (value === '' || value.length < 8 || value.length > 12) {
                    callback(new Error('请输入8-12位旧密码'));
                } else if (!reg.test(value)) {
                    callback(new Error("旧密码必须以字母开头，且以字母、数字、下划线_随意组合"))
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                let reg = /^[a-zA-Z]{1}\w*$/;
                if (value === '' || value.length < 8 || value.length > 12) {
                    callback(new Error('请输入8-12位新密码'));
                } else if (!reg.test(value)) {
                    callback(new Error("必须以字母开头，且以字母、数字、下划线_随意组合"))
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    oldPass: '',
                    pass: '',
                    checkPass: '',
                    username:sessionStorage.getItem("login"),
                },
                rules: {
                    oldpass: [
                        {required:true,message:"请输入原始密码"},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    pass: [
                        {required:true,message:"请输入新密码"},
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    checkPass: [
                        {required:true,message:"请再次确认密码"},
                        {validator: validatePassword, trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            submitForm() {
                this.$refs.passwordChange.validate((valid) => {
                    if (valid) {
                        this.$axios.post(this.$api.PasswordChange,{newPassword:this.ruleForm.pass,password:this.ruleForm.oldPass,twoPassword:this.ruleForm.checkPass}).then(res=>{
                            if(res.data.code===200){
                                this.$message.success("修改成功");
                                this.$refs.passwordChange.resetFields();
                            }else {
                                this.$message.error("修改失败");
                                this.$refs.passwordChange.resetFields();
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm() {
                this.$refs.passwordChange.resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>

</style>