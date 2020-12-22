<template>
  <div class="home_page">
    <div class="title">
      <span>胜率</span>
      <span>名称</span>
      <span>场次/时间</span>
      <span>体彩方案</span>
      <span>皇冠方案</span>
    </div>
    <div>
      <div class="content" v-for="(item, index) in thisPageGames" :key="index">
        <div class="content_1">
          <div style="border: 1px solid #dcdcdc">
            <span style="display: flex; flex-direction: column">
              <span>方案{{ (currentPage*pageSize+index)-pageSize+1 }}</span>
              <span>{{ item.total_index }}</span>
            </span>
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
            :style="{ background: ele.alpha_color }"
          >
            <span>{{ ele.date }} {{ ele.time }}</span>
            <span>{{ ele.hg_time }}</span>
            <!-- class="link_span" -->
            <span>
              <el-link
                :href="`https://www.okooo.com/soccer/match/${ele.matchid}/ah/`"
                target="__blank"
                >ok</el-link
              >
            </span>
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
              <div :style="{ background: ele.alpha_color, fontSize: '18px' }">
                <span>
                  {{ ele.h_cn_abbr }}
                  <span style="color: red">[{{ ele.fixedodds }}]</span>
                </span>
                <span>vs</span>
                <span>{{ ele.a_cn_abbr }}</span>
              </div>
              <div
                class="border"
                style="background: #feffd1"
                :style="{ background: ele.alpha_color, fontSize: '14px' }"
              >
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
          <div class="content_3_set" style="background: #fdf6ec">
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
              <span>{{ computedMoney(item).money }}元</span>
              <span>净利润:{{ computedEarn(item) }}</span>
              <span>1手回报率:{{ computedHuiBao(item, 1) }}%</span>
              <span>2手回报率:{{ computedHuiBao(item, 2) }}%</span>
              <span>3手回报率:{{ computedHuiBao(item, 3) }}%</span>
            </span>
          </div>
        </div>
        <div class="content_4">
          <div
            v-for="(ele, i) in item"
            :key="ele.id"
            :class="i === 1 && 'border'"
            :style="{
              flexDirection: 'column',
              height: '144px',
              fontSize: '14px',
            }"
          >
            <div v-for="n in ele.hg_count" :key="n" class="border">
              <div
                class="content_4_div"
                v-if="ele[`hg_h_${n}`]"
                :style="{ background: ele.alpha_color }"
              >
                <div>
                  <div>
                    <span style="text-align: right">
                      <span class="red_span" v-if="showTextOrBg(ele, n, 'h')">
                        <span>买入</span>
                      </span>
                    </span>
                    <span> 让胜:{{ ele[`hg_h_${n}`] }} </span>
                    <span
                      class="position_span"
                      :style="{
                        visibility:
                          showTextPositon(ele, n).show == 'left'
                            ? ''
                            : 'hidden',
                      }"
                      >{{ showTextPositon(ele, n).text }}</span
                    >
                  </div>
                  <div>
                    <span
                      class="position_span"
                      :style="{
                        visibility:
                          showTextPositon(ele, n).show == 'right'
                            ? ''
                            : 'hidden',
                      }"
                      >{{ showTextPositon(ele, n).text }}</span
                    >
                    <span> 让负:{{ ele[`hg_a_${n}`] }} </span>
                    <span style="text-align: left">
                      <span class="red_span" v-if="showTextOrBg(ele, n, 'a')">
                        <span>买入</span>
                      </span>
                    </span>
                  </div>
                </div>
                <div
                  v-if="showTextOrBg(ele, n, 'a') || showTextOrBg(ele, n, 'h')"
                >
                  <span>买入:{{ computedVar(item)[i] }}元</span>
                  <span>买中{{ computedBuy(item)[i] }}元</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination background layout="prev, pager, next" @current-change="pageChange" :page-size="pageSize" :total="totalPage">
      </el-pagination>
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
import { useRouter } from "vue-router";
import { ElLoading } from 'element-plus';
export default {
  setup(props, ctx) {
    console.log("进入页面");
    const router = useRouter();
    const money = 1000; //默认输入的金额
    const pageSize = 50;//每页展示的条数
    let totalPage = ref(0);//总共有多少数据
    let totalGames = ref([]); //所有的比赛数据信息
    let thisPageGames=ref([]);//当前页的数据
    let currentPage = ref([1]);//默认在第一页
    let pageLoad = ElLoading.service({fullscreen:true,text:'努力计算中...请稍等...'});
    // 获取所有的比赛信息
    const getTotalGames_ = async () => {
      const { data } = await getTotalGames();
      console.log("比赛数据", data);
      if (data.code == 1) {
        router.replace("/");
        return;
      }
      pageLoad.close();
      data.data.forEach((item) => {
        item.bet_money = money;
        let randomColorList = [];
        item.forEach((ele, index) => {
          // let thisKey = parseInt(ele.fixedodds)>
          let keys = Object.keys(ele);
          let keysH = keys
            .map((k) => k.startsWith("hg_h") && ele[k])
            .filter(Boolean);
          let keysA = keys
            .map((k) => k.startsWith("hg_a") && ele[k])
            .filter(Boolean);
          let thisColor = totalColors.get(ele.l_cn_abbr)
            ? ""
            : totalColors.set(ele.l_cn_abbr, randomColor());
          ele.color = totalColors.get(ele.l_cn_abbr);
          ele.hg_max_h = Math.max(...keysH);
          ele.hg_max_a = Math.max(...keysA);
          ele.hg_count = keysH.length;
          ele.var = parseInt(ele.fixedodds) > 0 ? ele.hg_max_a : ele.hg_max_h; //变量1
          item.alpha_color = ele.alpha_color = translateColor(ele.color, 0.2);
          // console.log(keysH, Math.max(...keysH));
          // console.log(keysA, Math.max(...keysA));
        });
        let total = item.reduce((total, ele) => {
          return parseInt(ele.fixedodds) > 0
            ? total + ele.h * 1 + ele.hg_max_a * 1
            : total + ele.a * 1 + ele.hg_max_h * 1;
        }, 0);
        item.total_index = total.toFixed(2);
      });
      data.data.sort((a, b) => b.total_index - a.total_index);
      totalPage.value = data.data.length;//总数据
      let pageData = sliceArr(data.data, pageSize);
      totalGames.value = pageData;
      thisPageGames.value = pageData[0];//默认显示第一页
    };
    getTotalGames_();
    onMounted(() => {
      console.log("程序挂载结束");
    });
    onUnmounted(() => {
      console.log("程序卸载成功");
    });
    // 根据输入金额计算毛获利
    const computedMoney = (item) => {
      const [num1, num2] = item.map((ele) => {
        return parseInt(ele.fixedodds) > 0 ? ele.h : ele.a;
      });
      let money = isNaN(Number(item.bet_money)) ? 0 : Number(item.bet_money);
      return {
        money: (num1 * num2 * money).toFixed(2),
        var3: (num1 * num2).toFixed(2),
      };
    };
    // 根据输入金额计算买入钱数 y
    const computedVar = (item) => {
      let var1 = item[0].var,
        var2 = item[1].var,
        var3 = computedMoney(item).var3;
      let y = ((((item.bet_money * var3) / var2) * (var2 - 1)) / var1).toFixed(
        2
      );
      let z = ((item.bet_money * var3) / var2).toFixed(2);
      return [Number(y), Number(z)];
    };
    // 根据金额计算买中钱数
    const computedBuy = (item) => {
      const [y, z] = computedVar(item);
      let var1 = item[0].var,
        var2 = item[1].var;
      let y1 = (y * (var1 - 1) - item.bet_money).toFixed(2),
        z1 = (z * (var2 - 1) - item.bet_money - y).toFixed(2);
      return [Number(y1), Number(z1)];
    };
    // 计算净利润
    const computedEarn = (item) => {
      let total = computedMoney(item).money;
      let maizhong = computedVar(item).reduce((t, item) => t + Number(item), 0);
      return Number((total - item.bet_money - maizhong).toFixed(2));
    };
    // 计算各种回报率
    const computedHuiBao = (item, type) => {
      const [y, z] = computedBuy(item); // 利润1 利润2
      const earn = computedEarn(item); //利润3
      const [y1, z1] = computedVar(item); //买入y 买入z
      let money = isNaN(Number(item.bet_money)) ? 0 : Number(item.bet_money);
      // console.log(y, z, earn, y1, z1);
      switch (type) {
        case 1:
          return money ? ((y / (money + y1)) * 100).toFixed(2) : 0;
        case 2:
          return money ? ((z / (y1 + z1)) * 100).toFixed(2) : 0;
        case 3:
          return money ? ((earn / (money + y1 + z1)) * 100).toFixed(2) : 0;
      }
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
    // 判断显示倍率文字显示左边还是右边
    const showTextPositon = (ele, n) => {
      let text = ele[`hg_fixedodds_${n}`],
        newText = text.includes("受") ? text.substring(1) : text;
      return {
        show: text && text.includes("受") ? "right" : "left",
        text: newText,
      };
    };
    // 随机颜色
    const randomColor = () => {
      return (
        "#" +
        ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6)
      );
    };
    // 将16进制颜色转换为rgba
    const translateColor = (color = "#616161", alpha) => {
      // 16进制颜色值的正则
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      var color = color.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          var colorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "RGBA(" + colorChange.join(",") + "," + alpha + ")"; // `RGBA(${(colorChange.join(","), alpha)})`;
      } else {
        return color;
      }
    };
    // 将数组拆分
    const sliceArr = (arr = [], count = 1) => {
      let newList = [];
      let list = arr.slice(),
        listLength = list.length;
      for (let index = 0; index < listLength; index += count) {
        newList.push(list.slice(index, index + count));
      }
      return newList;
    };
    // 当前页发生变化
    const pageChange = (page)=>{
      console.log(page)
      currentPage.value = page;
      thisPageGames.value = totalGames.value[page-1]
    }
    console.log(translateColor("#fff", 0.5));
    return {
      totalGames, //所有比赛数据
      thisPageGames,//当前页展示的数据
      computedMoney, //根据输入金额计算收益金额
      showTextOrBg, //控制是否显示买入文字
      translateColor, //将16进制颜色变为rgba格式
      sliceArr, //拆分数组
      showTextPositon,
      randomColor,
      computedVar, //根据输入金额计算买入的钱数
      computedBuy, //根据输入计算买中的钱数
      computedEarn, //根据输入计算净利润
      computedHuiBao, //计算各种回报率
      pageSize,
      totalPage,
      pageChange,
      currentPage,
    };
  },
};
</script>

