<template>
    <div id="student-curriculum">
        <div style="font-size:18px;font-weight:600;margin-bottom:20px;">
            <i class="el-icon-s-grid" style="color:#000;"></i>
            实训课程
        </div>
        <div>
            <el-card
                    shadow="never"
                    :body-style="{ padding: '10px' }"
                    style="margin-bottom:20px;background: #f5f5f5"
            >
                <CustomRadioGroup :radioGroupData="directionData" />
            </el-card>
            <el-row :gutter="20">
                <el-col
                        :xs="24"
                        :sm="8"
                        :md="6"
                        v-for="curriculum in curriculumData.records"
                        :key="curriculum.id"
                >
                    <el-card
                            @click.native="clickCurriculumCard(curriculum.id)"
                            shadow="hover"
                            :body-style="{ padding: '10px', marginTop: '20px' }"
                            style="margin-bottom:20px;"
                    >
                        <img
                                :src="curriculum.coverUrl"
                                style="width:100%;height:160px;background:#efefef;"
                        />
                        <div style="font-size: 12px;">
                            <p style="font-size: 14px;" class="overflow-text">
                                <i class="el-icon-tickets"></i>
                                {{ curriculum.name }}
                            </p>
                            <p class="overflow-text">
                                <i class="el-icon-user"></i>
                                {{ curriculum.teacher }} - {{ curriculum.companyName }}
                            </p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-pagination
                        background
                        :page-size="curriculumRequestParam.limit"
                        @current-change="handleCurrentChange"
                        :current-page="curriculumRequestParam.from"
                        layout="prev, pager, next"
                        :total="curriculumData.total"
                        hide-on-single-page
                ></el-pagination>
            </el-row>
        </div>
    </div>
</template>

<script>
    import CustomRadioGroup from '../../../components/CustomRadioGroup.vue'

    export default {
        name: 'StudentVideoList',
        components: {
            CustomRadioGroup
        },
        data() {
            return {
                curriculumRequestParam: {
                    from: 1,
                    limit: 8
                },
                curriculumData: {
                    total: 0,
                    records: []
                },
                directionData: {
                    value: 0,
                    description: '方向 :',
                    radioList: [
                        {
                            id: 0,
                            name: '全部'
                        }
                    ]
                }
            }
        },
        created() {
            this.getCurriculums()
            this.getDirctions()
        },
        watch: {
            newDirectionValue() {
                this.getCurriculums()
            }
        },
        computed: {
            newDirectionValue() {
                return this.directionData.value
            }
        },
        methods: {
            clickCurriculumCard(curriculumId) {
                this.$router.push({
                    name: 'showVideo',
                    params: { curriculumId: curriculumId }
                })
            },
            handleCurrentChange(toPage) {
                this.curriculumRequestParam.from = toPage
                this.getCurriculums()
            },
            getCurriculums() {
                this.$axios
                    .get(this.$api.CurriculumData, {
                            from: this.curriculumRequestParam.from,
                            limit: this.curriculumRequestParam.limit,
                            directionId: this.directionData.value
                    })
                    .then(res => {
                        if (res.data.code !== 200) {
                            this.$message.error(res.data.msg)
                        } else {
                            this.curriculumData = res.data.result
                        }
                    })
            },
            getDirctions() {
                this.$axios
                    .get(this.$api.GetTrainingDirection, {
                            from: 1,
                            limit: 100
                    })
                    .then(res => {
                        if (res.data.code !== 200) {
                            this.$message.error(res.data.msg)
                        } else {
                            this.directionData.radioList = this.directionData.radioList.concat(
                                res.data.result.records
                            )
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .overflow-text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
