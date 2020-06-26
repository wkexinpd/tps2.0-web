<template>
  <el-card shadow="hover">
    <div class="header">{{ data.title }}</div>
    <div class="person" v-if="data.creatorName">
      <img :src="data.avatar" alt="avatar" class="avatar" />
      <span>{{ data.creatorName }}</span>
    </div>
    <div class="footer">
      <div class="item">
        <i class="el-icon-view-fwj">
          <span class="number">{{ ' ' + data.viewNumber }}</span>
        </i>
      </div>
      <div class="item">
        <i class="el-icon-reply-fwj"></i>
        <span class="number">{{ ' ' + data.replyNumber }}</span>
      </div>
      <div class="item">
        <i class="el-icon-nice-fwj"></i>
        <span class="number">{{ ' ' + data.niceNumber }}</span>
      </div>
      <div class="item" style="float:right;">
        <i class="el-icon-date"></i>
        <span class="number">{{ ' ' + data.createdAt }}</span>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ForumItem',
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          viewNumber: 0,
          replyNumber: 0,
          niceNumber: 0,
          avatar: require('../assets/images/cat.jpg'),
          creatorName: '发帖人名字',
          title: '标题',
          createdAt: '2020-04-06 11:00'
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 10px;
}

.person {
  height: 20px;
  line-height: 20px;
  color: #606266;
  font-size: 12px;
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  vertical-align: middle;
  margin-right: 10px;
}

.footer {
  margin-top: 10px;
  .item {
    display: inline-block;
    margin-right: 15px;
    .number {
      font-size: 12px;
    }
  }
}
</style>
