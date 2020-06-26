<template>
  <el-header>
    <el-menu
      v-if="isMobile"
      mode="vertical"
      router
      :default-active="nav.defaultActive"
      background-color="#3c5ac8"
      text-color="#fff"
      active-text-color="#F6EA5F"
    >
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <i
              class="el-icon-s-unfold"
              style="font-size:20px;color:#ffffff;"
            ></i>
            <span style="font-size:16px;color:#ffffff;">导航</span>
          </template>
          <el-menu-item
            v-for="navItem in nav.itemList"
            :key="navItem.id"
            :index="navItem.id"
            :route="navItem.route"
            :disabled="navItem.disabled"
          >
            {{ navItem.name }}
          </el-menu-item>

          <el-dropdown v-if="username != ''" style="width: 100%;">
            <span class="el-dropdown-link">
              <el-menu-item index="998" route="#">
                <i
                  class="el-icon-user"
                  style="color:#ffffff;font-size:16px;"
                ></i>
                <span>{{ username }}</span>
              </el-menu-item>
            </span>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="logout">
                  logout
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-menu-item v-else route="/login" index="999" style="width: 100%;">
            Login
          </el-menu-item>
        </el-collapse-item>
      </el-collapse>
    </el-menu>
    <el-menu
      v-else
      mode="horizontal"
      router
      :default-active="nav.defaultActive"
      background-color="#3c5ac8"
      text-color="#fff"
      active-text-color="#F6EA5F"
    >
      <el-menu-item
        v-for="navItem in nav.itemList"
        :key="navItem.id"
        :index="navItem.id"
        :route="navItem.route"
        :disabled="navItem.disabled"
      >
        {{ navItem.name }}
      </el-menu-item>

      <el-dropdown v-if="username != ''" class="user_avatar">
        <span class="el-dropdown-link">
          <el-menu-item index="998" route="#">
            <i class="el-icon-user" style="color:#ffffff;font-size:16px;"></i>
            <span>{{ username }}</span>
          </el-menu-item>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="logout">
              修改密码
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="logout">
              退出
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-menu-item v-else class="user_avatar" route="/login" index="999">
        Login
      </el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: 'StudentHeader',
  props: {},
  data() {
    return {
      username: sessionStorage.getItem('login'),
      isMobile: false,
      nav: {
        defaultActive: '1',
        itemList: [
          {
            id: '1',
            name: '首页',
            route: '/student/welcome',
            disabled: false
          },
          {
            id: '2',
            name: '讲座',
            route: '/student/studentLectureList',
            disabled: false
          },
          {
            id: '3',
            name: '实训方向',
            route: '/student/studentTrainingDirection',
            disabled: false
          },
          {
            id: '4',
            name: '视频',
            route: '/student/studentVideoList',
            disabled: false
          }
        ]
      }
    }
  },
  methods: {
    setIsMobile() {
      // 通过浏览器宽度(图片宽度)计算高度
      if (this.screenWidth < 600) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
    },
    logout(){
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('login');
      sessionStorage.removeItem('route');
      location.reload();
    },
    setActiveNavItem(path) {
      for (let navItem of this.nav.itemList) {
        if (navItem.route === path) {
          this.nav.defaultActive = navItem.id
        }
      }
    }
  },
  watch: {
    $route(to) {
      this.setActiveNavItem(to.path)
    }
  },
  mounted() {
    this.setActiveNavItem(this.$route.path)
    // 首次加载时,需要调用一次
    this.screenWidth = window.innerWidth
    this.setIsMobile()
    // 窗口大小发生改变时,调用一次
    window.addEventListener(
      'resize',
      () => {
        this.screenWidth = window.innerWidth
        this.setIsMobile()
      },
      false
    )
  }
}
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  background-color: #3c5ac8;
  width: 100%;
}

.el-menu {
  max-width: 1180px;
  margin: 0 auto;
}

.user_avatar {
  float: right !important;
}

/deep/ .el-collapse {
  border: 0px;
}

/deep/ .el-collapse-item__wrap {
  background-color: #3c5ac8;
  position: fixed;
  width: 100%;
  z-index: 666 !important;
}

/deep/ .el-collapse-item__header {
  height: 60px;
  padding: 0px 0px 0px 20px;
  background-color: #3c5ac8;
  border: 0 !important;
  border-image-width: 0 !important;
  outline-width: 0 !important;
}

/deep/ .el-collapse-item__arrow {
  display: none;
}
</style>
