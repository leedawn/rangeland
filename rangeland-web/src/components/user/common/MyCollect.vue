<template>
  <div class="myCollect">
    <table class="ui selectable celled table">
      <thead>
        <tr>
          <th>帖子标题</th>
          <th>收藏时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post,index) in list" :key="'post' +index">
          <td>
            <router-link :to="{name:'detail',params:{tid:post._id}}">{{post.title}}</router-link>
          </td>
          <td>{{post.created|dateFormat}}</td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-show="list.length>0&&total>0"
      :showType="'icon'"
      :hasSelect="false"
      :hasTotal="false"
      :total="total"
      :size="size"
      :current="current"
      :showEnd="true"
      @changeCurrent="handleChange"
    ></pagination>
  </div>
</template>
<script>
import Pagination from '@/components/modules/pagination/Index'
import { getCollect } from '@/api/user'

import moment from 'moment'
export default {
  name: 'myCollect',
  data () {
    return {
      size: 10,
      list: [],
      total: 0,
      current: 0
    }
  },
  components: {
    pagination: Pagination
  },
  mounted () {
    this.getCollectList()
  },
  methods: {
    getCollectList () {
      getCollect({ page: this.current, limit: this.size }).then(res => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.nums
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollectList()
    }
  },
  filters: {
    dateFormat: function (value) {
      return moment(value, 'YYYYMMDD').fromNow()
    }
  }
}
</script>
<style></style>
