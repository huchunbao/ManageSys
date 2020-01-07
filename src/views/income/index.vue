<template>
  <div class="income-wrapper">
    <charts scenic-name="全部景区" />
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.name" ref="tabItem" :label="item.name" :name="item.name">
        <charts v-if="activeName===item.name" :scenic-name="item.name" />
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>
<script>
import Charts from './components/charts'

export default {
  name: 'Income',
  components: { Charts },
  data() {
    return {
      activeName: '全部景区',
      tabList: [{ id: 0, name: '全部景区' }, { id: 1, name: 'A景区' }, { id: 2, name: 'B景区' }]
    }
  },
  created() {

  },
  methods: {
    handleClick(tab, event) {
    }
  }
}
</script>

<style scoped>
.income-wrapper{
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  background-color: #F2F5FF;
}
</style>
