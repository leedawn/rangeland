<template>
  <div class="homepage-wrapper background-gray">
    <panel></panel>
    <div class="post-content-wrapper">
      <div class="post-list">
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
    list: List
  },
  computed: {},
  methods: {}
}
</script>
<style scoped>
.post-list {
  top: -20px;
}
</style>
