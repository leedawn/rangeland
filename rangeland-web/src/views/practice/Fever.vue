<template>
  <div class="homepage">
    <div class="homepage-large-image">
      <div class="drg-info">
        <div class="drg-image">
          <img src="../../assets/game/DRG-small.png" />
        </div>
        <div class="drg-logo">
          <img src="../../assets/game/DRG-logo.png" />
        </div>
        <div class="download-DRG">
          <img src="../../assets/game/download-DRG.png" />
        </div>
        <div class="purchase-DRG">
          <img src="../../assets/game/purchase-DRG.png" />
        </div>
        <div class="drg-qr-code">
          <img src="../../assets/game/drg-qr-code.jpg" />
        </div>
      </div>
      <div class="lighting-info">
        <img src="../../assets/game/lighting.png" />
      </div>
      <div class="tt-info">
        <div class="tt-image">
          <a href="http://fever.163.com">
            <img src="../../assets/game/TT.png" />
          </a>
        </div>
        <div class="tt-logo">
          <img src="../../assets/game/TT-logo.png" />
        </div>
        <div class="download-TT">
          <img src="../../assets/game/download-TT.png" />
        </div>
        <div class="purchase-TT">
          <img src="../../assets/game/purchase-TT.png" />
        </div>
        <div class="tt-qr-code">
          <img src="../../assets/game/tt-qr-code.jpg" />
        </div>
      </div>
    </div>
    <div class="homepage-partner">
      <div class="homepage-partner-title">
        <img src="../../assets/parter/partner-title.png" />
      </div>
      <div class="homepage-partner-content">
        <a href="https://uu.163.com/" target="_blank">
          <img src="../../assets/parter/partner-uu.png" />
        </a>
        <a href="http://game.163.com/" target="_blank">
          <img src="../../assets/parter/partner-netease.png" />
        </a>
        <a href="http://mumu.163.com/" target="_blank">
          <img src="../../assets/parter/partner-mumu.png" />
        </a>
      </div>
    </div>
    <div class="homepage-footer">
      <div class="homepage-footer-logo">
        <img src="../../assets/footer/logo.png" usemap="#logomap" />
        <map name="logomap" id="logomap">
          <area href="https://163.com" shape="rectangle" coords="0, 0, 126, 31" target="_blank" />
          <area
            href="https://game.163.com"
            shape="rectangle"
            coords="126, 0, 252, 31"
            target="_blank"
          />
        </map>
      </div>
      <div class="homepage-footer-copyright">
        <div class="homepage-footer-copyright-link">
          <a href="http://gb.corp.163.com/gb/about/overview.html" target="_blank">公司简介</a> &ndash;
          <a href="https://help.mail.163.com/service.html" target="_blank">客户服务</a> &ndash;
          <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">网易集团隐私政策及儿童个人信息保护规则</a> &ndash;
          <a href="https://game.163.com/about/" target="_blank">网易游戏</a> &ndash;
          <a href="https://game.163.com/contact/business.html" target="_blank">联系我们</a> &ndash;
          <a href="https://game.163.com/contact/business.html" target="_blank">商务合作</a> &ndash;
          <a href="http://hr.game.163.com/index.html" target="_blank">加入我们</a>
        </div>
        <div class="homepage-footer-copyright-info">网易公司版权所有 ©️1997-2020</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  background-color: black;
  color: white;
  margin-top: -43px;
  height: 1318px;
}
.homepage-large-image {
  height: 742px;
  position: relative;
}
.drg-info {
    opacity:0.7;
}
.drg-info:hover {
    opacity:1;
}

.drg-image img {
  /* float:left; */
  width: 911px;
}
.drg-logo img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 123px;
  margin-left: 600px;
  margin-top: 50px;
}
.download-DRG img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 246px;
  margin-top: 500px;
}
.purchase-DRG img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 287px;
  margin-top: 410px;
}
.drg-qr-code img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 68px;
  margin-left: 20px;
  margin-top: 415px;
}
.lighting-info img {
  /* float:right; */
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 455px;
  margin-left: 500px;
}
.tt-info {
    opacity:0.7;
}
.tt-info:hover {
    opacity:1;
}
.tt-image img {
  /* float:right; */
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 911px;
  margin-left: 530px;
}
.tt-logo img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 123px;
  margin-left: 650px;
  margin-top: 580px;
}
.download-TT img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 246px;
  margin-top: 410px;
  margin-left: 1220px;
}
.purchase-TT img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 287px;
  margin-top: 500px;
  margin-left: 1170px;
}
.tt-qr-code img {
  position: absolute;
  z-index: 1;
  top: 0px;
  width: 68px;
  margin-left: 1370px;
  margin-top: 500px;
}
.tt-info a:hover {
  background: url(../../assets/game/DRG.png);
}
.homepage-partner {
  height: 300px;
  margin-top: 50px;
}
.homepage-partner-title {
  text-align: center; /*图片居中 */
  height: 100px;
}
.homepage-partner-content {
  text-align: center; /*图片居中 */
}
.homepage-partner img {
  border-color: gray;
  /* border-style:solid;  使用 border-width 之前就需要设置 border-style */
  /* border-width:thin; */
  margin-right: 20px;
}
.homepage-footer {
  height: 150px;
  bottom: 0;
  /* width:100%; */
  /* display:table; */
  vertical-align: middle;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.homepage-footer-logo {
  /* float:left; */
  margin-left: 200px;
}
/* .homepage-footer-logo img {
    border:0;
    outline:none;
} */
.homepage-footer-copyright {
  /* float:right; */
  color: gray;
  /* vertical-align: middle; */
  /* display:table-cell; */
  flex: 1;
  margin-left: 20px;
}

.homepage-footer-copyright-link a:visited {
  color: gray;
}
.homepage-footer-copyright-link a:link {
  color: gray;
}
.homepage-footer-copyright-link a:hover {
  color: gold;
}
</style>
