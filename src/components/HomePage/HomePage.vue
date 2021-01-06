<template>
  <div class="home_page">
    <div class="title">
      <span>胜率</span>
      <span>名称</span>
      <span>场次/时间</span>
      <span class="tc_back_span">
        <span>体彩方案</span>
        <span>
          <el-input
            v-model="backMoney.tc_back_money"
            placeholder="输入体彩返利"
            size="mini"
          >
            <template #prefix>
              <div style="background: transparent; color: #ff9800">
                <i>返利</i>
              </div>
            </template>
            <template #suffix>
              <div style="background: transparent; color: #ff9800">
                <i>%</i>
              </div>
            </template>
          </el-input>
        </span>
      </span>
      <span class="tc_back_span hg_back_span">
        <span>皇冠方案</span>
        <span>
          <el-input
            v-model="backMoney.hg_back_money"
            placeholder="输入皇冠返利"
            size="mini"
          >
            <template #prefix>
              <div style="background: transparent; color: #ff9800">
                <i>返利</i>
              </div>
            </template>
            <template #suffix>
              <div style="background: transparent; color: #ff9800">
                <i>%</i>
              </div>
            </template>
          </el-input>
        </span>
      </span>
    </div>
    <div>
      <div class="content" v-for="(item, index) in thisPageGames" :key="index">
        <div
          class="content_total"
          v-for="(total, total_index) in item.total_tj"
          :key="total_index"
        >
          <div class="content_1">
            <div style="border: 1px solid #dcdcdc">
              <span style="display: flex; flex-direction: column">
                <span
                  >方案{{ currentPage * pageSize + index - pageSize + 1 }}-{{
                    total_index + 1
                  }}</span
                >
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
                  v-for="(i, n) in ele.tc_count"
                  :key="n"
                  :style="{
                    background: ele.alpha_color,
                    boxShadow: n == 0 && 'inset 5px 0 #616161,0 -1px #fff',
                    fontSize: '14px',
                  }"
                >
                  <span>
                    <!-- v-if="n != 0 && parseInt(ele.fixedodds) > 0" -->
                    <span
                      class="red_span"
                      v-if="
                        total.find(
                          (t) => t.tc_buy == '胜' || t.tc_buy == '让胜'
                        ) &&
                        total.map((t) => t.tc_pl).includes(ele[`tc_h_${n}`])
                      "
                    >
                      <span>买入</span>
                    </span>
                    {{ n == 0 ? "胜" : "让胜" }}:{{ ele[`tc_h_${n}`] }}
                  </span>
                  <span
                    >{{ n == 0 ? "平" : "让平" }}:{{ ele[`tc_d_${n}`] }}</span
                  >
                  <span>
                    <!-- v-if="n != 0 && parseInt(ele.fixedodds) < 0" -->
                    <span
                      class="red_span"
                      v-if="
                        total.find(
                          (t) => t.tc_buy == '负' || t.tc_buy == '让负'
                        ) &&
                        total.map((t) => t.tc_pl).includes(ele[`tc_a_${n}`])
                      "
                    >
                      <span>买入</span>
                    </span>
                    {{ n == 0 ? "负" : "让负" }}:{{ ele[`tc_a_${n}`] }}
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
                <!-- computedMoney(item).money  -->
                <span>{{ total.huoli }}元</span>
                <!-- computedEarn(item) -->
                <span>净利润:{{ total.jinglirun }}</span>
                <!-- computedHuiBao(item, 3) -->
                <span> 1手回报率:{{ 0 }}% </span>
                <span> 2手回报率:{{ 0 }}% </span>
                <span> 3手回报率:{{ total.total_index_33 }}% </span>
              </span>
            </div>
          </div>
          <div class="content_4">
            <div
              v-for="(ele, item_i) in item"
              :key="ele.id"
              :class="item_i === 1 && 'border'"
              :style="{
                flexDirection: 'column',
                height: '200px',
                fontSize: '14px',
              }"
            >
              <div v-for="(i, n) in ele.hg_count" :key="n" class="border">
                <div
                  class="content_4_div"
                  :style="{
                    background: ele.alpha_color,
                    boxShadow: n == 0 && 'inset 5px 0 #616161',
                    color: 'red',
                  }"
                >
                  <div>
                    <div>
                      <span style="text-align: right">
                        <!-- v-if="showTextOrBg(ele, n, 'h')" -->
                        <span
                          class="red_span"
                          v-if="showTotalTJ(total, ele, item, n, 'h').show"
                        >
                          <span>买入</span>
                        </span>
                      </span>
                      <span>
                        {{ n == 0 ? "胜" : "让胜" }}:{{
                          ele[`hg_h_${n}`] || "0.00"
                        }}
                      </span>
                      <span
                        class="position_span"
                        :style="{
                          visibility:
                            n != 0 && showTextPositon(ele, n).show == 'left'
                              ? ''
                              : 'hidden',
                        }"
                        >{{ showTextPositon(ele, n).text }}</span
                      >
                    </div>
                    <div v-if="n == 0">平:{{ ele[`hg_d_${n}`] }}</div>
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
                      <span>
                        {{ n == 0 ? "负" : "让负" }}:{{
                          ele[`hg_a_${n}`] || "0.00"
                        }}
                      </span>
                      <span style="text-align: left">
                        <!-- v-if="showTextOrBg(ele, n, 'a')" -->
                        <span
                          class="red_span"
                          v-if="showTotalTJ(total, ele, item, n, 'a').show"
                        >
                          <span>买入</span>
                        </span>
                      </span>
                    </div>
                  </div>
                  <div
                    v-if="
                      showTotalTJ(total, ele, item, n, 'h').show ||
                      showTotalTJ(total, ele, item, n, 'a').show
                    "
                  >
                    <!-- computedVar(item)[n] -->
                    <span>买入:{{ total[`total_mr_${item_i}`] }}元</span>
                    <!-- computedBuy(item)[n] total[item_i].total_mz -->
                    <span>买中{{ total[`total_mz_${item_i}`] }}元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-size="pageSize"
        :total="totalPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
  getCurrentInstance,
} from "vue";
import { getTotalGames } from "api/mainApi.js";
import { totalColors } from "assets/colors/color.js";
import { useRouter } from "vue-router";
import { ElLoading } from "element-plus";
import Switch from "element-plus/lib/el-switch";
export default {
  setup(props, ctx) {
    console.log("进入页面");
    const router = useRouter();
    const money = 1000; //默认输入的金额
    const pageSize = 10; //每页展示的条数
    let totalPage = ref(0); //总共有多少数据
    let totalGames = ref([]); //所有的比赛数据信息
    let thisPageGames = ref([]); //当前页的数据
    let currentPage = ref([1]); //默认在第一页
    let backMoney = reactive({ tc_back_money: 12, hg_back_money: 2.5 }); //设置返利信息
    let pageLoad = ElLoading.service({
      fullscreen: true,
      text: "努力计算中...请稍等...",
    });
    const synth = window.speechSynthesis;
    const msg = new SpeechSynthesisUtterance();
    const speakText = `发现目标!!`;
    const speakCount = 5; //重复朗读5次
    // 语音播放函数
    const speakFuc = (text) => {
      msg.text = text;
      msg.lang = "zh-CN";
      msg.volume = "1";
      msg.rate = 1;
      msg.pitch = 1;
      synth.cancel(msg);
      synth.speak(msg);
    };
    // 获取所有的比赛信息
    const getTotalGames_ = async () => {
      const { data } = await getTotalGames();
      if (data.code == 1) {
        router.replace("/");
        return;
      }
      pageLoad.close();
      data.data.forEach((item) => {
        item.bet_money = money;
        let randomColorList = [];
        item.forEach((ele, index) => {
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
          ele.hg_count = keys.map((k) => k.startsWith("hg_h")).filter(Boolean); //皇冠需要渲染的情况数组
          ele.tc_count = keys.map((k) => k.startsWith("tc_h")).filter(Boolean); //体彩需要渲染得情况情况数组
          ele.tj_count = keys
            .map((k) => k.startsWith("fangan") && ele[k])
            .filter(Boolean)
            .map((e) => JSON.parse(e)); //推荐方案需要渲染的情况数组

          ele.var = parseInt(ele.fixedodds) > 0 ? ele.hg_max_a : ele.hg_max_h; //变量1
          item.alpha_color = ele.alpha_color = translateColor(ele.color, 0.2);
          ele.tc_total_h = keys
            .map((k) => k.startsWith("tc_h") && Number(ele[k]))
            .filter(Boolean);
          ele.tc_total_a = keys
            .map((k) => k.startsWith("tc_a") && Number(ele[k]))
            .filter(Boolean);

          // console.log(keysH, Math.max(...keysH));
          // console.log(keysA, Math.max(...keysA));
        });

        // 整合推荐的每一项数据
        let item_0 = item[0].tj_count;
        let item_1 = item[1].tj_count;
        let total_tj = [];
        item_0.forEach((t0) => {
          item_1.forEach((t1) => {
            total_tj.push([t0, t1]);
          });
        });
        // console.log(total_tj)
        total_tj.forEach((total) => {
          computedTotalTJ(item, total); //加工数据
        });

        item.total_tj = total_tj.sort(
          (a, b) => b.total_index_33 - a.total_index_33
        );
        let total_index_3_list = total_tj.map((t) => Number(t.total_index_33));
        item.fuck = Math.max(...total_index_3_list);
      });
      data.data.sort((a, b) => b.fuck - a.fuck);
      console.log("比赛数据", data.data);
      let fuckList0 = data.data.filter((f) => f.fuck > 0),
        fuckList5 = data.data.filter((f) => f.fuck > -5),
        fuckList10 = data.data.filter((f) => f.fuck > -10); //每项最高的3手赔率数组
      fuckList10.length &&
        speakFuc(
          `3手收益率大于负10方案,共${fuckList10.length}条,大于负5方案${fuckList5.length}条,大于0方案${fuckList0.length}条`
        );

      console.log(fuckList);
      totalPage.value = data.data.length; //总数据
      let pageData = sliceArr(data.data, pageSize);
      totalGames.value = pageData;
      thisPageGames.value = pageData[0]; //默认显示第一页
    };

    getTotalGames_();
    const timer = setInterval(() => {
      console.log("更新数据...........");
      getTotalGames_();
    }, 1 * 60 * 1000);
    // setInterval(() => {
    //   speakFuc(speakText);
    // }, 5 * 1000);
    onMounted(() => {
      console.log("程序挂载结束");
    });
    onUnmounted(() => {
      console.log("程序卸载成功");
    });
    watchEffect(() => {
      thisPageGames.value.forEach((item) => {
        item.total_tj.forEach((total) => {
          computedTotalTJ(item, total);
        });
      });
    });
    // 根据输入金额计算毛获利
    const computedMoney = (item) => {
      const [num1, num2] = item.map((ele) => {
        return parseInt(ele.fixedodds) > 0 ? ele.tc_h_1 : ele.tc_a_1;
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
    // 判断是否显示买入图标 或者计算买入 买中金额
    /* 
      total-->item项里属性total_tj 里的每一项  都是长度为2的数组
      ele-->item里的每一项 是的对象
      item-->最初始数据里的每一项 即为上面2个参数用到的item
      n-->传递 过来的索引
      key-->自定义 有h a 两种 用来判断是体彩还是皇冠  h为皇冠 a为体彩
    */
    const showTotalTJ = (total, ele, item, n, key) => {
      let textH = total.find(
          (t) => (t.hg_buy == "胜" || t.hg_buy == "让胜") && t.hg == n
        ),
        textA = total.find(
          (t) => (t.hg_buy == "负" || t.hg_buy == "让负") && t.hg == n
        ),
        valueH = total.map((t) => t.hg_pl).includes(ele[`hg_h_${n}`]),
        valueA = total.map((t) => t.hg_pl).includes(ele[`hg_a_${n}`]);
      let checkValue = key === "h" ? valueH : valueA,
        checkText = key === "h" ? textH : textA;
      return {
        show: checkText && checkValue,
      };
    };
    // 所有情况体彩的获利奖金 毛利率
    const totalComputedMoney = (item, total) => {
      let bet_money = computedBetMoney(item).yj;
      return (bet_money * total.total_tc_pl).toFixed(2);
    };
    // 所有情况组合的净利润
    const totalComputedEarn = (item, total) => {
      // let bet_money = isNaN(Number(item.bet_money))
      //   ? 0
      //   : Number(item.bet_money); //投注金额
      let bet_money = computedBetMoney(item).zk; //体彩投注金额
      let money = totalComputedMoney(item, total), //获利
        benjin = total.total_money; //获利
      return (money - bet_money - benjin).toFixed(2);
    };
    // 判断显示倍率文字显示左边还是右边
    const showTextPositon = (ele, n) => {
      let text = ele[`hg_fixedodds_${n}`] || "0",
        newText = text.includes("受") ? text.substring(1) : text;
      return {
        show: text && text.includes("受") ? "right" : "left",
        text: newText,
      };
    };
    // 体彩投注的金额
    /* 
      item 每一个方案的数据
      type true 表示需要按返利计算, false表示不需要返利计算 默认计算返利
    */
    const computedBetMoney = (item) => {
      const { tc_back_money = 0 } = backMoney; //获取设置的体彩 皇冠返数据
      return {
        yj: isNaN(Number(item.bet_money)) ? 0 : Number(item.bet_money),
        zk: isNaN(Number(item.bet_money))
          ? 0
          : Number(item.bet_money * (1 - tc_back_money / 100)),
      };
    };
    /* 
      将所有组合数据进行预处理 
    */
    const computedTotalTJ = (item, total) => {
      const { tc_back_money = 0, hg_back_money = 0 } = backMoney; //获取设置的体彩 皇冠返数据
      const { zk: money, yj } = computedBetMoney(item);
      total.forEach((t, ti) => {
        let mr0 = money / (total[0].hg_pl - 1), //1手买入
          mz0 =
            mr0 * (total[0].hg_pl - 1) - money + (mr0 * hg_back_money) / 100; //1手买中需要加上皇冠返利

        let mr1 = (money + mr0 - mz0) / (total[1].hg_pl - 1), //2手买入
          mz1 = (mr1 * hg_back_money) / 100; //2手买中

        let mrMoney = ti == 0 ? mr0 : mr1, //需要买入
          mzMoney = ti == 0 ? mz0 : mz1; //买中
        // console.log("找到所有组合的某一项", mrMoney, total);
        total[`total_mr_${ti}`] = mrMoney.toFixed(2);
        t.total_mr = mrMoney.toFixed(2);
        total[`total_mz_${ti}`] = mzMoney.toFixed(2);
        total.total_tc_pl = total.reduce((tt, pre) => {
          return (tt * pre.tc_pl).toFixed(2);
        }, 1); //每一项体彩的赔率乘积
        // t.total_tc_pl = total.reduce((tt, pre) => {
        //   return (tt * pre.tc_pl).toFixed(2);
        // }, 1);
        total.total_money =
          total.reduce((tt, pre) => {
            return tt + Number(pre.total_mr);
          }, 0) -
          (mz0 + mz1);
        // t.total_money =
        //   total.reduce((tt, pre) => {
        //     return tt + Number(pre.total_mr);
        //   }, 0) + money;
      });
      total.huoli = totalComputedMoney(item, total); //获利
      total.jinglirun = totalComputedEarn(item, total); //净利润
      total.total_index_33 = (
        (total.jinglirun / (total.total_money + yj)) *
        100
      ).toFixed(2);
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
    const pageChange = (page) => {
      console.log(page);
      currentPage.value = page;
      thisPageGames.value = totalGames.value[page - 1];
    };
    console.log(translateColor("#fff", 0.5));
    return {
      totalGames, //所有比赛数据
      thisPageGames, //当前页展示的数据
      computedMoney, //根据输入金额计算收益金额
      showTextOrBg, //控制是否显示买入文字
      translateColor, //将16进制颜色变为rgba格式
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
      showTotalTJ, //判断是否显示所有情况 买入图标
      backMoney, //体彩 皇冠返利设置
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
  .page {
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
    border-bottom: none;
    span {
      height: 100%;
      background: $same_fff;
    }
    .tc_back_span {
      display: flex;
      justify-content: space-around;
      :deep .el-input__inner {
        color: #ff9800;
        text-align: center;
      }
    }
  }
  .content {
    .content_total {
      @include display_grid();
      grid-template-rows: minmax($same_height, auto);
      grid-gap: 1px;
      margin-top: 10px;
      font-size: 13px;
    }
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
          grid-template-rows: 2fr 3fr 3fr;
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
        background: #fdf6ec;
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
        // & > div:nth-child(1) {
        //   display: grid;
        //   grid-template-columns: 1fr 1fr;
        // }
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