<style lang="scss" scoped>
$same_border_color: #eeeeee;
$same_column_height: 60px;
$same_height: $same_column_height * 2;
$same_1px_border: 1px solid $same_border_color;
$same_fff: #fff;
@mixin display_grid {
  display: grid;
  grid-template-columns: 60px 60px 160px 1fr 1fr;
  grid-template-rows: auto;
  align-items: center;
}
.home_page {
  // display: grid;
  // grid-template-rows: $same_column_height 80vh $same_column_height;
  background: $same_fff;
  border: 1px solid #dcdcdc;
  text-align: center;
  & > div:nth-child(2) {
    & > div:nth-child(1) {
      margin: 0;
    }
  }
  .page{
    margin: 20px;
  }
  .title {
    @include display_grid();
    height: $same_column_height;
    line-height: $same_column_height;
    grid-gap: 1px;
    font-weight: bolder;
    font-size: 18px;
    background: #dcdcdc;
    border-bottom:none ;
    span {
      height: 100%;
      background: $same_fff;
    }
  }
  .content {
    @include display_grid();
    grid-template-rows: minmax($same_height, auto);
    grid-gap: 1px;
    margin-top: 10px;
    font-size: 13px;
    // &:nth-child(odd) {
    //   background: $same_fff;
    // }
    // &:nth-child(even) {
    //   background: #dcdcdc;
    // }
    .red_span {
      span {
        background: red;
        color: $same_fff;
        cursor: pointer;
        padding: 2px 3px 1px;
        border-radius: 4px;
      }
    }
    div {
      width: 100%;
      height: 100%;
      color: #616161;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .border {
        box-shadow: 0px -1px $same_fff;
        background: $same_fff;
      }
    }
    .content_2 {
      color: #333333;
      .link_span {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 1px;
        a {
          border-right: 1px solid #616161;
        }
        & > a:last-child {
          border: none;
        }
      }
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
        width: 100%;
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
      // grid-gap: 10px;
      div {
        flex-direction: row;
        span {
          width: 100%;
        }
      }
      .content_4_div {
        display: grid;
        grid-template-columns: 2fr 1fr;
        & > div:nth-child(1) {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .position_span {
          font-size: 12px;
          color: #e91e63;
          font-weight: 300;
        }
      }
    }
  }
}
</style>

