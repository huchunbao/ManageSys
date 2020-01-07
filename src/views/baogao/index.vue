<template>
  <div>
    <div class="lanjing">
      <div class="list1">
        <img src="@/assets/images/banner_left.png" alt="">
        <p class="p1">大数据报告</p>
        <p class="p2">超大型度假园区 2016客流量国内第一</p>
        <p class="p3">根据“主题娱乐协会”(TEA)和 AECOM 联合发布的 2016 年度《主题公园和博物馆报告》，山林氧吧的客流量 在亚太地区</p>
      </div>
      <div class="bai">
        <div class="list_header">三郎国际主题公园客流量</div>
        <div class="list2">
          <p class="p4">三郎国际山林氧吧概况</p>
          <p class="p5">2016年在亚太地区排名第四，中国第一</p>
          <p class="p6">根据“主题娱乐协会”(TEA)和 AECOM 联合发布的 2016 年度《主题公园和博物馆报告》，山林氧吧的客流量在亚太地区排名第四，在国内排名第一。</p>
          <p class="p6">在2016年，山林氧吧公园接待的游客数量达到847万。</p>
          <div id="ech1">
          </div>
          <div class="wei">
            <p class="p5">访客高峰1月和2月 客流占比最高达19.2%</p>
            <p class="p6">游客访问高峰出现在 1 月和 2 月，客流占比最高的体验活动为云端动物园浏览体验。云端动物园浏览体验区的客流占比最高，达到19.2%；帝亚吉欧文化体验中心排名第二，占比 18.8%</p>
          </div>
        </div>
        <div class="list_header">游客访问频次和时长分析</div>
        <div class="list2">
          <p class="p5">游客上半年的平均访问频次为1.8次，超85%游客的访问频次不多余2次</p>
          <p class="p6">平均访问频次可达1.8次 到访高峰上午10点。</p>
          <p class="p6">访问频次仅为一次的游客占比73.5%，超过40%的游客访问时长在9小时以上。</p>
          <div id="ech2" class="ehc2">
          </div>
          <div id="ech3" class="ehc2">
          </div>
        </div>
        <div class="list_header">游客访问时间点分析</div>
        <div class="list2">
          <p class="p5">接近60%游客的访问日期为工作日，到访高峰出现在上午10点</p>
          <p class="p6">有22.6%的游客选择在周末到访，节假日期间访问量占比17.6%。</p>
          <p class="p6">访客到访高峰时刻出现在上午10点前后。</p>
          <div id="ech4" class="ehc2">
          </div>
          <div id="ech5" class="ehc2">
          </div>
        </div>
        <div class="list_header">山林氧吧游客来源地公布</div>
        <div class="list2">
          <p class="p5">男女比例接近2:1，过半游客来自广东，备受珠海和广州市民青睐</p>
          <p class="p6">在上半年度，来自广东省的游客占比达到50.5%；来自北京上海和香港的游客占比要高于其他省。</p>
          <p class="p6">在来源城市TOP10榜单中，广东省内的城市占据7席。</p>
          <div class="list3">游客来源地分布</div>
          <div id="ech6" class="ehc3">
            <div class="ehc3_header">来源省份TOP10</div>
            <div v-for="(data,i) in data1" :key="i" class="ehc3_list">
              <div class="span">{{ data.name }}</div>
              <div class="img" :style="i==0?'color:#FF9F9C;':''">
                <div class="imgdiv" :style="'width:'+data.data+'%;'"><img v-if="i==0" src="@/assets/images/1.png"><img v-if="i!==0" src="../../assets/images/2.png"></div>{{ data.data }}%
              </div>
            </div>
          </div>
          <div id="ech7" class="ehc3">
            <div class="ehc3_header">来源城市TOP10</div>
            <div v-for="(data,i) in data2" :key="i" class="ehc3_list">
              <div class="span">{{ data.name }}</div>
              <div class="img" :style="i==0?'color:#FF9F9C;':''">
                <div class="imgdiv" :style="'width:'+data.data+'%;'"><img v-if="i==0" src="@/assets/images/1.png"><img v-if="i!==0" src="../../assets/images/2.png"></div>{{ data.data }}%
              </div>
            </div>
          </div>
        </div>
        <div class="list2">
          <p class="p5">上半年游客国内出行首选北京，出国游首选泰国</p>
          <p class="p6">上半年期间，接近40%的游客曾前往北京，去过香港的游客占比35%。</p>
          <p class="p6">在上半年，3.7%的海洋王国游客曾去过泰国，占比最高；马来西亚排名第二，占比3.5%。  </p>
          <div class="list3">游客出行目的地分布</div>
          <div id="ech8" class="ehc3">
            <div class="ehc3_header">出行省份TOP10</div>
            <div v-for="(data,i) in data3" :key="i" class="ehc3_list">
              <div class="span">{{ data.name }}</div>
              <div class="img" :style="i==0?'color:#FF9F9C;':''">
                <div class="imgdiv" :style="'width:'+data.data+'%;'"><img v-if="i==0" src="@/assets/images/1.png"><img v-if="i!==0" src="../../assets/images/2.png"></div>{{ data.data }}%
              </div>
            </div>
          </div>
          <div id="ech9" class="ehc3">
            <div class="ehc3_header">出行国家TOP10</div>
            <div v-for="(data,i) in data4" :key="i" class="ehc3_list">
              <div class="span">{{ data.name }}</div>
              <div class="img" :style="i==0?'color:#FF9F9C;':''">
                <div class="imgdiv" :style="'width:'+data.data+'%;'"><img v-if="i==0" src="@/assets/images/1.png"><img v-if="i!==0" src="../../assets/images/2.png"></div>{{ data.data }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
// import { get } from '@/api/axios'
export default {
  name: 'Baogao',
  data() {
    const colorlist = this.$store.state.settings.chartColors
    return {
      data1: [
        {
          name: '广东省',
          data: 50.5
        },
        {
          name: '山西省',
          data: 7.5
        },
        {
          name: '浙江省',
          data: 5.0
        },
        {
          name: '吉林省',
          data: 4.5
        },
        {
          name: '江苏省',
          data: 2.7
        },
        {
          name: '海南省',
          data: 2.4
        },
        {
          name: '广西省',
          data: 2.2
        },
        {
          name: '福建省',
          data: 2.0
        },
        {
          name: '湖南省',
          data: 1.9
        },
        {
          name: '湖北省',
          data: 1.6
        }
      ],
      data2: [
        {
          name: '珠海市',
          data: 12.1
        },
        {
          name: '广州市',
          data: 11.0
        },
        {
          name: '北京市',
          data: 7.5
        },
        {
          name: '佛山市',
          data: 6.2
        },
        {
          name: '深圳市',
          data: 5.5
        },
        {
          name: '上海市',
          data: 5.0
        },
        {
          name: '香港',
          data: 4.5
        },
        {
          name: '中山市',
          data: 4.2
        },
        {
          name: '东莞市',
          data: 3.9
        },
        {
          name: '江门市',
          data: 1.9
        }
      ],
      data3: [
        {
          name: '辽宁省',
          data: 39.2
        },
        {
          name: '四川省',
          data: 38.5
        },
        {
          name: '台湾省',
          data: 35.0
        },
        {
          name: '河南省',
          data: 32.6
        },
        {
          name: '广西省',
          data: 31.5
        },
        {
          name: '云南省',
          data: 30.5
        },
        {
          name: '河北省',
          data: 29.7
        },
        {
          name: '青海省',
          data: 29.4
        },
        {
          name: '贵州省',
          data: 28.7
        },
        {
          name: '山东省',
          data: 27.5
        }
      ],
      data4: [
        {
          name: '泰国',
          data: 3.7
        },
        {
          name: '马来西亚',
          data: 3.5
        },
        {
          name: '菲律宾',
          data: 3.0
        },
        {
          name: '澳大利亚',
          data: 3.0
        },
        {
          name: '匈牙利',
          data: 2.2
        },
        {
          name: '新加坡',
          data: 2.1
        },
        {
          name: '美国',
          data: 1.4
        },
        {
          name: '老挝',
          data: 0.9
        },
        {
          name: '日本',
          data: 0.8
        },
        {
          name: '韩国',
          data: 0.7
        }
      ],
      option1: {
        color: colorlist,
        grid: {
          left: '6%',
          right: '30%',
          top: '10%',
          bottom: '20%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function(a) {
            var data1 = a[0].axisValue + '<br>'
            for (var i = 0; i < a.length; i++) {
              data1 += a[i].marker
              data1 += a[i].seriesName + ':'
              data1 += a[i].data + '万人<br>'
            }
            return data1
          }
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '10%',
          data: ['观音沟生态公园', '火山沟山地公园', '大明寺禅茶公园', '重庆路运动公园', '山林氧吧公园', '田园绿廊公园', '滨河湿地公园']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],
            axisPointer: {
              type: 'shadow'
            },
            name: '年份（年）'
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            },
            name: '人数（万）'
          }
        ],
        series: [
          {
            name: '观音沟生态公园',
            type: 'bar',
            stack: '总金额',
            data: [2.0, 4.9, 4.9, 7.0, 23.2, 25.6, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
              color: '#89A2FF'
            }
          },
          {
            name: '火山沟山地公园',
            type: 'bar',
            stack: '总金额',
            data: [2.6, 28.7, 70.7, 175.6, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
              color: '#A2BCFF'
            }
          },
          {
            name: '大明寺禅茶公园',
            type: 'bar',
            stack: '总金额',
            data: [2.0, 2.2, 10.2, 20.3, 23.4, 23.0, 23.0, 16.5, 12.0, 6.2],
            itemStyle: {
              color: '#C5D6FF'
            }
          },
          {
            name: '重庆路运动公园',
            type: 'bar',
            stack: '总金额',
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5],
            itemStyle: {
              color: '#E4E5FF'
            }
          },
          {
            name: '山林氧吧公园',
            type: 'bar',
            stack: '总金额',
            data: [4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 16.5, 12.0, 6.2],
            itemStyle: {
              color: '#FF9F9C'
            }
          },
          {
            name: '田园绿廊公园',
            type: 'bar',
            stack: '总金额',
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 6.3, 10.2, 20.3, 12.0, 6.2],
            itemStyle: {
              color: '#FFDC79'
            }
          },
          {
            name: '滨河湿地公园',
            type: 'bar',
            stack: '总金额',
            data: [2.0, 2.2, 3.3, 4.5, 4.5, 23.4, 23.0, 16.5, 12.0, 6.2],
            itemStyle: {
              color: '#D4BDF6'
            }
          }
        ]
      },
      option2: {
        color: colorlist,
        title: {
          text: '访问频次分布',
          x: '32%',
          y: '80%',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}人({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '10%',
          data: ['1次', '2次', '3次', '4-6次', '大于等于7次']
        },
        series: [
          {
            name: '访问频次分布',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['38%', '50%'],
            data: [
              { value: 1548, name: '1次', itemStyle: { color: '#89a2ff' }},
              { value: 310, name: '2次', itemStyle: { color: '#a2bcff' }},
              { value: 234, name: '3次', itemStyle: { color: '#c5d6ff' }},
              { value: 135, name: '4-6次', itemStyle: { color: '#FF9F9C' }},
              { value: 335, name: '大于等于7次', itemStyle: { color: '#FFDC79' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option3: {
        grid: {
          left: '15%',
          right: '1%',
          top: '10%',
          bottom: '20%'
        },
        tooltip: {
          formatter: '访问频次分布<br>{b}客流量:{c}人'
        },
        xAxis: {
          type: 'category',
          data: ['0-3个小时', '3-6个小时', '6-9个小时', '9个小时以上'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: 'value',
          axisLabel: { formatter: '{value} 人' }
        },
        series: [
          {
            data: [120, 200, 150, 80],
            type: 'bar',
            color: '#A2BCFF',
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#A2BCFF',
                    fontSize: 10
                  }
                }
              }
            }
          }
        ]
      },
      option4: {
        title: {
          text: '访问日期分布',
          x: '32%',
          y: '80%',
          textStyle: { fontSize: '1rem', color: 'rgba(29,33,51,1)' }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a}</br>{b}:{c}人({d}%)'
        },
        legend: {
          orient: 'vertical',
          y: 'center',
          right: '10%',
          data: ['工作日', '节假日', '周末']
        },
        series: [
          {
            name: '客流量',
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['38%', '50%'],
            data: [
              { value: 155423, name: '工作日', itemStyle: { color: '#89a2ff' }},
              { value: 154587, name: '节假日', itemStyle: { color: '#FF9F9C' }},
              { value: 156425, name: '周末', itemStyle: { color: '#FFDC79' }}
            ],
            label: {
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      option5: {
        grid: {
          left: '13%',
          right: '1%',
          top: '5%',
          bottom: '20%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: '访问时刻分布<br>{b}客流量:{c}人'
        },
        xAxis: {
          type: 'category',
          data: [
            '0:00',
            '2:00',
            '4:00',
            '6:00',
            '8:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00'
          ],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: false,
          axisLabel: { formatter: '{value} 人' }
        },
        series: [
          {
            data: [
              0,
              23000,
              24000,
              35000,
              23000,
              21354,
              35000,
              52135,
              24000,
              35000,
              22000,
              13000
            ],
            type: 'line',
            color: '#3F6AFF',
            smooth: 'smoothMonotone',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#6578FF' // 0% 处的颜色
                }, {
                  offset: 0.9, color: '#fff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    this.getData(this.$store.state.user.companyId)
    this.ech1()
  },
  methods: {
    getData(id) {
      echarts.init(document.getElementById('ech1')).setOption(this.option1)
      echarts.init(document.getElementById('ech2')).setOption(this.option2)
      /* var that = this
      get('/data-center-statistic/tourist-flow/' + id, null).then((response) => { // 年度景点比例
        if (response.status === 0) {
          that.option1.legend.data = response.data.name
          that.option1.xAxis[0].data = Object.keys(response.data.data)
          var value = Object.values(response.data.data)
          var bCount = response.data.name.length
          var sData = []
          for (var j = 0; j < bCount; j++) {
            sData[j] = []
            for (var n = 0; n < value.length; n++) {
              sData[j][n] = (value[n][j] / 10000).toFixed(2)
            }
          }

          for (var i = 0; i < response.data.name.length; i++) {
            that.option1.series.push({
              name: response.data.name[i],
              type: 'bar',
              stack: '总金额',
              data: sData[i]
            })
          }
          echarts.init(document.getElementById('ech1')).setOption(this.option1)
        }
      })

      get('/data-center-statistic/visit-frequency/' + id, null).then((response) => { // 访问频次
        console.log(response)
        if (response.status === 0 && response.data.length > 0) {
          for (var fre = 0; fre < response.data.length; fre++) {
            if (response.data[fre].times === 1) {
              that.option2.series[0].data[0].value += response.data[fre].cnt
            } else if (response.data[fre].times === 2) {
              that.option2.series[0].data[1].value += response.data[fre].cnt
            } else if (response.data[fre].times === 3) {
              that.option2.series[0].data[2].value += response.data[fre].cnt
            } else if (response.data[fre].times >= 4 && response.data[fre].times < 7) {
              that.option2.series[0].data[3].value += response.data[fre].cnt
            } else if (response.data[fre].times >= 7) {
              that.option2.series[0].data[4].value += response.data[fre].cnt
            }
          }
          echarts.init(document.getElementById('ech2')).setOption(this.option2)
        }
      })

      get('/data-center-statistic/visit-duration/' + id, null).then((response) => { // 停留时长
        console.log(response)
        if (response.status === 0) {

        }
      })

      get('/data-center-statistic/visit-day/' + id, null).then((response) => { // 访问时间
        console.log(response)
        if (response.status === 0) {

        }
      })

      get('/data-center-statistic/visit-hour/' + id, null).then((response) => { // 访问时刻
        console.log(response)
        if (response.status === 0) {

        }
      })

      get('/data-center-statistic/source-province/' + id, null).then((response) => { // 游客来源省份
        console.log(response)
        if (response.status === 0) {

        }
      })

      get('/data-center-statistic/source-city/' + id, null).then((response) => { // 游客来源城市
        console.log(response)
        if (response.status === 0) {

        }
      })

      get('/data-center-statistic/target-province/' + id, null).then((response) => { // 游客出行省份
        console.log(response)
        if (response.status === 0) {

        }
      })

      get('/data-center-statistic/target-nation/' + id, null).then((response) => { // 游客出行国家
        console.log(response)
        if (response.status === 0) {

        }
      }) */
    },
    ech1() {
      const echarts3 = echarts.init(document.getElementById('ech3'))
      const echarts4 = echarts.init(document.getElementById('ech4'))
      const echarts5 = echarts.init(document.getElementById('ech5'))
      echarts3.setOption(this.option3)
      echarts4.setOption(this.option4)
      echarts5.setOption(this.option5)
    }
  }
}
</script>
<style   scoped>
.lanjing {
  width: 100%;
  background: #eff3ff;
}
.list1{
  width: 80%;
  margin: auto;
  overflow: hidden;
  height: 27vh;
}
.list1 img{
  float: right;
  width: 30%;
}
.p1{
  font-size:5vh;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(101,120,255,1);
  margin-top: 3%;
}
.p2{
  font-size:1.5vh;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
  margin-top: 3%;
}
.p3{
  font-size:1vh;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
  margin-top: 3%;
}
.bai{
  width: 98%;
  margin: auto;
  background: #ffffff;
  border-radius: 0.5vw;
  padding-top: 1%;
}
.list2{
  width: 95%;
  margin: auto;
  overflow: hidden;
}
.list_header{
  width: 18%;
  font-size: 2vh;
  text-align: center;
  height: 6vh;
  line-height: 5vh;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  background: url("../../assets/images/btn_title.png") no-repeat;
  background-size: 100% 100%;
  margin-left: -1.2%;
  margin-top: 1%;
  margin-bottom: 1%;
}
.p4{
  font-size: 2vh;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(101,120,255,1);
}
.p5{
  font-size: 1.5vh;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
}
.p6{
  font-size: 1vh;
  font-family:PingFang SC;
  color:rgb(136, 133, 133);
}
#ech1{
  width: 100%;
  height: 60vh;
}
.wei{
  width: 100%;
  background:rgba(242,244,255,1);
  padding: 1%;
}
.ehc2{
  width: 50%;
  height: 50vh;
  float: left;
}
.ehc3{
  width: 30%;
  height: 50vh;
  float: left;
  margin-left: 5%;
}
.ehc3_header{
  margin: auto;
  width: 50%;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
  font-size: 2vh;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(29,33,51,1);
}
.ehc3_list{
  font-size: 1.5vh;
  line-height: 2vh;
  margin-top: 3%;
}
.ehc3_list .span{
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(29,33,51,1);
  float: left;
  width: 15%;
}
.ehc3 .img{
  width: 80%;
  height: 2vh;
  display: inline-block;
  margin-left: 1%;
  color: #89A2FF;
}
.ehc3 .imgdiv{
  height: 100%;
  overflow: hidden;
  display: inline-block;
  float: left;
  margin-right: 1%;
  padding-top: 0.5%;
}
.ehc3 img{
  width: 20vw;
}
.list3{
  width: 15%;
  height: 7vh;
  margin-left: 20%;
  background:rgba(242,244,255,1);
  margin-top: 2vh;
  margin-bottom: 2vh;
  text-align: center;
  line-height: 7vh;
  font-size: 2vh;
}
</style>
