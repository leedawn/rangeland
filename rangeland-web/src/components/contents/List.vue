<template>
  <div class="container">
    <div class="top-menu">
      <div class="tag">
        <a @click.prevent="search()">综合</a>
      </div>
      <div class="tag divider-line"></div>

      <div class="tag">
        <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
      </div>
      <div class="tag divider-line"></div>
      <div class="tag">
        <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
      </div>
      <div class="tag divider-line"></div>
      <div class="tag">
        <a :class="{'layui-this': status === '' && tag === '精华'}" @click.prevent="search(2)">精华</a>
      </div>
      <div class="right-tag">
        <a :class="{'layui-this': sort === 'created'}" @click.prevent="search(3)">按最新</a>
      </div>
      <div class="right-tag divider-line"></div>
      <div class="right-tag">
        <a :class="{'layui-this': sort === 'answer'}" @click.prevent="search(4)">按热议</a>
      </div>
    </div>
    <div class="ui divider"></div>
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
.container {
  background-color: white;
  position: relative;
  top: 15px;
  width: 100%;
}
.top-menu {
  position: relative;
  padding: 20px;
}
.tag {
  float: left;
  margin-left: 9px;
  cursor: pointer;
}
.divider-line {
  background-color: #999;
  height: 18px;
  width: 1px;
}
.right-tag {
  float: right;
  margin-left: 9px;
  cursor: pointer;
}
</style>
