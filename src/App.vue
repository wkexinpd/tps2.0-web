<template>
  <div id="app">
<!--路由占位符-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function() {
      setTimeout(function() {
          document.body.removeChild(document.getElementById('loading- of-index'))
      }, 900)
  }
}
</script>

<style>
    html,
    body {
        padding: 0;
        margin: 0;
        border: 0;
        background-color: rgba(250, 250, 250, 0.3);
        /* 以下代码，禁止文字被选中 */
        -webkit-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #303133;
    }

    #nprogress .bar {
        height: 4px !important;
    }

    .el-page-header__left:hover {
        color: rgba(64, 130, 250, 0.9);
    }

    .el-message {
        z-index: 66666667 !important;
    }
</style>
