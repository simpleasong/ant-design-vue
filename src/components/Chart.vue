<template>
    <div ref="chartDom" id="lineChart"></div>
</template>
<script>
import * as echarts from 'echarts';
import { addListener,removeListener } from 'resize-detector';   //resize-detector插件
import debounce from 'lodash/debounce';     //防抖
export default {
    data() {
        return {
            chart:null,
        }
    },
    props:{
        option:{
            type:Object,
            default:()=>{},
        }
    },
    watch:{
        //第一种方法，深度监听 耗性能
        // option:{
        //     handler:function(val){
        //         this.chart.setOption(val);
        //     },
        //     deep:true
        // },
        option(val){
            this.chart.setOption(val);
        }
    },
    created(){
        this.resize = debounce(this.resize, 300);
    },
    mounted(){
        this.renderChart();
        addListener(this.$refs.chartDom,this.resize);
    },
    beforeDestroy(){
        removeListener(this.$refs.chartDom, this.resize);
        this.chart.dispose();
        this.chart = null;
    },
    methods:{
        resize() {
            console.log("resize");
            this.chart.resize();
        },
        renderChart() {
            // 基于准备好的dom，初始化echarts实例
            this.chart = echarts.init(this.$refs.chartDom);
            // 绘制图表
            this.chart.setOption(this.option);
        }
    }
}
</script>
<style>
    
</style>
