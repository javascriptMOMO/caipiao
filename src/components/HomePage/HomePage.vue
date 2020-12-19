<template>
  <div class="home_page">
    <div class="title">
      <span>胜率</span>
      <span>名称</span>
      <span>场次/时间</span>
      <span>体彩方案</span>
      <span>皇冠方案</span>
    </div>
    <div class="content" v-for="(item, index) in totalGames" :key="index">
      <div class="content_1">
        <div
          v-for="(ele, i) in item"
          :key="ele.id"
          :class="i === 1 && 'border'"
        >
          {{ ele.id / 100 }}%
        </div>
      </div>
      <div class="content_1">
        <div
          v-for="(ele, i) in item"
          :key="ele.id"
          :style="{ background: ele.color, color: ele.color && '#fff' }"
          :class="i === 1 && 'border'"
        >
          {{ ele.l_cn_abbr }}
        </div>
      </div>
      <div class="content_2">
        <div
          v-for="(ele, i) in item"
          :key="ele.id"
          :class="i === 1 && 'border'"
        >
          <span>{{ ele.date }} {{ ele.time }}</span>
          <span>{{ ele.hg_time }}</span>
        </div>
      </div>
      <div class="content_3">
        <div class="content_3_div">
          <div
            v-for="(ele, i) in item"
            :key="ele.id"
            :class="i === 1 && 'border'"
            class="content_3_div_top"
          >
            <div>
              <span>
                {{ ele.h_cn_abbr }}
                <span style="color: red">[{{ ele.fixedodds }}]</span>
              </span>
              <span>vs</span>
              <span>{{ ele.a_cn_abbr }}</span>
            </div>
            <div class="border" style="background: #feffd1">
              <span>
                <span class="red_span" v-if="parseInt(ele.fixedodds) > 0">
                  <span>买入</span>
                </span>

                让胜:{{ ele.h }}
              </span>
              <span>让平:{{ ele.d }}</span>
              <span>
                <span class="red_span" v-if="parseInt(ele.fixedodds) < 0">
                  <span>买入</span>
                </span>
                让负:{{ ele.a }}
              </span>
            </div>
          </div>
        </div>
        <div class="content_3_set">
          <span>
            <span>
              <span>
                <el-input
                  v-model="item.bet_money"
                  placeholder="输入金额"
                  size="mini"
                  clearable
                >
                  <template #prefix>
                    <div style="background: transparent; color: #ff9800">
                      <i>投</i>
                    </div>
                  </template>
                </el-input>
              </span>
            </span>
            <span>获利</span>
            <span>{{ computedMoney(item) }}元</span>
          </span>
        </div>
      </div>
      <div class="content_4">
        <div
          v-for="(ele, i) in item"
          :key="ele.id"
          :class="i === 1 && 'border'"
          :style="{ flexDirection: 'column', height: '144px' }"
        >
          <div v-for="n in ele.hg_count" :key="n" class="border">
            <div
              v-if="ele[`hg_h_${n}`]"
              :style="{
                background:
                  (showTextOrBg(ele, n, 'h') || showTextOrBg(ele, n, 'a')) &&
                  '#feffd1',
              }"
            >
              <span>
                <span class="red_span" v-if="showTextOrBg(ele, n, 'h')">
                  <span>买入</span>
                </span>
                让胜:{{ ele[`hg_h_${n}`] }}
              </span>
              <span>
                <span class="red_span" v-if="showTextOrBg(ele, n, 'a')">
                  <span>买入</span>
                </span>
                让负:{{ ele[`hg_a_${n}`] }}
              </span>
              <span>买入:10000元</span>
              <span>买中23432元</span>
            </div>
          </div>
        </div>
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
import { getTotalGames } from "api/mainApi.js";
import { totalColors } from "assets/colors/color.js";
export default {
  setup(props, ctx) {
    console.log("进入页面");
    let count = ref(0);
    let totalGames = ref([]); //所有的比赛数据信息
    // 获取所有的比赛信息
    const getTotalGames_ = async () => {
      const { data } = await getTotalGames();
      console.log("比赛数据", data);
      data.data.forEach((item) => {
        item.bet_money = 2;
        item.forEach((ele) => {
          // let thisKey = parseInt(ele.fixedodds)>
          let keys = Object.keys(ele);
          let keysH = keys
            .map((k) => k.startsWith("hg_h") && ele[k])
            .filter(Boolean);
          let keysA = keys
            .map((k) => k.startsWith("hg_a") && ele[k])
            .filter(Boolean);
          ele.color = totalColors.get(ele.l_cn_abbr);
          ele.hg_max_h = Math.max(...keysH);
          ele.hg_max_a = Math.max(...keysA);
          ele.hg_count = keysH.length;
          // console.log(keysH, keysA, Math.max(...keysA));
        });
        let total = item.reduce((total, ele) => {
          return parseInt(ele.fixedodds) > 0
            ? total + ele.h * 1 + ele.hg_max_a * 1
            : total + ele.a * 1 + ele.hg_max_h * 1;
        }, 0);
        item.total_index = total.toFixed(2);
      });
      totalGames.value = data.data.sort((a,b)=>b.total_index - a.total_index);
    };
    getTotalGames_();
    onMounted(() => {
      console.log("程序挂载结束");
    });
    onUnmounted(() => {
      console.log("程序卸载成功");
    });
    // 根据输入金额计算获利
    const computedMoney = (item) => {
      const [num1, num2] = item.map((ele) => {
        return parseInt(ele.fixedodds) > 0 ? ele.h : ele.a;
      });
      let money = isNaN(Number(item.bet_money)) ? 0 : Number(item.bet_money);
      return (num1 * num2 * money).toFixed(2);
    };
    // 判断是否显示皇冠买入 和背景
    const showTextOrBg = (ele, n, key) => {
      let thisOne =
        key === "h" ? parseInt(ele.fixedodds) < 0 : parseInt(ele.fixedodds) > 0;
      let thisData =
        key === "h"
          ? ele.hg_max_h == ele[`hg_h_${n}`]
          : ele.hg_max_a == ele[`hg_a_${n}`];
      return thisOne && thisData;
    };
    return {
      count,
      totalGames,
      computedMoney,
      showTextOrBg,
    };
  },
};
</script>

