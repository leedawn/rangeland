<template>
  <div class="tips">
    <div class="table-name">
      <h3>温馨通道</h3>
    </div>
    <div class="ui divider"></div>
    <ul>
        <li v-for="(item,index) in lists" :key="'tips'+index">
            <a :href="item.link" target="_blank">{{item.title}}</a>
        </li>
    </ul>
  </div>
</template>
<script>
import { getTips } from '../../api/content'
export default {
  name: 'tips',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>
