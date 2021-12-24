<template>
  <div class="echarts">
    <div :style="{height:'800px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>
<script>
var opinionData
  import echarts from "echarts";
  import axios from 'axios'
  //   import '../../node_modules/echarts/map/js/world.js'
  import '../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
function getname(){
  return axios({
    method: 'Get',
    url: "https://www.fastmock.site/mock/746b3ac0671b15ec7dbaa430e4297d2c/ditu1/1"
  });
}
  export default {
    name: "echarts",

    data() {
      return {
        chart: null,
      };
    },
    // created(){
    //         this.weget();
    // },
    mounted() {
          this.weget();
      // this.chinaConfigure();
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
    async weget () {
      const res = await getname()
      if (res.data.length === 0) {
        this.dataEmpty = true
      } else {
        opinionData = res.data.Resut
        this.dataEmpty = false
        this.chinaConfigure();
      }
      console.log(opinionData)
    },
      chinaConfigure() {
        let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置    
        window.onresize = myChart.resize;
        myChart.setOption({ // 进行相关配置
          // backgroundColor: "#02AFDB",
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          dataRange: {
            show: false,
            min: 0,
            max: 1000,
            text: ['High', 'Low'],
            realtime: true,
            calculable: true,
            color: ['orangered', 'yellow', 'lightskyblue']
          },
          geo: { // 这个是重点配置区
            map: 'china', // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.4)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)'
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          
          series: [{
              type: 'scatter',
              coordinateSystem: 'geo' // 对应上方配置
            },
            {
              name: '供应商数量', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              data: opinionData,
              
            },
            console.log(opinionData)
          ]
        })
      }
    }
  }
</script>