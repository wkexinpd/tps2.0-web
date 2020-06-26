<template>
    <div :id="this.id" style="width: 100%;height: 400px;"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "AttendanceData",
        props: {
            attendanceData: {
                type: Object,
                default: function () {
                    return {
                        value: '',
                    }
                }
            },
        },
        data() {
            return {
                id: 'att' + this.attendanceData.id,
                charts: '',
            }
        },
        methods: {
            drawBar(id) {
                this.charts = echarts.init(document.getElementById(id));
                this.charts.setOption({
                    title: {
                        text: this.attendanceData.className,
                        left: 'center',
                        top: 'bottom',
                        fontSize: 12
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['正常', '迟到早退', '旷课', '请假']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: this.attendanceData.xAxis,
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '正常',
                            type: 'bar',
                            barGap: 0,
                            data: this.attendanceData.normal
                        },
                        {
                            name: '迟到早退',
                            type: 'bar',
                            data: this.attendanceData.late
                        },
                        {
                            name: '旷课',
                            type: 'bar',
                            barGap: 0,
                            data: this.attendanceData.truancy
                        },
                        {
                            name: '请假',
                            type: 'bar',
                            barGap: 0,
                            data:this.attendanceData.lea
                        },
                    ]
                })
            }
        },
        //调用
        mounted() {
            this.$nextTick(function () {
                this.drawBar(this.id)
            })
        }
    }
</script>

<style scoped>

</style>