<template>
  <div class="list_item">
    <div class="ui relaxed divided list">
      <div class="item" v-for="(item,index) in items" :key="'listitem'+index">
        <div class="item_pic">
          <img :src="item.uid.pic" alt="贤心" />
        </div>
        <div class="content_wrapper">
          <div class="header">
            <button class="mini ui positive basic button">{{item.catalog}}</button>
            <p>{{item.title}}</p>
          </div>
          <div class="description">
            <a href="user/home.html" link>
              <cite>{{item.uid.name}}</cite>
              <i v-if="item.uid.isVip!=='0'">{{'VIP' + item.uid.isVip}}</i>
            </a>
            <span>{{item.created | moment}}</span>
            <span>{{item.fav}}</span>
            <span v-show="item.status !== '0'">已结</span>
            <span>{{item.answer}}</span>
          </div>
          <div class="tag" v-show="item.tags.length>0">
            <span v-for="(tag,index) in item.tags" :key="'tag'+index">{{tag.name}}</span>
          </div>
        </div>
      </div>
      <div v-show="isShow">
        <div v-if="!isEnd">
          <a @click.prevent="more()">更多求解</a>
        </div>
        <div v-else>没有更多了</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import 'moment/locale/zh-cn'

import _ from 'lodash'
export default {
  name: 'listitem',
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
        console.log('items -> lists', this.lists)
        console.log('items -> item', item)

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
.list_item {
  position:relative;
  top:20px;
}
.item_pic {
  position: absolute;
}
.content_wrapper {
  position: relative;
  left: 50px;

}
.tag {
  position:relative;
  top:-30px;
  left:83%;
}
</style>
