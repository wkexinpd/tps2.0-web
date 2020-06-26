<template>
    <div class="student-video">
        <el-page-header
                @back="goBack"
                content="课程视频详情页"
                style="margin-bottom:20px;"
        ></el-page-header>
        <el-row :gutter="20">
            <el-col :md="18" :sm="16" :xs="24" style="margin-bottom:20px;">
                <CustomVideo class="custom-video" :videoUrl="videoUrl" />
            </el-col>
            <el-col :md="6" :sm="8" :xs="24">
                <VideoEpisode
                        :videoEpisodeData="videoData"
                        @switch="handleSwitchEpisode"
                        :currentVideoEpisodeId="currentVideoEpisodeId"
                />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import CustomVideo from '../../../components/CustomVideo.vue'
    import VideoEpisode from '../../../components/VideoEpisode.vue'
    export default {
        name: 'StudentVideo',
        data() {
            return {
                videoUrl: '',
                currentVideoEpisodeId: 0,
                curriculumId: this.$route.params.curriculumId,
                videoData: {
                    total: 0,
                    records: []
                }
            }
        },
        created() {
            this.getVideoData()
        },
        mounted() {},
        methods: {
            handleSwitchEpisode(currentVideoEpisodeId) {
                this.currentVideoEpisodeId = currentVideoEpisodeId
                let url = ''
                const videos = this.videoData.records
                for (let i = 0; i < videos.length; i++) {
                    if (videos[i].id === currentVideoEpisodeId) {
                        url = videos[i].url
                        break
                    }
                }
                this.videoUrl = url
            },
            getCurriculumData() {},
            getVideoData() {
                this.$axios
                    .get(this.$api.AdminGetVideo, {
                        from: 1,
                        limit: 100,
                        curriculumId: this.curriculumId
                    })
                    .then(res => {
                        this.videoData = res.data.result
                        if (this.videoData.total > 0) {
                            this.videoUrl = res.data.result.records[0].url
                            this.currentVideoEpisodeId = res.data.result.records[0].id
                        }
                    })
            },
            goBack() {
                this.$router.push('/curriculum')
            }
        },
        components: {
            CustomVideo,
            VideoEpisode
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .el-page-header__content {
        font-size: 16px;
    }

    /deep/ .el-page-header__left:hover {
        color: #3c5ac8;
    }
</style>
