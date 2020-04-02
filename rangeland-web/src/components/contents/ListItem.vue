<template>
  <div class="list-item">
    <div class="post-wrapper" v-for="(item,index) in items" :key="'listitem'+index">
      <div class="item-pic">
        <img :src="item.uid.pic" alt="贤心" />
      </div>
      <div class="content-wrapper">
        <div class="header">
          <p class="post-catalog">{{item.catalog}}</p>
          <p class="post-title">{{item.title}}</p>
          <div class="red-tag" v-show="item.tags.length>0">
            <span
              class="ui red label"
              v-for="(tag,index) in item.tags"
              :key="'tag'+index"
            >{{tag.name}}</span>
          </div>
        </div>
        <div class="description">
          <a href link>
            <cite class="name">{{item.uid.name}}</cite>
            <i v-if="item.uid.isVip!=='0'">{{'VIP' + item.uid.isVip}}</i>
          </a>
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
    <div v-show="isShow">
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
  position: relative;
  top: 20px;
}
.post-wrapper {
  position: relative;
}
.item-pic {
  position: relative;
  padding: 10px;
}
.item-pic img {
  width: 50px;
}

.content-wrapper {
  position: absolute;
  top: 10px;
  left: 80px;
  width: 100%;
}
.header {
  position: relative;
}
.post-catalog {
  position: relative;
  color: #5fb878;
  border: 1px solid #5fb878;
  width: 40px;
  padding: 2px 5px;
}
.post-title {
  position: absolute;
  top: 1px;
  left: 60px;
  font-size: 15px;
}
.red-tag {
  position: absolute;
  top: 1px;
  right: 18%;
}
.description {
  position: relative;
  top: 9px;
}
.name {
  position: relative;
  color: gray;
}
.time {
  position: relative;
  left: 8px;
  color: #999;
}
.tag {
  position: relative;
  top: -30px;
  left: 83%;
}
.fav {
  position: absolute;
  left: 160px;
  color: red;
}
.answer {
  position: absolute;
  top: 2px;
  left: 440px;
  color: #999;
}
.more-answer {
  position: relative;
  left: 45%;
  top: 15px;
  padding: 10px;
  border: 1px solid #009e94;
  color: black;
  cursor: pointer;
}
.no-more {
  position: relative;
  left: 45%;
  top: 15px;
  padding: 10px;
  color: #999;
}
</style>