<style lang="scss" scoped>
$same_border_color: #dcdcdc;
$same_column_height: 60px;
$same_height: $same_column_height * 2;
$same_1px_border: 1px solid $same_border_color;
@mixin display_grid {
  display: grid;
  grid-template-columns: 60px 60px 160px 1fr 1fr;
  grid-template-rows: auto;
  align-items: center;
}
.home_page {
  background: $same_border_color;
  border: $same_1px_border;
  user-select: none;
  .title {
    @include display_grid();
    height: $same_column_height;
    line-height: $same_column_height;
    grid-gap: 1px;
    font-weight: bolder;
    font-size: 18px;
    span {
      height: 100%;
      background: #fff;
    }
  }
  .content {
    @include display_grid();
    grid-template-rows: minmax($same_height, auto);
    grid-gap: 1px;
    margin-top: 10px;
    font-size: 13px;
    // &:nth-child(odd) {
    //   background: #fff;
    // }
    // &:nth-child(even) {
    //   background: #dcdcdc;
    // }
    .red_span {
      span {
        background: red;
        color: #fff;
        cursor: pointer;
        padding: 2px 3px 1px;
        border-radius: 4px;
      }
    }
    div {
      width: 100%;
      height: 100%;
      background: #fff;
      color: #616161;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .border {
        box-shadow: 0px -1px $same_border_color;
      }
    }
    .content_2 {
      color: #333333;
    }
    .content_3 {
      display: grid;
      grid-template-columns: 2fr 1fr;
      font-size: 12px;
      .content_3_div {
        border-right: $same_1px_border;
        .content_3_div_top {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 2fr 3fr;
          & > div:nth-child(1) {
            span:nth-child(1) {
              text-align: right;
            }
            span:last-child {
              text-align: left;
            }
          }
        }
        div {
          flex-direction: row;
          span {
            flex-grow: 1;
          }
        }
      }
      .content_3_set {
        width: 90%;
        justify-self: center;
        & > span {
          display: grid;
          grid-gap: 10px;
        }
        :deep .el-input__inner {
          color: #ff9800;
          text-align: center;
        }
      }
    }
    .content_4 {
      font-size: 12px;
      background: $same_border_color;
      grid-gap: 10px;
      div {
        flex-direction: row;
        span {
          width: 25%;
        }
        & > span:last-child {
          border-left: $same_1px_border;
        }
      }
    }
  }
}
</style>

