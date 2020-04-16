<template>
  <div class="message-container">
    <button class="negative ui button clear-all-button" @click="clearAll()">清空全部消息</button>
    <div class="message-detail">
      <!--<div class="fly-none">您暂时没有最新消息</div>-->
      <ul class="message-list">
        <li v-for="(item,index) in lists" :key="'comments' + index" class="message-li">
          <blockquote class="ui floating message">
            <a href="/jump?username=Absolutely" target="_blank">
              <cite>{{item.cuid.name}}</cite>
            </a>回答了您的求解
            <a target="_blank" href="/jie/8153.html/page/0/#item-1489505778669">
              <cite>{{item.title}}</cite>
            </a>
          </blockquote>
          <div class="message-content" v-html="item.content"></div>
          <!-- 不知道什么原因，无法使用 v-richtext -->
          <div class="message-bottom">
            <span class="message-created">{{ item.created | moment}}</span>
            <button class="negative ui button clear-item-button" @click="clear(item)">删除</button>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <pagination
          v-show="total > 0"
          :total="total"
          :current="page"
          :align="'left'"
          :hasTotal="true"
          :hasSelect="true"
          @changeCurrent="handleChange"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMsg, setMsg } from '@/api/user'
import Pagination from '@/components/modules/pagination/Index'
export default {
  name: 'message',
  components: {
    pagination: Pagination
  },
  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      total: 0
    }
  },
  mounted () {
    this.getMsgAll()
  },
  computed: mapState({
    num: state => (state.num.message ? state.num.message : 0)
  }),
  methods: {
    clearAll () {
      setMsg().then(res => {
        if (res.code === 200) {
          // 清空所有消息
          this.lists = []
          this.$store.commit('setMessage', { message: 0 })
          this.total = 0
        }
      })
    },
    clear (item) {
      setMsg({ id: item._id }).then(res => {
        if (res.code === 200) {
          // 设置特定消息已读
          // this.lists = []
          this.getMsgAll()
          this.$store.commit('setMessage', { message: this.num - 1 })
        }
      })
    },
    getMsgAll () {
      getMsg({
        page: this.page,
        limit: this.limit
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    }
  }
}
</script>

<style lang="css" scoped>
.message-container {
  position: relative;
  top: 10px;
  margin: 15px;
}
.clear-all-button {
  position: relative;
  padding: 15px;
}
.message-detail {
  position: relative;
  top: 30px;
}
.pagination {
  position: relative;
  top: 50px;
}
.message-list {
  position: relative;
}
.message-li {
  position: relative;
  height: 160px;
}
.message-content {
  position: relative;
  top: 10px;
  left: 20px;
}
.message-bottom {
  position: relative;
  top: 30px;
  left: 20px;
}
.message-created {
  position: relative;
  color: #999;
}
.clear-item-button {
  position: absolute;
  right: 35px;
}
</style>
