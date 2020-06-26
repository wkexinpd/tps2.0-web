<template>
  <div>
    <h4 style="margin: 15px 0px;">{{ radioGroupData.description }}</h4>
    <div>
      <el-radio-group v-model="radioGroupData.value">
        <el-radio-button
          class="radio_button"
          v-for="radio in radioGroupData.radioList"
          :key="radio.id"
          :label="radio.id"
        >
          {{ radio.name }}
        </el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomRadioGroup',
  props: {
    radioGroupData: {
      type: Object,
      default: function() {
        return {
          value: 0,
          description: '选项组名字',
          radioList: [
            {
              id: 1,
              name: '选项名字'
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.radio_button {
  margin: 0 20px 20px 0px;
}
/deep/ .el-radio-button__inner {
  border: 0px !important;
  background-color: rgba(64, 130, 250, 0.2);
  color: #3c5ac8;
  border-radius: 3px !important;
}
/deep/ .is-active > .el-radio-button__inner {
  background-color: #3c5ac8 !important;
}
</style>
