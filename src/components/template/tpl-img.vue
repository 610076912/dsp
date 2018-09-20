<template>
  <div class="ads images">
    <div class="ad-style">
      <img src="../../assets/img/tplbj.png" alt="">

      <!-- 折线动画效果 -->
      <span class="vca-round" v-if="confinfo.effect === 'effect3'"></span>
      <span class="vca-line" v-if="confinfo.effect === 'effect3'"></span>

      <!-- 缩放滑动效果 -->
      <!-- effect是指定动画类型，effect1是缩放，effect2是飘过，effect3是折线，effect4是从上到下，effect5从下到上 -->
      <div
        :class="{
          adPosition: true,
          left: confinfo.position === 'left',
          center: confinfo.position === 'center',
          right: confinfo.position === 'right',
          myScale: confinfo.effect === 'effect1',
          ScaleLine: confinfo.effect === 'effect3',
          myMoveLL: confinfo.effect === 'effect2' && confinfo.position === 'left',
          myMoveLR: confinfo.effect === 'effect2' && confinfo.position === 'right',
          myMoveLC: confinfo.effect === 'effect2' && confinfo.position === 'center',
          myMoveDown: confinfo.effect === 'effect4',
          myMoveUp: confinfo.effect === 'effect5',
        }"
        :style="{background: 'url('+confinfo.image_src+') no-repeat center center',
          backgroundSize: 'contain',
          width: imgWidth,
          height: imgHeight}">
          <a v-if="confinfo.out_url" class="img_link" :href="(/^http|https/).test(confinfo.out_url) ? confinfo.out_url : 'http://' +　confinfo.out_url" target="view_window"></a></div>
    </div>
  </div>
</template>

<script>
// brokenLine 折线效果
// @param opt
// @opt {
//   elRound: 效果圆元素 必选,
//   elLine: 效果折线元素 必选,
//   startX: 效果开始点X 必选,
//   startY: 效果开始点y 必选,
//   endX: 效果结束点X 必选,
//   endY: 效果结束点Y 必选,
//   lineLength: 折线横向线段的长短 可选 默认40 int,
//   way: 效果方向 可选（'auto'|'left'|'right'）默认auto string
// }
// @param fn 效果结束时回调
function brokenLine (opt, fn) {
  var init = { lineLength: 40, way: 'auto' }
  if (!opt.elRound || !opt.elLine || !opt.startX || !opt.startY || !opt.endX || !opt.endY) { console.warn('Incomplete options in brokenLine') }

  opt.lineLength = opt.lineLength || init.lineLength
  opt.way = opt.way || init.way

  // debugger
  // 圆的位置
  opt.elRound.style.left = opt.startX - 5 + 'px'
  opt.elRound.style.top = opt.startY - 5 + 'px'

  // 计算斜边长
  var diagonal = Math.sqrt(
    Math.pow(opt.endX - opt.startX - opt.lineLength, 2) +
    Math.pow(opt.endY - opt.startY, 2)
  )

  // 计算角度
  var angle = Math.atan((opt.endY - opt.startY) / (opt.endX - opt.startX - opt.lineLength)) / (2 * Math.PI) * 360
  angle = Math.abs(angle)

  // 折线初始位置
  opt.elLine.style.left = opt.startX + 'px'
  opt.elLine.style.top = opt.startY + 'px'

  let stl = document.createElement('style')
  stl.className = 'imgeffect3'
  document.head.appendChild(stl)
  stl.innerHTML =
    '.' +
    opt.elLine.className +
    ':after{-webkit-transform: rotate(' +
    angle +
    'deg);' +
    '-moz-transform: rotate(' +
    angle +
    'deg);' +
    '-ms-transform: rotate(' +
    angle +
    'deg);' +
    '-o-transform: rotate(' +
    angle +
    'deg);' +
    'transform: rotate(' +
    angle +
    'deg);} '

  // 判断折线方向
  if (opt.way === 'auto') {
    if (opt.endX < opt.startX + opt.lineLength) {
      opt.way = 'left'
    } else {
      opt.way = 'right'
    }
  }
  if (opt.way === 'left') {
    stl.innerHTML =
      stl.innerHTML +
      '.vca-line{transform:rotateY(180deg);' +
      '-ms-transform:rotateY(180deg);' +
      '-moz-transform:rotateY(180deg);' +
      '-webkit-transform:rotateY(180deg);' +
      '-o-transform:rotateY(180deg);}'
  }

  // 开始动画
  setTimeout(function () {
    stl.innerHTML =
      stl.innerHTML +
      '.ad-style .' +
      opt.elLine.className +
      ':before{width: ' +
      opt.lineLength +
      'px;} .ad-style .' +
      opt.elLine.className +
      ':after{width: ' +
      diagonal +
      'px;}'
    opt.elRound.style.display = 'inline-block'
  }, 16)

  // 结束动画
  setTimeout(function () {
    opt.elLine.style.left = opt.endX - opt.lineLength + 'px'
    opt.elLine.style.top = opt.endY + 'px'
    stl.innerHTML =
      stl.innerHTML +
      '.ad-style .' +
      opt.elLine.className +
      ':before{width: 0px; margin-left: ' +
      opt.lineLength +
      'px;} .ad-style .' +
      opt.elLine.className +
      ':after{width: 0;}'
    opt.elRound.style.display = 'none'
    fn()
  }, 600)

  setTimeout(function () {
    document.head.removeChild(stl)
    opt.elLine.style.top = 50 + 'px'
    opt.elLine.style.left = 180 + 'px'
  }, 1500)
}

