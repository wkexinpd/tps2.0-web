<template>
    <div>
        <el-container>
            <div class="main-top">
                <el-row>
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item>实训管理</el-breadcrumb-item>
                        <el-breadcrumb-item><i style="color: #393fb6;">视频数据管理</i></el-breadcrumb-item>
                    </el-breadcrumb>
                </el-row>
            </div>
        </el-container>
        <el-card class="data-card">
            <el-row>
                <!--        搜索区域-->
                <el-col>
                    <div class="flex-between">
                        <div class="flex-left">
                            <el-select v-model="queryInfo.curriculumId" clearable placeholder="请选择课程名称"
                                       @change="getVideoData" prop="queryInfo.curriculumId">
                                <el-option
                                        v-for="curriculum in currs"
                                        :key="curriculum.id"
                                        :label="curriculum.name"
                                        :value="curriculum.id">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-col>
                <!--       table区域-->
                <el-col style="margin-top: 15px">
                    <el-table :data="options" border>
                        <TableColumnComponent :tableColumnDate="tableColumnDate"></TableColumnComponent>
                        <el-table-column
                                prop="name"
                                label="操作"
                                min-width="90">
                            <template slot-scope="scope">
                                <el-button type="text" size="small"
                                           @click="showVideo(scope.row.url)">
                                    查看视频
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <!--        分页区域-->
                <el-col>
                    <Pages @pageChange="pageChange" :total="count" :from="queryInfo.from"></Pages>
                </el-col>
            </el-row>
        </el-card>
        <!--视频展示-->
        <el-dialog :visible.sync="showVideoVisible" width="40%"
                   @close="showVideoClosed">
            <VideoPlayerComponent :videoUrl="videoUrl" :showVideoVisible="showVideoVisible"></VideoPlayerComponent>
        </el-dialog>
    </div>
</template>

<script>
    import VideoPlayerComponent from "../../../components/Video/VideoPlayerComponent";
    import TableColumnComponent from "../../../components/Table/TableColumnComponent";
    import Pages from "../../../components/Table/Pages";
    export default {
        name: "CompanyVideoManage",
        props: {
            limit: {
                type: Number,
                default: 1
            }
        },
        components:{VideoPlayerComponent,Pages,TableColumnComponent},
        data() {
            return {
                showVideoVisible:false,
                videoUrl:'',
                options: [],
                tableColumnDate:{
                    options:[],
                    tableColumnNames:[
                        {name:'课程名称',prop:'curriculumName'},
                        {name:'主讲人',prop:'curriculumTeacher'},
                        {name:'视频名称',prop:'name'},
                        {name:'视频描述',prop:'description'},
                    ]
                },
                queryInfo: {
                    curriculumId:'',
                    from: 1,
                    limit: 5,
                },
                currs:[],
                count:0,
                //记录班级课程数
            }
        },
        created() {
            this.getCurriculumList();
            this.getVideoData();
        },
        computed: {
            player () {
                return this.$refs.videoPlayer.player
            }
        },
        methods: {
            pageChange(item){
                this.queryInfo.from = item.from;
                this.queryInfo.limit = item.limit;
                this.getVideoData();
            },
            showVideo(url){
                this.videoUrl = url;
                this.showVideoVisible = true;
            },
            getCurriculumList(){
                this.$axios.get(this.$api.AdminGetCurriculumList,this.queryInfo).then(res=>{
                    if (res.data.code===200){
                        this.currs = res.data.result;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            getVideoData(){
                let apis;
                if(sessionStorage.getItem('route')==='company'){
                    apis=this.$api.CompanyGetVideo
                }else{
                    apis=this.$api.AdminGetVideo
                }
                this.$axios.get(apis,this.queryInfo).then(res=>{
                    if (res.data.code===200){
                        this.options = res.data.result.records;
                        this.tableColumnDate.options = res.data.result.records;
                        this.count = res.data.result.total;
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
            },
            addFormClosed() {
                this.$refs.addFormRef.resetFields();
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: '', // url地址
                    }
                ];
            },
            showVideoClosed(){
                this.showVideoVisible = false;
                this.playerOptions.sources=[
                    {
                        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: '', // url地址
                    }
                ];
            }

        },
        mounted() {

        },

    }
</script>

<style scoped>

</style>