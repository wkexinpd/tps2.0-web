<template>
    <div id="student-direction">
        <div style="font-size:18px;font-weight:600;margin-bottom:20px;">
            <i class="el-icon-s-grid" style="color:#000;"></i>
            实训方向选择
        </div>
        <el-card style="padding:20px 0px;" shadow="hover">
            <div>
                <el-steps
                        :active="directionStatus"
                        finish-status="success"
                        align-center
                >
                    <el-step title="未开始"></el-step>
                    <el-step title="方向选择"></el-step>
                    <el-step title="选择完成"></el-step>
                    <el-step title="已完成"></el-step>
                </el-steps>
            </div>
            <div v-if="directionStatus === 2" class="activeStepDiv">
                <CustomRadioGroup :radioGroupData="firstDirectionData" />
                <CustomRadioGroup :radioGroupData="secondDirectionData" />
                <CustomRadioGroup :radioGroupData="planData" />
                <div style="width:300px;margin:0 auto;margin-top:100px;">
                    <el-button
                            type="primary"
                            @click="chooseDirection"
                            style="width:100%;background:#3c5ac8;"
                    >
                        提交
                    </el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import CustomRadioGroup from '../../../components/CustomRadioGroup.vue'

    export default {
        name: 'StudentTrainingDirection',
        components: {
            CustomRadioGroup
        },
        data() {
            return {
                directionStatus: 1,
                firstDirectionData: {
                    value: 1,
                    description: '首选方向',
                    radioList: []
                },
                secondDirectionData: {
                    value: 0,
                    description: '备选方向',
                    radioList: [
                        {
                            id: 0,
                            name: '不选'
                        }
                    ]
                },
                planData: {
                    value: 1,
                    description: '未来计划',
                    radioList: []
                }
            }
        },
        created() {
            this.getDirectionStatus();
            this.getDirectionData();
        },
        methods: {
            chooseDirection() {
                this.$confirm('此次提交后将无法修改, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$axios
                            .get(this.$api.FirstSelectDirection, {
                                    firstDirectionId: this.firstDirectionData.value,
                                    secondDirectionId: this.secondDirectionData.value,
                                    planId: this.planData.value
                            })
                            .then(res => {
                                if (res.data.code !== 200) {
                                    this.$message.error(res.data.msg);
                                } else {
                                    this.directionStatus = 3;
                                    this.$message.success('选择方向成功！');
                                }
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            },
            getDirectionStatus() {
                this.$axios.get(this.$api.GetDirectionStatus).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error(res.data.msg)
                    } else {
                        this.directionStatus = res.data.result.status + 1
                    }
                })
            },
            getDirectionData() {
                this.$axios
                    .get(this.$api.DirectionFirstData,)
                    .then(res => {
                        if (res.data.code !== 200) {
                            this.$message.error(res.data.msg)
                        } else {
                            const result = res.data.result
                            this.firstDirectionData.radioList = result.optionalDirection
                            if (result.optionalDirection.length > 0) {
                                this.firstDirectionData.value = result.optionalDirection[0].id
                            }
                            this.secondDirectionData.radioList = this.secondDirectionData.radioList.concat(
                                result.notOptionalDirection
                            )
                            const plans = result.plans
                            if (plans.length > 0) {
                                this.planData.value = plans[0].planId
                            }
                            for (let i = 0; i < plans.length; i++) {
                                this.planData.radioList.push({
                                    id: plans[i].planId,
                                    name: plans[i].planName
                                })
                            }
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .el-step > .is-success {
        color: #3c5ac8;
        border-color: #3c5ac8;
    }
    /deep/ .el-step__main > .is-success {
        color: #3c5ac8;
    }
    .activeStepDiv {
        box-sizing: border-box;
        width: 80%;
        margin: 20px auto;
        padding: 15px;
    }
</style>