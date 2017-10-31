<template>
  <div class="ads images">
    <div class="ad-style">
      <!--<img src="../../assets/img/tplbj.png" alt="">-->
      <div
        :class="{
        adPosition: true,
        left: confinfo.position === 'left',
        center: confinfo.position === 'center',
        right: confinfo.position === 'right',
        myScale: confinfo.effect === 'effect1',
        myMoveLL: confinfo.effect === 'effect2' && confinfo.position === 'left',
        myMoveLR: confinfo.effect === 'effect2' && confinfo.position === 'right',
        myMoveLC: confinfo.effect === 'effect2' && confinfo.position === 'center',
        size380: confinfo.size === '380,200,i_size1',
        size300: confinfo.size === '300,300,i_size2',
        size500: confinfo.size === '500,100,i_size3'
        }"
        :style="{background: 'url('+confinfo.image_src+') no-repeat center center', backgroundSize: 'contain'}">
          <a v-if="confinfo.out_url" class="img_link" :href="(/^http|https/).test(confinfo.out_url) ? confinfo.out_url : 'http://' +　confinfo.out_url" target="view_window"></a></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  props: ['confinfo']
}
</script>

<style lang="stylus" scoped type="text/stylus">
  .images{
    .ad-style{
      width: 100%
      height: 360px;
      position relative
      overflow hidden
      background-image url(../../assets/img/tplbj.png)
      background-position center
      background-repeat no-repeat
      background-size cover
      img{
       width 100%
      }
    }
    .adPosition{
      position: absolute
      bottom 5%
      border: 1px solid #e4e4e4
      background: rgba(256,256,256,0.5)
    }
    .myScale{
      transform: scale(0)
      animation: myfirst 10s linear 1s infinite;
    }
    @keyframes myfirst{
      0% {transform: scale(0);}
      2% {transform: scale(0)}
      5% {transform: scale(1)}
      95% {transform: scale(1)}
      98% {transform: scale(0)}
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

    .size300{
      width: 100px
      height: 66px
    }
    .size380{
      width: 125px
      height: 66px
    }
    .size500{
      width 166px
      height 33px
    }
    .center{
      left 42%
    }
    .left{
      left 3%
    }
    .right{
      left 77%
    }
    .img_link{
      height 100%
      width 100%
      display block
      position absolute
      top 0
      left 0
    }
  }
</style>