/**
 * 计算获取需要的点的位置
 */
function computeLocation (position, imgSize) {
  var tplW = 550
  var tplH = 360

  // 计算图片中心点 图片size是按照1920*1080分辨率确定的，所以要依据1920计算比例
  var imgRatio = (tplW / 1920).toFixed(2)
  var imgW = imgSize.split(',')[0] * imgRatio * 2
  var imgH = imgSize.split(',')[1] * imgRatio * 2
  var imgCenterX
  var imgCenterY = tplH - imgH / 2 - 20
  switch (position) {
    case 'left':
      imgCenterX = imgW / 2 + 20
      break
    case 'center':
      imgCenterX = tplW / 2
      break
    case 'right':
      imgCenterX = tplW - imgW / 2 + 20
      break
  }
  return {
    startX: 180,
    startY: 50,
    endX: imgCenterX,
    endY: imgCenterY
  }
}

export default {
  data () {
    return {
      data: '',
      timer: null
    }
  },
  props: ['confinfo'],
  computed: {
    imgWidth () {
      return this.confinfo.size.split(',')[0] * 0.3 + 'px'
    },
    imgHeight () {
      return this.confinfo.size.split(',')[1] * 0.3 + 'px'
    }
  },
  mounted () {
    // 调用计算中心点
    if (this.confinfo.effect === 'effect3') {
      var ooo = computeLocation(this.confinfo.position, this.confinfo.size)
      ooo.elRound = document.getElementsByClassName('vca-round')[0]
      ooo.elLine = document.getElementsByClassName('vca-line')[0]

      this.timer = setInterval(function () {
        brokenLine(ooo, () => {

        })
      }, 5000)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    if (document.getElementsByClassName('imgeffect3').length !== 0) {
      document.head.removeChild(document.getElementsByClassName('imgeffect3')[0])
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus" scoped>
/* 折线效果 */
.vca-round {
  display: none;
  width: 10px;
  height: 10px;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.85);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  animation: vcaRound 0.5s linear;
  -moz-animation: vcaRound 0.5s linear;
  -webkit-animation: vcaRound 0.5s linear;
  -o-animation: vcaRound 0.5s linear;
}

.vca-round::before {
  content: '';
  width: 10px;
  height: 10px;
  border-left: 1px solid rgba(255, 255, 255, 0.85);
  -webkit-border-radius: 100% 0 0 0;
  -moz-border-radius: 100% 0 0 0;
  border-radius: 100% 0 0 0;
  position: absolute;
  left: -5px;
  top: -5px;
}

.vca-round::after {
  content: '';
  width: 10px;
  height: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.85);
  -webkit-border-radius: 0 0 100% 0;
  -moz-border-radius: 0 0 100% 0;
  border-radius: 0 0 100% 0;
  position: absolute;
  left: 5px;
  top: 5px;
}

@keyframes vcaRound {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(720deg);
    -moz-transform: rotate(720deg);
    -ms-transform: rotate(720deg);
    -o-transform: rotate(720deg);
    transform: rotate(720deg);
  }
}

@keyframes vcaRound {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(720deg);
    -moz-transform: rotate(720deg);
    -ms-transform: rotate(720deg);
    -o-transform: rotate(720deg);
    transform: rotate(720deg);
  }
}

