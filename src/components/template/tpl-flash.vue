<template>
  <div class="ads flash">
    <div class="ad-style">
      <img src="../../assets/img/tplbj.png" alt="">
      <!-- flash要添加点击跳转，暂时修改到此， -->
      <div
        :class="{
        adPosition: true,
        left: confinfo.position === 'left',
        center: confinfo.position === 'center',
        right: confinfo.position === 'right',
        size150: confinfo.size === '150,150,f_size1',
        size210: confinfo.size === '210,90,f_size2'}">
        <object id="swf"
          @mouseup="flashLink()"
          classid="clsid27CDB6E-AE6D-11cf-96B8-444553540000"
          codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0"
          align="center">
          <param name="movie" :value="confinfo.flash_src">
          <param name="quality" value="high">
          <param name="wmode" value="transparent">
          <param name="Scale" value="showall">
          <embed :src="confinfo.flash_src" name="swf" align="center"
            quality="high"
            height="100%"
            width="100%"
            wmode="transparent"
            pluginspage="http://www.macromedia.com/go/getflashplayer"
            type="application/x-shockwave-flash" swliveconnect="true" play="true">
          </embed>
        </object>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        textarea: ''
      }
    },
    props: ['confinfo'],
    methods: {
      flashLink () {
        if (this.confinfo.flash_src) {
          var link = (/^http|https/).test(this.confinfo.flash_src) ? this.confinfo.flash_src : 'http://' + this.confinfo.flash_src
          window.open(link)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .flash{
    .ad-style{
      width: 100%
      height: 360px;
      position relative
      background-image url(../../assets/img/tplbj.png)
      background-position center
      background-repeat no-repeat
      background-size cover
      img{
       width 100%
      }
      .adPosition{
        position: absolute
        border: 1px solid #e4e4e4
        background: rgba(256,256,256,0.5)
        #swf{
          height 100%
          width 100%
        }
      }
      .size210{
        width: 150px
        height: 70px
      }
      .size150{
        width: 100px
        height: 100px
      }
      .center{
        top 0
        left 0
        bottom -70%
        right 0
        margin auto
      }
      .left{
        bottom 5%
        left 3%
      }
      .right{
        right 3%
        bottom 5%
      }
    }
  }
</style>
