
<template>
    <div class="student-index" style="background: #f5f5f5!important">
        <el-container>
            <StudentHeader />
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer style="padding: 0 0 0 0">
                <div class="foot-company">
                    <div class="center-list">
                        <div style="color: #FFFFFF;font-size:24px;margin-bottom: 48px">合作伙伴</div>
                        <div class="icon-list">
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                            <div class="icon"><img :src="circleUrl"></div>
                        </div>
                    </div>
                </div>
                <div class="foot-message">
                    <div class="telmessage">
                        <div><a>关于我们</a></div>
                        <div><a>联系我们</a></div>
                        <div><a>网站地图</a></div>
                        <div><a>意见反馈</a></div>
                    </div>
                    <div class="beian">
                        <div>主办单位：中北大学软件学院</div>
                        <div>备案号：xxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    </div>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    import StudentHeader from '../../components/StudentHeader.vue'
    export default {
        name: "Student",
        data: () => ({
            routeData: [],
            circleUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582910660136&di=744985f1cd25be4c0fbf22cd423284c0&imgtype=0&src=http%3A%2F%2Fec4.images-amazon.com%2Fimages%2FI%2F415Eie4Sd3L._SY300_.jpg",
            username:sessionStorage.getItem('login'),
        }),
        components: {
            StudentHeader
        },
        methods: {
            logout(){
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('login');
                sessionStorage.removeItem('route');
                location.reload();
            },
        },
        mounted() {
            this.routeData = this.$store.state.routeData[0];
        }
    }
</script>

<style lang="less" scoped>
    .el-main {
        padding: 0 10px 10px 10px !important;
        border: 0 !important;
        width: 100%;
        max-width: 1200px;
        min-height: 800px;
        margin: 20px auto !important;
    }
    .student-index{

    }
    .foot-company{
        width: 100%;
        height: 440px;
        background:#00041f;
    }
    .foot-message{
        width: 100%;
        height: 170px;
    }
    .center-list{
        width: 40%;
        height: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;

    }
    .icon-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .icon{
        width: 76px;
        height: 76px;
        border-radius: 50%;
        background: #FFFFFF;
        margin: 12px;
    }
    .icon>img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .foot-message{
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    .telmessage{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 26px;
    }
    .telmessage>div{
        font-size: 18px;
        color: #999999;
    }
    .beian{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .beian>div{
        font-size: 14px;
        color: #999999;
    }
</style>