@keyframes vcaRound {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(720deg);
    -moz-transform: rotate(720deg);
    -ms-transform: rotate(720deg);
    -o-transform: rotate(720deg);
    transform: rotate(720deg);
  }
}

@keyframes vcaRound {
  from {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1080deg);
    -moz-transform: rotate(1080deg);
    -ms-transform: rotate(1080deg);
    -o-transform: rotate(1080deg);
    transform: rotate(1080deg);
  }
}

.vca-line {
  position: absolute;
  transform-origin: left top;
  -ms-transform-origin: left top;
  -webkit-transform-origin: left top;
  -moz-transform-origin: left top;
  -o-transform-origin: left top;
  transition: left 0.4s 0.1s, top 0.4s 0.1s;
  -moz-transition: left 0.4s 0.1s, top 0.4s 0.1s;
  -webkit-transition: left 0.4s 0.1s, top 0.4s 0.1s;
  -o-transition: left 0.4s 0.1s, top 0.4s 0.1s;
}

.vca-line::before {
  display: inline-block;
  width: 0;
  height: 0;
  content: '';
  border-top: 1px solid rgba(255, 255, 255, 0.85);
  margin-left: 0;
  float: left;
  transition: all 0.1s;
  -moz-transition: all 0.1s;
  -webkit-transition: all 0.1s;
  -o-transition: all 0.1s;
}

.vca-line::after {
  display: inline-block;
  width: 0;
  height: 0;
  content: '';
  border-bottom: 1px solid rgba(255, 255, 255, 0.85);
  float: left;
  position: absolute;
  transform-origin: left top;
  -ms-transform-origin: left top;
  -webkit-transform-origin: left top;
  -moz-transform-origin: left top;
  -o-transform-origin: left top;
  transition: width 0.4s 0.1s;
  -moz-transition: width 0.4s 0.1s;
  -webkit-transition: width 0.4s 0.1s;
  -o-transition: width 0.4s 0.1s;
}

.images {
  height: 100%;

  .ad-style {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .adPosition {
    position: absolute;
    bottom: 5%;
    border: 1px solid #e4e4e4;
    background: rgba(256, 256, 256, 0.5);
  }

  .ScaleLine {
    animation: myscale 5s linear infinite;
  }
  @keyframes myscale {
    0% {
      transform: scale(0);
    }

    8% {
      transform: scale(1);
    }

    92% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }

  .ad-style .myScale {
    transform: scale(0);
    animation: myfirst 10s linear infinite;
  }

  @keyframes myfirst {
    0% {
      transform: scale(0);
    }

    2% {
      transform: scale(0);
    }

    5% {
      transform: scale(1);
    }

    95% {
      transform: scale(1);
    }

    98% {
      transform: scale(0);
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

  .myMoveLC {
    left: 100%;
    animation: mythree 10s linear infinite;
  }

  @keyframes mythree {
    0% {
      left: 100%;
    }

    3% {
      left: 40%;
    }

    90% {
      left: 40%;
    }

    95% {
      left: -50%;
    }

    100% {
      left: -50%;
    }
  }

  .myMoveLR {
    animation: myfour 10s linear infinite;
  }

  @keyframes myfour {
    0% {
      right: -35%;
    }

    3% {
      right: 3%;
    }

    92% {
      right: 3%;
    }

    96% {
      right: 130%;
    }

    100% {
      right: 130%;
    }
  }

  .myMoveDown {
    animation: myfive 10s linear infinite;
  }

  @keyframes myfive {
    0% {
      bottom: 130%;
    }

    4% {
      bottom: 3%;
    }

    97% {
      bottom: 3%;
    }

    100% {
      bottom: -30%;
    }
  }

  .myMoveUp {
    animation: mysix 10s linear infinite;
  }

  @keyframes mysix {
    0% {
      bottom: -30%;
    }

    3% {
      bottom: 3%;
    }

    96% {
      bottom: 3%;
    }

    100% {
      bottom: 130%;
    }
  }

  .center {
    left: 38%;
  }

  .left {
    left: 3%;
  }

  .right {
    right: 3%;
  }

  .img_link {
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
