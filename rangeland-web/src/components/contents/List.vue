<template>
  <div class="list-container">
    <div class="list-menu">
      <a class="item" @click.prevent="search()">综合</a>
      <span class="vertical-line"></span>
      <a class="item" @click.prevent="search(0)">未结</a>
      <span class="vertical-line"></span>
      <a class="item" @click.prevent="search(1)">已结</a>
      <span class="vertical-line"></span>
      <a class="item" @click.prevent="search(2)">精华</a>
      <a class="item item-right" @click.prevent="search(3)">按最新</a>
      <span class="vertical-line item-right"></span>
      <a class="item item-right" @click.prevent="search(4)">按热议</a>
    </div>
    <list-item :lists="lists" :isEnd="isEnd" @nextpage="nextPage()"></list-item>
  </div>
</template>

<script>
import ListItem from './ListItem'
import ListMix from '@/mixin/list'
export default {
  name: 'list',
  mixins: [ListMix],
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 5,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      lists: []
    }
  },
  components: {
    ListItem
  },
  watch: {
    current (newval, oldval) {
      this.init()
    },
    $route (newval, oldval) {
      const catalog = this.$route.params.catalog // 和推荐的写法不一样
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  methods: {
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      console.log(val)
      switch (val) {
        case 0:
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>
<style lang="css" scoped>

</style>
