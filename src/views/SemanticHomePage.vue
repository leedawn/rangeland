<template>
  <div id="root">
    <div class="wrapper">
        <div class="header">
            <div class="header-wrapper">
                <div class="hader-logo">
                    <a class="logo active">
                        <img src="https://s3.pstatp.com/ee/feishu_website/static/img/logo-zh.648d6d020e.webp" class="logo-img" alt="">
                    </a>
                </div>
                <div class="navs">
                    <div class="navs-pc">
                        <div class="navs-item navs-dropdown product-dropdown path_product hide-third-menu">
                            <div class="dropdown dropdown-hover-trigger">
                                <div class="dropdown-label false">
                                    <div class="navs-pc__lbael">
                                        "功能"
                                        <i class="navs__expend-icon"></i>
                                    </div>
                                </div>
                                <div class="dropdown-menu false">
                                    <a class="dropdown-menu-item" href="">
                                        <div class="nav-item-content">
                                            <i class="label-icon feishuweb-overview"></i>
                                            <span>概览</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="navs-item navs-dropdown js-solution-nav path_solutions hide-third-menu"></div>
                        <div class="navs-item navs-dropdown path_discover"></div>
                        <div class="navs-item navs-dropdown path_support"></div>
                        <a class="navs-item false" href="/partners"></a>
                        <div class="navs-item navs-dropdown"></div>
                        <a class="navs-item" href=""></a>
                    </div>
                </div>
                <div class="first-line"></div>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped>
.header {
  position:absolute;
  top:0;
  left:0;
  z-index:1000;
  height:70px;
}
.header-wrapper {
    position:relative;
    max-width:1200px;
}
.header-logo {
    flex:0 0 auto;
}
.logo {
    display: flex;
    height:70px;
    align-items: center;
}
.logo-img {
    width:auto;
    height:48px;
}

.navs {
    position:absolute;
    top:0;
    left:120px;
}
.navs-pc {
    display:flex;
    position:relative;
    align-items:center;
}
.navs-item {
    color: rgba(17,31,31,.6);
    font-family:Helvetica Neue,Helvetica;
    font-size:16px;
    position:relative;
    cursor:pointer;
    padding:0 16px;
    transition:color .2s;
    line-height:70px;
}
.dropdown {
    position:relative;
}
.navs-item .dropdown-label {
    color: #646a73;
}
</style>
