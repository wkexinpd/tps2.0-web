<template>
    <div class="dbar" id="dbar" style="width: 140%;height: 400px;">

    </div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: "DBar",
        props:{
            DbarData:{
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
                charts: '',
            }
        },
        methods: {
            drawBar(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.showLoading({
                    text: "图表数据正在努力加载..."
                });
                this.charts.setOption({
                    color: ['#3398DB','#68e544'],
                    title: {
                        text: '方向选择',
                        left: 'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['首选', '备选']
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: this.DbarData.direction
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '首选',
                            type: 'bar',
                            data:this.DbarData.DataFirst
                        },
                        {
                            name: '备选',
                            type: 'bar',
                            data:this.DbarData.DataSecond
                        }
                    ]
                }, true);
                this.charts.hideLoading();
            }
        },
        //调用
        mounted() {
            this.$nextTick(function () {
                this.drawBar('dbar')
            })
        },
        watch: {
            DbarData: {
                handler(newValue) {
                    this.DbarData = newValue;  //把新值赋值给我们的属性数据
                    this.drawBar('dbar');  //刷新echarts图表
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>