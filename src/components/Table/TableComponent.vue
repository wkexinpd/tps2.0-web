<template>
    <el-table
            :data="options"
            border>
        <div v-for="att in tableNames" :key="att.prop">
            <el-table-column
                    :prop="att.prop"
                    :label="att.name"
                    style="width: 20%"
                    min-width="180">
            </el-table-column>
        </div>
    </el-table>
</template>
<script>
    export default {
        name: "TableComponent",
        props:{
            tableDate: {
                default: function () {
                    return {

                    }
                }
            }
        },
        data() {
            return {
                options:[],
                tableNames:[],
            }
        },
        mounted(){
            this.options=this.tableDate.options;
            this.tableNames = this.tableDate.tableNames;
        },
        watch: {
            tableDate: {
                handler(newValue) {
                    this.options=newValue.options;
                    this.tableNames = newValue.tableNames;
                },
                deep: true
            }
        }
    }
</script>
<style scoped>
</style>