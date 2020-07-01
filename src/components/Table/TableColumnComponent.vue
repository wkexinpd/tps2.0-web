<template >
    <div :data="options">
        <div v-for="att in tableColumnNames" :key="att.prop" >
            <el-table-column
                :prop="att.prop"
                :label="att.name"
                style="width: 20%"
                min-width="180"
            >
            </el-table-column>
        </div>
    </div>
</template>
<script>
    export default {
        name: "TableColumnComponent",
        props:{
            tableColumnDate: {
                default: function () {
                    return {
                    }
                }
            }
        },
        data() {
            return {
                options:[],
                tableColumnNames:[],
            }
        },
        mounted(){
            this.options=this.tableColumnDate.options;
            this.tableColumnNames = this.tableColumnDate.tableNames;
            console.log(this.tableColumnDate)
        },
        watch: {
            tableColumnDate: {
                handler(newValue) {
                    this.options=newValue.options;
                    this.tableColumnNames = newValue.tableColumnNames;
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>