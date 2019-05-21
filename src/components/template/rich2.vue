<template>
  <div class="vca-rich1">
    <!-- 提示 -->
    <div :class="{
      vcaRich1Tips: true,
      myMoveLL: confinfo.prompt_info.type === 'prompt2'}">
      <div class="tipsImg" v-if="confinfo.prompt_info.type === 'prompt1'">
        <div :class="{
          images: true,
          myScale: confinfo.prompt_info.effect === 'effect1'}"
          :style="{background: 'url('+confinfo.prompt_info.content[0].info_con+') no-repeat center center', backgroundSize: 'cover'}"></div>
      </div>
      <div class="tipsTextImg" v-else-if="confinfo.prompt_info.type === 'prompt2'">
        <div class="circular" :style="{background: 'url('+confinfo.prompt_info.content[0].info_con+') no-repeat center center', backgroundSize: 'contain'}"></div>
        <div class="info">
          <p>{{confinfo.prompt_info.content[1].info_con}}</p>
        </div>
      </div>
    </div>
    <!-- 右边模版 -->
    <div class="vca-rich1-main">
      <div class="vca-rich1-img" :style="{background: 'url('+confinfo.relation_info.content[0].info_con+') no-repeat center center', backgroundSize: 'cover'}"></div>
      <p class="vca-rich1-title vca-textline2">{{confinfo.relation_info.content[1].info_con}}</p>
      <p class="vca-rich1-price">{{confinfo.relation_info.content[2].info_con}}</p>
      <p class="vca-rich1-stock">{{confinfo.relation_info.content[3].info_con}}</p>
      <p class="vca-rich1-buy">
        <span class="vca-rich1-buyprompt">扫码加入购物车</span>
        <span class="vca-rich1-buyqrcode" :style="{background: 'url('+confinfo.relation_info.content[4].info_con+') no-repeat center center', backgroundSize: 'cover'}"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['confinfo'],
  methods: {
  }
}
</script>

<style lang="stylus" type="text/stylus">
.vca-rich1 {
  position: relative;
  width: 100%;
  height: 365px;
  color: #ffffff;
  font-size: 12px;
  background: url(../../assets/img/tplbj.png) no-repeat center center;
  background-size cover
  overflow hidden
  .vcaRich1Tips {
    position: absolute;
    left: 20px;
    bottom: 20px;

    .select-self {
      width: 100%;
    }

    .tipsImg {
      .images {
        height: 100px;
        width: 100px;
        background: #ccc;
        border: 1px solid #f2f2f2;
      }
    }

    .tipsTextImg {
      height: 60px;
      width: 170px;
    }

    .circular {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #fff;
      position: absolute;
      z-index: 1;
      text-align: center;
      line-height: 20px;
      cursor: pointer;
      overflow: hidden;

      div, img {
        height: 100%;
        width: 100%;
      }
    }

    .info {
      min-width: 100px;
      position: absolute;
      left: 55px;
      top: 16px;
      height: 24px;
      line-height: 24px;
      border-radius: 4px;
      overflow: hidden;

      p {
        height: 100%;
        padding-left: 4px;
        color: #222;
        background: #fff;
      }
    }
  }

  /* tips动画效果 */
  .myScale{
    transform: scale(0)
    animation: myfirst 10s linear 1s infinite;
  }
  @keyframes myfirst{
    0% {transform: scale(0);}
    3% {transform: scale(1)}
    97% {transform: scale(1)}
    100% {transform: scale(0);}
  }

  .myMoveLL{
    left: 100%
    animation: mysecond 10s linear infinite ;
  }
  @keyframes mysecond{
    0% {left: 100%;}
    3% {left: 3%}
    90% {left: 3%;}
    95% {left: -50%;}
    100% {left: -50%;}
  }

  /* 剩下两个动画暂没用 */
  .myMoveLC{
    left: 100%
    animation: mythree 10s linear infinite ;
  }
  @keyframes mythree{
    0% {left: 100%;}
    3% {left: 42%}
    90% {left: 42%;}
    95% {left: -50%;}
    100% {left: -50%;}
  }

  .myMoveLR{
    left: 100%
    animation: myfour 10s linear infinite ;
  }
  @keyframes myfour{
    0% {left: 100%;}
    3% {left: 77%}
    90% {left: 77%;}
    95% {left: -50%;}
    100% {left: -50%;}
  }
}

.vca-rich1-main {
  height: 100%;
  width: 25%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  .vca-textline2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}

.vca-rich1-main p {
  width: calc(100% - 20px);
  margin: 10px 10px 0;
}

.vca-rich1-main .vca-rich1-img {
  width: calc(100% - 20px);
  height: 46%;
  margin: 10px 10px 0;
  background: #cccccc;
}

.vca-rich1-main .vca-rich1-title {
  font-size: 13px;
  height 28px
}

.vca-rich1-main .vca-rich1-price {
  font-size: 20px;
}

.vca-rich1-main .vca-rich1-stock {
  font-size: 10px;
}

.vca-rich1-main .vca-rich1-buy .vca-rich1-buyprompt {
  display: inline-block;
  padding: 0px;
  background: #fcab26;
  font-size: 10px;
  float: left;
}

.vca-rich1-main .vca-rich1-buy .vca-rich1-buyqrcode {
  display: inline-block;
  width: 45px;
  height: 45px;
  background: #ffffff;
  float: right;
}
</style>

