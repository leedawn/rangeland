<template>
  <div class="item-wrapper">
    <div class="item-top" v-for="(item,index) in items" :key="'listitem'+index">
      <div class="ui divider"></div>
      <div class="item-pic">
        <img :src="item.uid.pic" alt="头像" />
      </div>
      <div class="item-right-wrapper">
        <div class="item-header">
          <p class="post-catalog">{{item.catalog}}</p>
          <p class="post-title">
            <router-link :to="'/detail/'+item._id">{{item.title}}</router-link>
          </p>
          <div class="post-tag" v-show="item.tags.length>0">
            <span
              class="ui red label"
              v-for="(tag,index) in item.tags"
              :key="'tag'+index"
            >{{tag.name}}</span>
          </div>
        </div>
        <div class="item-description">
          <cite class="name">{{item.uid.name}}</cite>
          <i v-if="item.uid.isVip!=='0'">{{'VIP' + item.uid.isVip}}</i>
          <span class="time">{{item.created | moment}}</span>
          <span class="fav">
            <i class="heart outline icon"></i>
            {{item.fav}}
          </span>
          <span v-show="item.status !== '0'">已结</span>
          <span class="answer">
            <i class="comment outline icon"></i>
            {{item.answer}}
          </span>
        </div>
      </div>
    </div>
    <div v-show="isShow" class="item-bottom">
      <div v-if="!isEnd">
        <a class="more-answer" @click.prevent="more()">更多求解</a>
      </div>
      <div class="no-more" v-else>没有更多了</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'
import addPicURL from '@/util/addPicURL'

import _ from 'lodash'
export default {
  name: 'listitem',
  data () {
    return {}
  },
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    items () {
      _.map(this.lists, item => {
        item.uid.pic = addPicURL(item.uid.pic)
        console.log('items ->  item.uid.pic', item.uid.pic)
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      console.log('items -> lists ->2', this.lists)
      return this.lists
    }
  },
  methods: {
    more () {
      this.$emit('nextpage')
    }
  },
  filters: {
    moment (date) {
      if (moment(date).isBefore(moment().subtract(7, 'days'))) {
        return moment(date).format('YYYY-MM-DD')
      } else {
        return moment(date).from(moment())
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
