<template>
  <div class="home_page">
    <span>{{ count }}</span>
    <el-button type="primary" @click="addCount">测试点击</el-button>
    <div class="title">
      <span>名称</span>
      <span>场次/时间</span>
      <span>体彩方案</span>
      <span>皇冠方案</span>
    </div>
    <div class="content" v-for="n in 10" :key="n">
      <div class="content_1">英超</div>
      <div class="content_2">阿森纳 VS 曼联</div>
      <div class="content_3">
        <span>让胜:1.27</span>
        <span>让平:2.55</span>
        <span>让负:1.89</span>
        <span>投30000元获利423423432元</span>
      </div>
      <div class="content_4">
        <span>让胜:1.27</span>
        <span>让平:2.55</span>
        <span>买入:10000元</span>
        <span>买中23432元</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  getCurrentInstance,
} from "vue";
export default {
  setup(props,ctx) {
    console.log("进入页面");
    let count = ref(0);
    let instance = getCurrentInstance();

    // 测试增加函数
    const addCount = () => {
      count.value++;
      console.log("增加count", instance,ctx);
    };
    watchEffect((e) => {
      console.log("有什么变化产生", count.value, e);
    });
    watch(count, (count, pre) => {
      console.log("count发生变化", count, pre);
    });
    onMounted(() => {
      console.log("程序挂载结束");
    });
    onUnmounted(() => {
      console.log("程序卸载成功");
    });
    return {
      count,
      addCount,
    };
  },
};
</script>

<style lang="scss" scoped>
@mixin display_grid {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 1fr;
  align-items: center;
}
.home_page {
  background: #dcdcdc;
  border: 1px solid #dcdcdc;
  .title {
    @include display_grid();
    height: 60px;
    grid-gap: 1px;
    span {
      line-height: 60px;
      background: #fff;
    }
  }
  .content {
    @include display_grid();
    height: 60px;
    background: #dcdcdc;
    grid-gap: 1px;
    margin-top: 1px;
    div {
      background: #fff;
      line-height: 60px;
    }
  }
}
</style>

