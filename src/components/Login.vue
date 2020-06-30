<template>
    <div class="login_container">
        <div class="login_logo">
            <img src="../assets/images/002.png" alt="">
        </div>
        <div class="login_box">
            <!--            登录表单区域-->
            <el-form ref="loginFormRef" label-width="0px" :rules="rules" :status-icon="true" :model="loginForm">
                <el-form-item class="welcome">
                    <img src="../assets/images/003.png">
                </el-form-item>
                <!--                用户名-->
                <el-form-item prop="username">
                    <el-input prefix-icon="iconfont icon-UserSettings" v-model="loginForm.username"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!--                密码-->
                <el-form-item prop="password">
                    <el-input prefix-icon="iconfont icon-beforetype-" v-model="loginForm.password" show-password
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <!--                验证码-->
                <el-form-item prop="captcha" class="login_captcha">
                    <el-input v-model="loginForm.captcha" prefix-icon="iconfont icon-anquan" style="width: 75%"
                              placeholder="请输入验证码"></el-input>
                    <img :src="src" style="width: 116px;height: 40px;display: inline-block;margin-bottom: -15px"
                         @click="changeCaptcha" id="captcha">
                </el-form-item>
                <!--               登录按钮-->
                <el-form-item class="btns">
                    <el-button type="primary" class="btns_login" @click="login" :disabled="isDisable">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePassword = (rule, value, callback) => {
                let reg = /^[a-zA-Z]{1}\w*$/;
                if (value === '' || value.length < 8 || value.length > 12) {
                    callback(new Error('请输入8-12位密码'));
                } else if (!reg.test(value)) {
                    callback(new Error("密码必须以字母开头，且以字母、数字、下划线_随意组合"))
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    username: '',
                    password: '',
                    captcha: '',
                    codeId: '',
                },
                isDisable: false,
                src: '',
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'},
                    ],
                    captcha: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            // 登录前表单数据预验证
            login() {
                this.isDisable = true
                setTimeout(() => {
                    this.isDisable = false   //点击一次时隔两秒后才能再次点击
                }, 500)
                this.$refs.loginFormRef.validate(valid => {
                    if (valid) {
                        this.$axios.post(this.$api.LOGIN, this.loginForm).then(res => {
                            if (res.data.code === 200) {
                                let role = new Array()
                                role['ROLE_ADMIN'] = "admin";
                                role['ROLE_TEACHER'] = "teacher";
                                role['ROLE_COMPANY'] = "company";
                                role['ROLE_CLASS'] = "class";
                                window.sessionStorage.setItem('token', res.data.result.token);
                                window.sessionStorage.setItem("login", this.loginForm.username);
                                if (window.sessionStorage.getItem('token')===res.data.result.token){
                                    this.$store.commit("updateRouteData",role[res.data.result.role]);
                                    this.$message.success("登录成功");
                                }else{
                                    this.$message.error("登录失败");
                                    this.$refs.loginFormRef.resetFields();
                                    this.changeCaptcha();
                                }
                            }else{
                                 this.$message.error(res.data.msg);
                                 this.$refs.loginFormRef.resetFields();
                                 this.changeCaptcha();
                            }
                        })

                    } else {
                        return
                    }
                })
            },
            changeCaptcha() {
                this.$axios.get(this.$api.Captcha+"?t="+Date.now()).then(res => {
                    this.src = "data:image/jpg;base64,"+res.data.result.code;
                    this.loginForm.codeId =res.data.result.codeId;
                })
            }
        },
        mounted() {
            this.changeCaptcha();
        }
    }
</script>

<style lang="less" scoped>
    .login_container {
        background: #FFFFFF url("../assets/images/001.png") no-repeat;
        background-size: 100% 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .login_logo {
        margin-bottom: 24px;
    }

    .login_box {
        width: 550px;
        height: 454px;
        background-color: #ffffff;
        border-radius: 2%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

    }

    .welcome {
        display: flex;
        justify-content: center;
    }

    .btns {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .btns_login {
        width: 470px;
        background-color: #003366;
        font-size: 16px;
    }


</style>