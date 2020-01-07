<template><!--生态廊道监管考核-->
  <div class="about">
    <div class="header">
      <!-- 导航标志与页面名称 -->
      <daoy class="daoy"></daoy>
      <div class="header_text">生态廊道监管考核</div>
    </div>
    <div class="bg_img"></div>
    <div class="echarts_box">
      <div class="top">
        <fourcorners></fourcorners>
        <div class="title">上月水质监测与考核情况</div>
        <div class="table">
          <table class="tab_table" border="1px solid #fff" cellspacing="0" cellpadding="0">
            <tr>
              <th>监测点</th>
              <th>CTO进出水</th>
              <th>TN进出水</th>
              <th>HN3-N进出水</th>
              <th>TP进出水</th>
              <th>综合评级</th>
              <th>监测次数</th>
              <th>达标次数</th>
              <th>未达标次数</th>
              <th>考评分数</th>
              <th>考评扣款<span class="money">(万)</span></th>
              <th>实付金额<span class="money">(万)</span></th>
            </tr>
            <tr v-for="(item, i) in table_list" :key="i">
              <td>{{ item.marker }}</td>
              <td>{{ item.CTO.into + '&nbsp;&nbsp;' + item.CTO.out }}</td>
              <td>{{ item.TN.into + '&nbsp;&nbsp;' + item.TN.out }}</td>
              <td>{{ item.HN3.into + '&nbsp;&nbsp;' + item.HN3.out }}</td>
              <td>{{ item.TP.into + '&nbsp;&nbsp;' + item.TP.out }}</td>
              <td>{{ item.rating }}</td>
              <td>{{ item.test_nums }}</td>
              <td>{{ item.ok_nums }}</td>
              <td>{{ item.no_nums }}</td>
              <td>{{ item.golds }}</td>
              <td>{{ item.reduce }}</td>
              <td>{{ item.pay }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="bottom">
        <div class="title">水质监测达标情况统计</div>
        <div class="table">
          <ul class="ul_boxtitle">
            <li><span class="content_title">星期一</span><span class="bg_opa"></span></li>
            <li><span class="content_title">星期二</span><span class="bg_opa"></span></li>
            <li><span class="content_title">星期三</span><span class="bg_opa"></span></li>
            <li><span class="content_title">星期四</span><span class="bg_opa"></span></li>
            <li><span class="content_title">星期五</span><span class="bg_opa"></span></li>
            <li><span class="content_title">星期六</span><span class="bg_opa"></span></li>
            <li><span class="content_title">星期日</span><span class="bg_opa"></span></li>
            <li v-for="(item, i) in ul_list" :key="i"><span class="content_title">{{ item.nums }}</span><span class="bg_opa"></span><img :src="item.icon"></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import daoy from '../daoyou.vue'
import fourcorners from '../components/fourcorners'
export default {
  name: 'About',
  components: {
    daoy,
    fourcorners
  },
  data() {
    return {
      table_list: [
        {
          marker: '月满酒楼南段1',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          rating: 'IV类',
          test_nums: '186',
          ok_nums: '183',
          no_nums: '3',
          golds: '93',
          reduce: '0.3',
          pay: '9.7'
        },
        {
          marker: '月满酒楼南段2',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          rating: 'IV类',
          test_nums: '186',
          ok_nums: '183',
          no_nums: '3',
          golds: '93',
          reduce: '0.3',
          pay: '9.7'
        },
        {
          marker: '月满酒楼南段3',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          rating: 'IV类',
          test_nums: '186',
          ok_nums: '183',
          no_nums: '3',
          golds: '93',
          reduce: '0.3',
          pay: '9.7'
        },
        {
          marker: '月满酒楼南段4',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          rating: 'IV类',
          test_nums: '186',
          ok_nums: '183',
          no_nums: '3',
          golds: '93',
          reduce: '0.3',
          pay: '9.7'
        },
        {
          marker: '月满酒楼南段5',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          rating: 'IV类',
          test_nums: '186',
          ok_nums: '183',
          no_nums: '3',
          golds: '93',
          reduce: '0.3',
          pay: '9.7'
        },
        {
          marker: '月满酒楼南段6',
          CTO: { into: '87.7762', out: '87.7762' },
          TN: { into: '87.7762', out: '87.7762' },
          HN3: { into: '87.7762', out: '87.7762' },
          TP: { into: '87.7762', out: '87.7762' },
          rating: 'IV类',
          test_nums: '186',
          ok_nums: '183',
          no_nums: '3',
          golds: '93',
          reduce: '0.3',
          pay: '9.7'
        }
      ],
      ul_list: [],
      src_not: require('../../../assets/yingzhi/notok.png'),
      src_ok: require('../../../assets/yingzhi/okgreen.png')
    }
  },
  computed: {},
  watch: {
  },
  mounted() {
    var list = 42
    for (var i = 0; i < list; i++) {
      if (i < 31 || i === 31) {
        if (i === 7 || i === 12 || i === 23 || i === 17) {
          this.ul_list.push({ nums: i + 1, icon: this.src_not })
        } else {
          this.ul_list.push({ nums: i + 1, icon: this.src_ok })
        }
      } else {
        this.ul_list.push({ nums: '', icon: '' })
      }
    }
  },
  methods: {
    tiao(data) {
      this.$router.push({ path: '/' + data })
    }
  }
}
</script>

<style scoped>
.about {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url("../../../assets/yingzhi/bg_img.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
/* 头部标签 */
.header {
  height: 8%;
  width: 100%;
  margin-bottom: 10px;
  background-image: url("../../../assets/yingzhi/topback.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
.daoy {
  position: relative;
  left: 20px;
  top: 5px;
  z-index: 999;
}
.header_text {
  width: 30%;
  text-align: center;
  color: #fff;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 10px;
  float: left;
  position: absolute;
  left: 50%;
  top: 0%;
  margin-left: -15%;
}
.echarts_box{
  width: 100%;
  height: calc(100% - 8%);
  padding: 0 23px 30px 23px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.echarts_box .top ,.echarts_box .bottom{
  position: relative;
  width: 100%;
  height: calc((100% - 34.5px)/2);
}
.echarts_box .top {
  padding: 10px 10.5px 14.5px 10.5px;
}
.echarts_box .bottom{
  padding: 0;
}
.echarts_box .top .table , .echarts_box .bottom .table{
  width: 100%;
  height: calc(100% - 28.5px - 15px);
  margin-top: 15px;
}
.title{
  width: 100%;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size:16px;
  font-family:Adobe Heiti Std;
  font-weight: 400;
  color:rgba(255,252,1,1);
  margin-top: 12.5px;
}
.tab_table{
  width: 100%;
  height: 100%;
}
.tab_table tr{
  width: 100%;
  height: 20px;
  font-size:12px;
  font-family:Adobe Heiti Std;
  color:rgba(255,255,255,1);
}
.tab_table tr:nth-child(1){
  font-weight: 400;
}
.tab_table tr td{
  text-align:center;
}
.tab_table tr th .money{
  display: inline-block;
  font-size: 10px;
}
.ul_boxtitle{
  width: calc(100% - 4px);
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 2px;
  display: flex;
  flex-flow: row wrap;
}
.ul_boxtitle li {
  display:inline-block;
  width: calc((100% - 21px)/7);
  height:35px;
  margin-right: 3px;
  margin-bottom: 3px;
  line-height:35px;
  position:relative;
}
.ul_boxtitle li span.content_title{
  display: inline-block;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 35px;
  font-size: 12px;
  font-family:Adobe Heiti Std;
  font-weight:normal;
  color:rgba(255,255,255,1);
}
.bg_opa{
  position:absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  background:rgba(31,58,137,1);
  opacity: 0.8;
  z-index: -1;
}
.ul_boxtitle li img{
  display:inline-block;
  height:14px;
  width:14px;
  position:absolute;
  left:calc(80% - 7px);
  top:calc(50% - 7px);
}
</style>
