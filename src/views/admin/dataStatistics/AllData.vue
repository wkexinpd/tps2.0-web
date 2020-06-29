<template>
    <div style="width: 100%;background: #FFFFFF;">
        <div class="allData-top lecture-select">
            <div style="width: 44%;">
                <DBar :DbarData="DbarData"></DBar>
            </div>
            <div style="width: 44%">
                <Pie :pieData="pieData"></Pie>
            </div>
        </div>
        <div class="allData-bottom">
            <Bar :barData="barData"></Bar>
        </div>
    </div>
</template>
<script>
    import Pie from "../../../components/data/Pie";
    import Bar from "../../../components/data/Bar";
    import DBar from "../../../components/data/DBar";
    export default {
        name: "AllData",
        data(){
            return {
                barData: {
                        xAxis:[],
                        data: []
                    },
                DbarData: {
                        direction: [],
                        DataFirst:[],
                        DataSecond:[]
                    },
                pieData:[]
            }
        },
        created() {
            this.AttendanceData();
            this.PieData();
            this.BarData();
        },
        methods:{
            AttendanceData() {
                this.$axios.get(this.$api.DbarDataFirst).then(res => {
                    var result = res.data.result;
                    var direction = [];
                    var num = [];
                    if(res.status === 200) {
                        for(let i = 0; i < res.data.result.length;i++) {
                             direction[i] = result[i].directionName;
                             num[i] = result[i].num;
                        }
                        this.DbarData.direction = direction;
                        this.DbarData.DataFirst = num;
                    }
                });
                this.$axios.get(this.$api.DbarDataSecond).then(res => {
                    var result = res.data.result;
                    var num = [];
                    if(res.status === 200) {
                        for(let i = 0; i < res.data.result.length;i++) {
                            num[i] = result[i].num;
                        }
                        this.DbarData.DataSecond = num;
                    }
                })
            },
            PieData () {
                var pie = [];
                this.$axios.get(this.$api.PieData).then(res => {
                    var result = res.data.result;
                    if(res.status === 200) {
                        for(let i = 0; i < res.data.result.length;i++) {
                            pie[i] = {name:result[i].planName, value:result[i].studentNum}
                        }
                        this.pieData = pie;
                    }
                });
            },
            BarData () {
                this.$axios.get(this.$api.BarData).then(res => {
                    var result = res.data.result.records;
                    var xAxis = [];
                    var data = [];
                    if(res.status === 200) {
                        for(let i = 0; i < res.data.result.records.length;i++) {
                            xAxis[i] = result[i].lectureName;
                            data[i] = result[i].selectedNum;
                        }
                        this.barData.xAxis = xAxis;
                        this.barData.data = data;
                    }
                });
            }
        },
        components: {
            Pie,
            Bar,
            DBar
        }
    }
</script>

<style scoped>

</style>