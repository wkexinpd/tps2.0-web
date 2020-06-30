<template>
    <download-excel :data="json_data" :fields="json_fields" :name="name" >
        <el-button type="primary" @click="exportAll">{{name}}</el-button>
    </download-excel>
</template>

<script>
    export default {
        name: "Download",
        props:{
            downloadDate:{
               type: Object,
               default: function () {
                   return {
                       value: '',
                   }
               }
           }
        },
        data() {
            return {
                json_fields: {},
                json_data: [],
                json_meta: [
                    [
                        {
                            " key ": " charset ",
                            " value ": " utf- 8 "
                        }
                    ]
                ],
                name:"",
            }
        },
        methods: {
            exportAll() {
                this.json_fields = this.downloadDate.json_fields;
                this.$axios.get(this.downloadDate.file.url, {studentName: this.downloadDate.file.studentName, majorClassId: this.downloadDate.file.majorClassId, from: this.downloadDate.file.from, limit: this.downloadDate.file.limit,}).then(res => {
                    if (res.data.code !== 200) {
                        this.$message.error("获取完成讲座选择信息失败");
                    }else{
                        this.json_data = res.data.result.records;
                    }
                })
            },
        },
        mounted() {
            this.name = this.downloadDate.file.name;
        }
    }
</script>

<style scoped>

</style>