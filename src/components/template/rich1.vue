<template>
  <div class="vca-rich2">
    <!-- 提示 -->
    <div :class="{
      vcaRich2Tips: true,
      myMoveLL: confinfo.prompt_info.type === 'prompt2'}">
      <div class="tipsImg" v-if="confinfo.prompt_info.type === 'prompt1'">
        <div :class="{images: true, myScale: confinfo.prompt_info.effect === 'effect1'}" :style="{background: 'url('+confinfo.prompt_info.content[0].info_con+') no-repeat center center', backgroundSize: 'contain'}"></div>
      </div>
      <div class="tipsTextImg" v-else-if="confinfo.prompt_info.type === 'prompt2'">
        <div class="circular" :style="{background: 'url('+confinfo.prompt_info.content[0].info_con+') no-repeat center center', backgroundSize: 'cover'}"></div>
        <div class="info">
          <p>{{confinfo.prompt_info.content[1].info_con}}</p>
        </div>
      </div>
    </div>
    <!-- 右模版 -->
    <div class="vca-rich2-main">
      <div class="vca-rich2-head">
        <div class="vca-rich2-head-img" :style="{background: 'url('+confinfo.relation_info.content[0].info_con+') no-repeat center center', backgroundSize: 'cover'}"></div>
        <div class="vca-rich2-head-introduce">
          <h4 class="vca-textline1">{{confinfo.relation_info.content[1].info_con}}</h4>
          <p class="vca-textline1">{{confinfo.relation_info.content[2].info_con}}</p>
        </div>
      </div>
      <div class="vca-rich2-text" >
        <p class="vca-textline3">{{confinfo.relation_info.content[3].info_con}}</p>
      </div>
      <div class="vca-rich2-content">
        <div class="vca-rich2-imgs" :style="{background: 'url('+confinfo.relation_info.content[4].info_con+') no-repeat center center', backgroundSize: 'cover'}">
          <p>
            <span>{{confinfo.relation_info.content[5].info_con}}</span>
            <a v-if="confinfo.relation_info.content[6].info_con" :href="(/^http|https/).test(confinfo.relation_info.content[6].info_con) ? confinfo.relation_info.content[6].info_con : 'http://' +　confinfo.relation_info.content[6].info_con"" target="view_window"></a>
          </p>
        </div>
        <div class="vca-rich2-imgs" :style="{background: 'url('+confinfo.relation_info.content[7].info_con+') no-repeat center center', backgroundSize: 'cover'}">
          <p>
            <span>{{confinfo.relation_info.content[8].info_con}}</span>
            <a v-if="confinfo.relation_info.content[9].info_con" :href="(/^http|https/).test(confinfo.relation_info.content[9].info_con) ? confinfo.relation_info.content[9].info_con : 'http://' +　confinfo.relation_info.content[9].info_con"" target="view_window"></a>
          </p>
        </div>
        <div class="vca-rich2-imgs" :style="{background: 'url('+confinfo.relation_info.content[10].info_con+') no-repeat center center', backgroundSize: 'cover'}">
          <p>
            <span>{{confinfo.relation_info.content[11].info_con}}</span>
            <a v-if="confinfo.relation_info.content[12].info_con" :href="(/^http|https/).test(confinfo.relation_info.content[12].info_con) ? confinfo.relation_info.content[12].info_con : 'http://' +　confinfo.relation_info.content[12].info_con"" target="view_window"></a>
          </p>
        </div>
        <div class="vca-rich2-imgs" :style="{background: 'url('+confinfo.relation_info.content[13].info_con+') no-repeat center center', backgroundSize: 'cover'}">
          <p>
            <span>{{confinfo.relation_info.content[14].info_con}}</span>
            <a v-if="confinfo.relation_info.content[15].info_con" :href="(/^http|https/).test(confinfo.relation_info.content[15].info_con) ? confinfo.relation_info.content[15].info_con : 'http://' +　confinfo.relation_info.content[15].info_con" target="view_window"></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['confinfo']
}
</script>

