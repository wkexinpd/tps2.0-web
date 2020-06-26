<template>
    <div id="student-home">
        <el-carousel
                class="carousel-home"
                indicator-position="outside"
                :height="carouselHeight"
        >
            <el-carousel-item v-for="carouselItem in carousel" :key="carouselItem.id">
                <img class="carousel-home-img" :src="carouselItem.url"/>
            </el-carousel-item>
        </el-carousel>
        <el-tabs v-model="activeTabName">
            <el-tab-pane name="first">
                <span class="tab-name" slot="label">
                  <i class="el-icon-document"></i>
                  讲座
                </span>
                <el-row :gutter="20" style="margin-top:20px;">
                    <el-col :xs="24" :sm="8" :md="6" v-for="lecture in topLectures" :key="lecture.id" @click.native="lectureOutline(lecture)">
                        <el-card shadow="hover" :body-style="{ padding: '10px', marginTop: '10px' }" style="margin-bottom:20px;" >
                            <img
                                    :src="lecture.img"
                                    style="width:100%;height:160px;background:#efefef;"
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
                                    {{ lecture.startedAt.slice(5) }} -
                                    {{ lecture.endedAt.slice(5) }}
                                </p>
                                <p class="overflow-text">
                                    <i class="el-icon-location-information"></i>
                                    {{ lecture.place ? lecture.place : '待定' }}
                                </p>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="视频" name="second">
        <span class="tab-name" slot="label">
          <i class="el-icon-video-camera"></i>
          视频
        </span>
                视频
            </el-tab-pane>
        </el-tabs>
        <el-dialog :title="lectureOutlineList.lectureName" :visible.sync="lectureOutlineVisible"
                   @close="lectureOutlineClosed">
            <div class="lecture-select" style="margin-bottom:20px;">
                <div>时间：{{lectureOutlineList.lectureTime}}</div>
                <div>地点：{{lectureOutlineList.lectureSite?lectureOutlineList.lectureSite:'待定'}}</div>
            </div>
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                    <div v-html="lectureOutlineList.lectureOutline"></div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import carousel from '../../../assets/js/carousel.js'

    export default {
        name: 'StudentIndex',
        components: {},
        data() {
            return {
                carousel,
                carouselHeight: '460px',
                activeTabName: 'first',
                topLectures: [],
                lectureOutlineList: {
                    lectureTime: '',
                    lectureSite: '',
                    lectureOutline: '' ,
                    lectureName: '',
                },
                lectureOutlineVisible: false,
            }
        },
        created() {
            this.setSize();
            this.getTopLectures();
        },
        computed: {},
        methods: {
            setSize() {
                // 通过浏览器宽度(图片宽度)计算高度
                if (this.screenWidth > 900) {
                    this.carouselHeight = (600 / 1920) * this.screenWidth + 'px'
                } else {
                    this.carouselHeight = (800 / 1920) * this.screenWidth + 'px'
                }
            },
            getTopLectures() {
                this.$axios
                    .get(this.$api.TrainingLectureData, {from: 1, limit: 4})
                    .then(res => {
                        if (res.data.code !== 200) {
                            this.$message.error(res.data.msg);
                        } else {
                            this.topLectures = res.data.result.records;
                        }
                    })
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
        },
        mounted() {
            // 首次加载时,需要调用一次
            this.screenWidth = window.innerWidth
            this.setSize()
            // 窗口大小发生改变时,调用一次
            window.addEventListener(
                'resize',
                () => {
                    this.screenWidth = window.innerWidth
                    this.setSize()
                },
                false
            )
        }
    }
</script>

<style lang="less" scoped>
    .carousel-home-img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
    }

    .carousel-home {
        margin-bottom: 20px;
    }

    .tab-name {
        font-size: 15px;
        padding: 10px;
    }

    .overflow-text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>