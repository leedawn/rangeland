<template>
  <div class="myPost">
    <table class="ui selectable celled table">
      <thead>
        <tr>
          <th>帖子标题</th>
          <th>状态</th>
          <th>结贴</th>
          <th>发表时间</th>
          <th>数据</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post,index) in list" :key="'post' +index">
          <td>
            <router-link :to="{name:'detail',params:{tid:post._id}}">{{post.title}}</router-link>
          </td>
          <td>{{post.status=="0"?"打开":"关闭"}}</td>
          <td>{{post.isEnd=="0"?"未结":"已结"}}</td>
          <td>{{post.created|dateFormat}}</td>
          <td>{{post.reads}}阅/{{post.answer}}答</td>
          <td>
            <router-link :to="{name:'edit',params:{tid:post._id,page:post}}">编辑</router-link>
            <a @click.prevent="deletePost(post)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { getPostListByUid, deletePostByUid } from '../../../api/user'
import moment from 'moment'
export default {
  name: 'myPost',
  data () {
    return {
      page: 0,
      limit: 10,
      list: {}
    }
  },
  mounted () {
    this.getPostList()
  },
  methods: {
    getPostList () {
      getPostListByUid({ page: this.page, limit: this.limit }).then(res => {
        if (res.code === 200) {
          this.list = res.data
        }
      })
    },
    // const tid=0,
    deletePost (post) {
      this.$confirm(
        '确定删除该帖子吗？',
        () => {
          if (post.isEnd === '0') {
            deletePostByUid({ tid: post._id })
              .then(res => {
                if (res.code === 200) {
                  this.getPostList()
                }
              })
              .catch(err => {
                this.$alert(err)
              })
          } else {
            this.$alert('已经结贴，不能删除')
          }
        },
        () => {}
      )
    }
  },
  filters: {
    dateFormat: function (value) {
      return moment(value, 'YYYYMMDD').fromNow()
    }
  }
}
</script>
<style scoped>
.myPost {
  position: relative;
}
</style>
