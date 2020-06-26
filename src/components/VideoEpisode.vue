<template>
  <el-card
    shadow="never"
    :body-style="{ padding: '10px' }"
    style="border-radius:0px;background:#efefef;"
  >
    <div>
      <i class="el-icon-s-unfold"></i>
      视频选集({{ videoEpisodeData.total }})
    </div>
    <ul
      v-bind:class="{
        'ul-vertical': isVertical,
        'ul-horizontal': !isVertical
      }"
    >
      <li
        v-bind:class="{
          'li-vertical': isVertical,
          'li-horizontal': !isVertical,
          'li-active': videoEpisode.id === currentVideoEpisodeId
        }"
        v-for="(videoEpisode, key) in videoEpisodeData.records"
        :key="videoEpisode.id"
        @click="switchEpisode(videoEpisode.id)"
      >
        <i
          v-if="videoEpisode.id === currentVideoEpisodeId"
          class="el-icon-caret-right"
        ></i>
        {{ 'P' + (key + 1) + ' ' }} {{ videoEpisode.name }}
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: 'VideoEpisode',
  props: {
    currentVideoEpisodeId: {
      type: Number,
      default: 0
    },
    videoEpisodeData: {
      type: Object,
      default: function() {
        return {
          total: 3,
          records: [
            {
              id: 1,
              curriculumName: '课程名',
              curriculumTeacher: '授课教师',
              name: '视屏名字',
              description: '课程视屏的详细描述',
              url: ''
            },
            {
              id: 2,
              curriculumName: '课程名',
              curriculumTeacher: '授课教师',
              name: '视屏名字',
              description: '课程视屏的详细描述',
              url: ''
            }
          ]
        }
      }
    }
  },
  data() {
    return {
      isVertical: true
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth
    this.setMode()
    window.addEventListener(
      'resize',
      () => {
        this.screenWidth = window.innerWidth
        this.setMode()
      },
      false
    )
  },
  methods: {
    setMode: function() {
      // 通过浏览器宽度(图片宽度)计算高度
      if (this.screenWidth < 770) {
        this.isVertical = false
      } else {
        this.isVertical = true
      }
    },
    switchEpisode(id) {
      this.$emit('switch', id)
    }
  }
}
</script>

<style lang="less" scoped>
.ul-vertical {
  padding: 15px 0px;
  margin: 10px 0px;
  height: 400px;
  overflow-y: scroll;
}

.li-vertical {
  box-sizing: border-box;
  list-style-type: none;
  line-height: 25px;
  height: 35px;
  font-size: 12px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #ffffff;
  border: #efffff solid 1px;
  margin-bottom: 10px;
  padding: 5px;
}

.li-active {
  color: #409eff;
  border: #409eff solid 1px;
}

.li-horizontal {
  display: inline-block;
  box-sizing: border-box;
  list-style-type: none;
  line-height: 25px;
  height: 35px;
  font-size: 12px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #ffffff;
  border: #efffff solid 1px;
  margin-right: 10px;
  padding: 5px;
}

.ul-horizontal {
  width: 100%;
  display: inline;
  white-space: nowrap;
  overflow-x: scroll;
  float: left;
  padding: 10px 0px;
  margin: 0px;
  overflow-y: hidden;
}
</style>
