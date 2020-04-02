<template>
  <div class="ulikecam">
    <div class="section_common section_top">
      <img src="../assets/ulikecam/bg_img_1.jpg" alt />
      <div class="logo"></div>
      <p class="title">
        <span>剪映 轻而易剪 全能免费抖音官方剪辑工具 帮你剪出美好生活</span>
      </p>
      <div class="btn_wrap" id="btn_wrap" href="javascript:void(0)">
        <a class="qrcode_wrap qrcode_interact"></a>
        <a class="appstore_wrap"></a>
        <a class="android_wrap"></a>
      </div>
    </div>
    <div class="section_common">
      <img src="../assets/ulikecam/bg_img_2.jpg" alt />
    </div>
    <div class="section_common">
      <img src="../assets/ulikecam/bg_img_3.jpg" alt />
    </div>
    <div class="section_common">
      <img src="../assets/ulikecam/bg_img_4.jpg" alt />
    </div>
    <div class="section_common section_footer">
      <p class="desc">©️ 2018 深圳市脸萌科技有限公司</p>
      <p
        class="desc"
      >网络文化经营许可证：粤网文【2017】10120-2537号 | 广播电视节目制作经营许可证：（粤）字第02462号 | ICP备案：粤ICP备13065114号-5</p>
      <p class="desc">
        <a
          class="beian"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502003693"
        >粤公网安备 44030502003693号</a> | 联系方式：ulike_support@bytedance.com | 地址：深圳市南山区来福士广场15层1502单元
      </p>
    </div>
  </div>
</template>
<style scoped>
/* 初始化样式 */
.ulikecam {
  font-family: 'Microsoft YaHei', '微软雅黑', 'Microsoft JhengHei', '华文细黑',
    'STHeiti', 'MingLiu', Arial, sans-serif;
  max-width: 2560px;
  min-width: 1000px;
  margin: 0 auto;
  display: block;
  line-height: 1;
  width: 100%;
  height: 100%;
}
.section_common {
  width: 100%;
  position: relative;
}
.section_common img {
  display: block;
  width: 100%;
  height: auto;
}
.section_top .logo {
  position: absolute;
  top: 5.55556%;
  left: 21.79688%;
  width: 6.36719%;
  height: 6.2963%;
  background: url(../assets/ulikecam/bg_logo.png) no-repeat center center;
  background-size: 100% auto;
}

.section_top .title {
  position: absolute;
  top: 43.88889%;
  left: 57.1875%;
  width: 14.53125%;
  height: 15.83333%;
  background: url(../assets/ulikecam/bg_title.png) no-repeat center center;
}
.section_top .title span {
  visibility: hidden;
}
.section_top .btn_wrap {
  position: absolute;
  left: 57.1875%;
  top: 65.74074%;
  width: 25.01562%;
  height: 6.66667%;
}
/* .qrcode_interact {
    display: block;
} */
.qrcode_wrap {
  position: relative;
  display: block;
  width: 12.75465%;
  height: 102.77778%;
}
/* 源代码 */
/* .qrcode_interact .default {
    display: block;
}
.qrcode_interact .large_code:hover{
    position: absolute;
    left: 0;
    top: 0;
    width: 300%;
    -webkit-transform: scale(0.33);
    -moz-transform: scale(0.33);
    transform: scale(0.33);
    -webkit-transform-origin: top left;
    -moz-transform-origin: top left;
    transform-origin: top left;
    opacity: 0;
    -webkit-transition: 0.3s all;
    -moz-transition: 0.3s all;
    transition: 0.3s all;
} */
/* 自己写的代码 */
.qrcode_interact {
  position: absolute;
  top: 0;
  left: 0;
  float: left;
  background: url(../assets/ulikecam/bg_qrcode_default.png) no-repeat center
    center;
  transition: all 0.4s;
  cursor: pointer;
}
.qrcode_interact:hover {
  position: absolute;
  top: 10%;
  left: -130%;
  float: left;
  width: 300%;
  height: 300%;
  background: url(../assets/ulikecam/bg_qrcode_hover.png) no-repeat center
    center;
  opacity: 1;
}
.appstore_wrap {
  float: left;
  width: 40%;
  height: 100%;
  margin-left: 12%;
  background: url(../assets/ulikecam/bg_appstore_default.png) no-repeat center
    center;
  cursor: pointer;
}
.appstore_wrap:hover {
  background: url(../assets/ulikecam/bg_appstore_hover.png) no-repeat center
    center;
}
.android_wrap {
  float: left;
  width: 35%;
  height: 110%;
  background: url(../assets/ulikecam/bg_android_default.png) no-repeat center
    center;
  cursor: pointer;
}
.android_wrap:hover {
  background: url(../assets/ulikecam/bg_android_hover.png) no-repeat center
    center;
}
.section_footer {
  position: relative;
  padding: 102px 0 96px;
}
.desc {
  text-align: center;
}
.beian {
  color: #6a5e64;
}
</style>
