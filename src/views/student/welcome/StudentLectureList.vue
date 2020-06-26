<template>
    <div id="student-lecture">
        <div style="font-size:18px;font-weight:600;margin-bottom:20px;">
            <el-badge :value="selectedCount" class="item" style="margin-top: 20px">
                <el-button size="small" @click="showSelectedLecture">已选讲座</el-button>
            </el-badge>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col
                        :xs="24"
                        :sm="8"
                        :md="6"
                        v-for="lecture in lectureData"
                        :key="lecture.id"
                >
                    <el-card
                            shadow="hover"
                            :body-style="{ padding: '10px', marginTop: '10px' }"
                            style="margin-bottom:20px;"
                    >
                        <img
                                :src="lecture.img"
                                style="width:100%;height:160px;background:#efefef;"
                                @click="lectureOutline(lecture)"
                        />
                        <div style="font-size: 12px;">
                            <p style="font-size: 14px;" class="overflow-text">
                                <i class="el-icon-tickets"></i>
                                {{ lecture.title }}
                            </p>
                            <p class="overflow-text">
                                <i class="el-icon-user"></i>
                                {{ lecture.speaker }} - {{ lecture.companyName }}
                            </p>
                            <p class="overflow-text">
                                <i class="el-icon-date"></i>
                                {{ lecture.startedAt}}-
                                {{ lecture.endedAt}}
                            </p>
                            <p class="overflow-text">
                                <i class="el-icon-location-information"></i>
                                {{ lecture.place ? lecture.place : '待定' }}
                            </p>
                            <div class="choose-lecture-btn">
                                <el-button
                                        v-if="lecture.status == 0"
                                        type="primary"
                                        size="mini"
                                        @click="chooseLecture(lecture.id)"
                                >
                                    选择
                                </el-button>
                                <el-button v-else type="danger" disabled size="mini">
                                    已选
                                </el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-pagination
                        background
                        :page-size="lectureRequestParam.limit"
                        @current-change="handleCurrentChange"
                        :current-page="lectureRequestParam.from"
                        layout="prev, pager, next"
                        :total="lectureData.total"
                        hide-on-single-page
                ></el-pagination>
            </el-row>
        </div>
        <!--讲座大纲弹窗-->
        <el-dialog :title="lectureOutlineList.lectureName" :visible.sync="lectureOutlineVisible" width="40%"
                   @close="lectureOutlineClosed">
            <div class="lecture-select" style="margin-bottom:20px;">
                <div>时间：{{lectureOutlineList.lectureTime}}</div>
                <div>地点：{{lectureOutlineList.lectureSite}}</div>
            </div>
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                    <div v-html="lectureOutlineList.lectureOutline"></div>
                </div>
            </div>
        </el-dialog>
        <!--已选讲座列表弹窗-->
        <el-dialog title="已选讲座" :visible.sync="lectureSelectedVisible">
            <el-table :data="selectedLectureList" border>
                <el-table-column
                        prop="lectureName"
                        label="讲座名称"
                        style="width: 15%"
                        >
                </el-table-column>
                <el-table-column
                        prop="lectureSpeaker"
                        label="主讲人"
                        style="width: 5%"
                       >
                </el-table-column>
                <el-table-column
                        prop="lectureAddress"
                        label="讲座地址"
                        style="width: 5%"
                        >
                </el-table-column>
                <el-table-column
                        label="讲座时间"
                        style="width: 15%"
                        min-width="180"
                        >
                    <template slot-scope="scope">
                        {{scope.row.startedAt}} - {{scope.row.endedAt.substring(11,19)}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="操作"
                        style="width: 5%"
                        >
                    <template slot-scope="scope">
                        <el-button type="text" size="small" style="color: red"
                                   @click="delSelectedLecture(scope.row.selectLectureId)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'StudentLectureList',
        components: {},
        data() {
            return {
                lectureRequestParam: {
                    from: 1,
                    limit: 8
                },
                selectedCount: 0,
                lectureData: {
                    total: 0,
                    records: []
                },
                lectureSelectedVisible: false,
                selectedLectureList:[],
                lectureOutlineVisible: false,
                lectureOutlineList: {
                    lectureTime: '',
                    lectureSite: '',
                    lectureOutline: '' ,
                    lectureName: '',
                },
            }
        },
        created() {
            this.getSelectedLectureList();
            this.getLectures();
        },
        computed: {},
        methods: {
            handleCurrentChange(toPage) {
                this.lectureRequestParam.from = toPage
                this.getLectures()
            },
            getLectures() {
                this.$axios.get(this.$api.TrainingLectureData,{from: this.lectureRequestParam.from, limit: this.lectureRequestParam.limit}).then(res => {
                        if (res.data.code !== 200) {
                            this.$message.error(res.data.msg)
                        }else{
                            this.lectureData = res.data.result.records;
                        }
                    })
            },
            chooseLecture(id) {
                this.$axios
                    .get(this.$api.LectureChoose,{ lectureId: id })
                    .then(res => {
                        if (res.data.code !== 200) {
                            this.$message.error(res.data.msg)
                        } else {
                            for (let i = 0; i < this.lectureData.records.length; i++) {
                                if (this.lectureData.records[i].id === id) {
                                    this.lectureData.records[i].status = 1
                                }
                            }
                            this.$message.success('选择讲座成功！');
                            this.getSelectedLectureList();
                        }
                    })
            },
            //显示已选讲座列表
            showSelectedLecture(){
                this.lectureSelectedVisible = true;
            },
            getSelectedLectureList() {
                this.$axios.get(this.$api.SelectedLecture, {from: 1,limit: 3}).then(res => {
                    if (res.data.code == 200) {
                        this.selectedCount = res.data.result.length;
                        this.selectedLectureList = res.data.result;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            },
            //查看讲座大纲
            lectureOutline(lecture) {
                this.lectureOutlineList.lectureTime = lecture.startedAt+' - '+lecture.endedAt.substring(11,19);
                this.lectureOutlineList.lectureSite = lecture.place;
                this.lectureOutlineList.lectureName = lecture.title;
                this.lectureOutlineList.lectureOutline = lecture.content;
                this.lectureOutlineVisible = true;
            },
            lectureOutlineClosed() {
                this.lectureOutlineVisible = false;
                this.lectureOutlineList.lectureId = '';
                this.lectureOutlineList.lectureName = '';
                this.lectureOutlineList.lectureOutline = '';
            },
            //删除已选讲座
            delSelectedLecture(lectureId){
                this.$confirm('确定删除已选讲座?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(this.$api.DelSelectedLecture, {lectureId:lectureId}).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getLectures();
                            this.getSelectedLectureList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
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
