<template>
    <div id="main" style="width: 600px;height: 400px;"></div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: "Pie",
        props:{
            pieData:{
                type: Array,
                default: function () {
                    return {
                        value: '',
                    }
                }
            }
        },
        data() {
            return {
                name: '未来计划',
                charts: '',
                opinion: ['考研', '就业', '考公务员', '其他'],
            }
        },
        methods: {
            drawPie(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    title: {
                        text: '未来计划',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',

                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: this.pieData
                    },
                    series: [
                        {
                            name: '未来计划',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'blod'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: this.pieData
                        }
                    ]
                })
            }
        },
        //调用
        mounted() {
            this.$nextTick(function () {
                this.drawPie('main')
            })
        },
        watch: {
            pieData: {
                handler(newValue) {
                    this.pieData = newValue;  //把新值赋值给我们的属性数据
                    this.drawPie('main');  //刷新echarts图表
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>