<template>
  <div class="homepage-wrapper background-gray">
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
<style scoped>
</style>
