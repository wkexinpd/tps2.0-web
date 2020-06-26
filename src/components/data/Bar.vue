<template>
    <div class="bar" id="bar" style="width: 100%;height: 400px;"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
        name: 'Bar',
        props:{
            barData:{
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
                this.charts.setOption({
                    color: ['#dba375'],
                    title: {
                        text: '实训讲座',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: this.barData.xAxis,
                        axisLabel: {
                            interval:0,
                            rotate:-40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.barData.data,
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(220, 220, 220, 0.8)'
                        }
                    }]
                })
            }
        },
        //调用
        mounted() {
            this.$nextTick(function () {
                this.drawBar('bar')
            })
        },
        watch: {
            barData: {
                handler(newValue) {
                    this.barData = newValue;  //把新值赋值给我们的属性数据
                    this.drawBar('bar');  //刷新echarts图表
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>