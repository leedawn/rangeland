<template>
  <div class="detail">
    <imooc-panel></imooc-panel>
    <div class="post-content">
      <div class="main-content">
        <div class="post-list">
          <!-- <imooc-top></imooc-top> -->
          <imooc-list></imooc-list>
        </div>
        <div class="sidebar">
          <imooc-tips></imooc-tips>
          <imooc-sign></imooc-sign>
          <imooc-hotlist></imooc-hotlist>
          <imooc-ads></imooc-ads>
          <imooc-links></imooc-links>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Panel from '../../components/Panel'
import Ads from '../../components/sidebar/Ads'
import HotList from '../../components/sidebar/HotList'
import Links from '../../components/sidebar/Links'
import Sign from '../../components/sidebar/Sign'
import Tips from '../../components/sidebar/Tips'

// import Top from '../../components/contents/Top'
import List from '../../components/contents/List'
export default {
  name: 'detail',
  components: {
    'imooc-panel': Panel,
    'imooc-ads': Ads,
    'imooc-hotlist': HotList,
    'imooc-links': Links,
    'imooc-sign': Sign,
    'imooc-tips': Tips,
    // 'imooc-top': Top,
    'imooc-list': List
  },
  computed: {},
  methods: {}
}
</script>
<style>
.detail {
  position: relative;
  height: 1000px;
  background-color: #e6e6e6;
}
.post-content {
  position: absolute;
  top: 135px;
  width: 95%;
  left: 2.5%;
}
.post-list {
  position: absolute;
  width: 60%;
}
.sidebar {
  position: absolute;
  width: 29%;
  right: 0%;
  background-color:white;
}

/* .detail {
  width: 100%;
  background-color: #999;
  height: 2000px;
}
.post-content {
  width: 90%;
  margin-left: auto; 设置浏览器边距 */
/* margin-right: auto;
  margin-top: 20px;
}
.post-list {
  background-color: white;
  padding: 7px;
  padding-left: 14px;
}
.sidebar {
  width: 80%;
  float: right;
}
.tips {
  background-color: white;
  padding: 7px;
  margin-bottom: 15px;
}
.sign-in {
  background-color: white;
  padding: 7px;
  margin-bottom: 15px;
}
.sign-in-info {
  text-align: center;
}
.imooc-kiss {
  float: right;
  margin-right: 20px;
}
.hot-discussion {
  background-color: white;
  padding: 7px;
  margin-bottom: 15px;
}
.online-course {
  background-color: white;
  padding: 7px;
  margin-bottom: 15px;
}
.fluid.ui.green.button {
  font-size: 20px;
  height: 50px;
}
.friendly-link {
  background-color: white;
  padding: 7px;
  margin-bottom: 15px;
} */
</style>
