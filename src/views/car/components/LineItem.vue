<template>
  <div class="line-item">
    <div class="line-title">
      <div class="line-name">{{ item.routeName }}</div>
      <div class="line-time">平均到站时间：{{ item.downWaitNumber }}分钟</div>
    </div>
    <div class="line-pointdata">
      上行：{{ item.upRouteDec }}
      <div class="wait">{{ item.upWaitNumber }}</div>
    </div>
    <div class="line-pointdata">
      下行：{{ item.downRouteDec }}
      <div class="wait">{{ item.downWaitNumber }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LineItem', // 车船总览车船路线
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.line-item{
  width: 100%;
  background-color: rgba(47,49,83,.45);
  border-radius: 5px;
  margin-bottom: 14px;
  position: relative;

  & .line-title{
    padding: 0 14px 0 40px;
    height: 40px;
    line-height: 40px;

    .line-name:before{
      content: ' ';
      position: absolute;
      height: 12px;
      width: 12px;
      left: 14px;
      top: 14px;
      border-radius: 6px;
      background-color: #7F9DFF;
    }

    .line-name{
      float: left;
    }

    .line-time{
      font-size: 12px;
      float: right;
    }
  }

  & .line-pointdata{
    height: 52px;
    line-height: 18px;
    padding: 0 14px 0 40px;
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;/*显示几行*/
    position: relative;
    text-align: left;

    .wait{
      position: absolute;
      right: 14px;
      bottom: 10px;
      color: #7F9DFF;
      font-size: 14px;
    }

    .wait:before{
      content: '排队等候人数：';
      color: #fff;
      font-size: 12px;
    }

    .wait:after{
      content: '人';
      color: #fff;
      font-size: 12px;
    }
  }
}

.line-item:hover{
  background-color: rgba(47,49,83,.9);
}
</style>
