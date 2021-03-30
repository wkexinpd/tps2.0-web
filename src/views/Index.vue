<template>
    <el-container style="height: 100%">
        <el-header height="70px" style="background: #393fb6;font-size: 24px;line-height: 70px;color: #FFFFFF" class="index-head">
            <div>中北大学软件学院实训管理系统</div>
            <div style="height: 40px" class="head-right">
                <div class="demo-basic--circle" style="height: 40px;margin-right: 30px">
                    <div class="block"><el-avatar :size="40" :lazyload="circleUrl"></el-avatar></div>
                </div>
                <div>
                    <el-dropdown trigger="hover" style="color: #FFFFFF;font-size: 16px">
                        <span class="el-dropdown-link">
                          <strong>{{username}}</strong><i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="b" @click.native="logout()">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

        </el-header>
        <el-container style="height: 100%;overflow: auto">
            <el-aside width="15%">
                <el-menu class="el-menu-vertical-demo" active-text-color="#393fb6" style="border-right:none">
                    <el-submenu  v-for="item in routeData" :index="item.name" :key="item.name">
                        <template slot="title">
                            <i :class="item.meta.icon"></i><span style="font-size: 16px;" >{{item.meta.title}}</span>
                        </template>
                        <el-menu-item v-for="navItem in item.children" :index="navItem.name" :key="navItem.name" style="padding: 0">
                            <router-link :to="{name:navItem.name}" tag="li" style="font-size: 16px;padding-left: 60px">{{navItem.meta.title}}</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main height="200">
                <router-view>

                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Index",
        data: () => ({
            routeData: [],
            circleUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582910660136&di=744985f1cd25be4c0fbf22cd423284c0&imgtype=0&src=http%3A%2F%2Fec4.images-amazon.com%2Fimages%2FI%2F415Eie4Sd3L._SY300_.jpg",
            username:sessionStorage.getItem('login'),
        }),
        methods: {
            logout(){
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('login');
                sessionStorage.removeItem('route');
                location.reload();
            },
        },
        mounted() {
            this.routeData = this.$store.state.routeData[0].children;
        }
    }
</script>

<style lang="less" scoped>
   .index-head{
       display: flex;
       flex-direction: row;
       flex-wrap: nowrap;
       justify-content: space-between;
       align-items: center;
       align-content: center;
   }
    .head-right{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: center;
        align-content: center;
    }
</style>