<style lang="stylus" scoped type="text/stylus">
.vca-rich2 {
  position: relative;
  width: 100%;
  height: 365px;
  overflow: hidden;
  background: url('../../assets/img/tplbj.png') no-repeat center center;
  background-size: cover;
  color: #ffffff;
  font-size: 12px;

  .vcaRich2Tips {
    position: absolute;
    left: 20px;
    bottom: 20px;

    .select-self {
      width: 100%;
    }

    .tipsImg {
      .images {
        height: 63px;
        width: 147px;
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
  .myScale {
    transform: scale(0);
    animation: myfirst 10s linear 1s infinite;
  }

  @keyframes myfirst {
    0% {
      transform: scale(0);
    }

    3% {
      transform: scale(1);
    }

    97% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  .myMoveLL {
    left: 100%;
    animation: mysecond 10s linear infinite;
  }

  @keyframes mysecond {
    0% {
      left: 100%;
    }

    3% {
      left: 3%;
    }

    90% {
      left: 3%;
    }

    95% {
      left: -50%;
    }

    100% {
      left: -50%;
    }
  }

  /* 剩下两个动画暂没用 */
  .myMoveLC {
    left: 100%;
    animation: mythree 10s linear infinite;
  }

  @keyframes mythree {
    0% {
      left: 100%;
    }

    3% {
      left: 42%;
    }

    90% {
      left: 42%;
    }

    95% {
      left: -50%;
    }

    100% {
      left: -50%;
    }
  }

  .myMoveLR {
    left: 100%;
    animation: myfour 10s linear infinite;
  }

  @keyframes myfour {
    0% {
      left: 100%;
    }

    3% {
      left: 77%;
    }

    90% {
      left: 77%;
    }

    95% {
      left: -50%;
    }

    100% {
      left: -50%;
    }
  }
}

.vca-rich2-main {
  height: 90%;
  width: 25%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 0;
  margin-top: 2.5%;

  .vca-textline1 {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
  }

  .vca-textline2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .vca-textline3 {
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}

.vca-rich2-main .vca-rich2-head {
  width: calc(100% - 20px);
  min-height: 0;
  margin: 10px 10px 0;
}

.vca-rich2-main .vca-rich2-head .vca-rich2-head-img {
  display: inline-block;
  width: 30%;
  height: 0;
  padding-bottom: 30%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  background: #ccc;
}

.vca-rich2-main .vca-rich2-head .vca-rich2-head-introduce {
  display: inline-block;
  width: 65%;
  overflow: hidden;
  float: right;
}

.vca-rich2-main .vca-rich2-head .vca-rich2-head-introduce h4 {
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: 2;
}

.vca-rich2-main .vca-rich2-head .vca-rich2-head-introduce p {
  width: 100%;
  margin: 0;
  padding: 0;
  line-height: 1;
}

.vca-rich2-main .vca-rich2-text {
  width: calc(100% - 20px);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 6px;
  margin: 6px 10px 0;
  background: rgba(255, 255, 255, 0.3);
  color: #eeeeee;
}

.vca-rich2-main .vca-rich2-text p {
  padding: 0;
  margin: 0;
  height: 50px;
  line-height: 1.4;
}

.vca-rich2-main .vca-rich2-content {
  width: calc(100% - 10px);
  height: 60%;
  margin: 10px 0 0 10px;
}

.vca-rich2-main .vca-rich2-content .vca-rich2-imgs {
  width: calc(50% - 10px);
  height: calc(50% - 10px);
  background: rgba(255, 255, 255, 0.3);
  float: left;
  margin: 0 10px 10px 0;
  position: relative;
  overflow: hidden;
}

.vca-rich2-main .vca-rich2-content .vca-rich2-imgs:hover p {
  top: 0;
}

.vca-rich2-main .vca-rich2-content .vca-rich2-imgs p {
  width: 100%;
  height: 100%;
  margin: 0;
  position: absolute;
  top: -100%;
  background: rgba(0, 0, 0, 0.5);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  display: table;
  transition: top 0.3s;
  -moz-transition: top 0.3s;
  -webkit-transition: top 0.3s;
  -o-transition: top 0.3s;
}

.vca-rich2-main .vca-rich2-content .vca-rich2-imgs p span {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.vca-rich2-main .vca-rich2-content .vca-rich2-imgs p a {
  position: absolute;
  height: 100%;
  width: 100%;
  display: block;
  top: 0;
  left: 0;
}
</style>
