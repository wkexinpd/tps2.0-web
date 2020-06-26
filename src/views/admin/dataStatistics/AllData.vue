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
                        xAxis:['智慧同创，智慧同创', '智慧同创，智慧同创1', '智慧同创，智慧同创2', '智慧同创，智慧同创3', '智慧同创，智慧同创4', '智慧同创，智慧同创5', '智慧同创，智慧同创智慧同创，智慧同创','智慧同创，智慧同创6','智慧同创，智慧同创5','智慧同创，智慧同创5','智慧同创，智慧同创5'],
                        data: [320, 332, 301, 334, 390, 400, 600,200,900,100,200]
                    },
                DbarData: {
                        direction: [],
                        DataFirst:[],
                        DataSecond:[]
                    },
                pieData:[
                        {value: 335, name: '考研'},
                        {value: 310, name: '就业'},
                        {value: 234, name: '考公务员'},
                        {value: 135, name: '其他'}
                    ]

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