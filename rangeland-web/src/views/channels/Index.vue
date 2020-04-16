<template>
  <div class="index-content">
    <panel></panel>
    <div class="post-content">
      <div class="post-list">
        <top></top>
        <list></list>
      </div>
      <div class="sidebar">
        <tips></tips>
        <sign></sign>
        <hotlist></hotlist>
        <ads></ads>
        <links></links>
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
    panel: Panel,
    ads: Ads,
    hotlist: HotList,
    links: Links,
    sign: Sign,
    tips: Tips,
    top: Top,
    list: List
  },
  computed: {},
  methods: {}
}
</script>
<style>
.index-content {
  position: relative;
  background-color: #e6e6e6;
  height: 100%;
  width: 100%;
}
.post-content {
  height: 100%;
  position: relative;
  top: 20px;
  width: 86%;
  left: 2.5%;
}
.post-list {
  position: absolute;
  left: 5%;
  width: 66%;
  height: 100%;
}
.sidebar {
  position: absolute;
  left: 73%;
  width: 33%;
}
</style>
