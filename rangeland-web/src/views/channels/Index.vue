<template>
  <div class="detail">
    <imooc-panel></imooc-panel>
    <div class="post-content">
      <div class="main-content">
        <div class="post-list">
          <imooc-top></imooc-top>
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

import Top from '../../components/contents/Top'
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
    'imooc-top': Top,
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
  width: 86%;
  left: 2.5%;
}
.post-list {
  position: absolute;
  left: 5%;
  width: 66%;
}
.sidebar {
  position: absolute;
  left: 73%;
  width: 33%;
}
</style>
