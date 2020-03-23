import { getList } from '@/api/content'

export default {
  data () {
    return {
      status: '',
      tag: '',
      sort: 'created',
      page: 0,
      limit: 5,
      isTop: 0,
      catalog: '',
      isEnd: false,
      isRepeat: false,
      current: '',
      lists: []
    }
  },
  mounted () {
    const catalog = this.$route.params.catalog
    if (typeof catalog !== 'undefined' && catalog !== '') {
      this.catalog = catalog
      console.log('mounted -> catalog', catalog)
    }
    this._getLists()
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getLists()
    },
    _getLists () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      const options = {
        catalog: this.catalog,
        isTop: this.isTop,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getList(options).then((res) => {
        this.isRepeat = false

        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          console.log('_getLists -> res.data.length', res.data.length)
          console.log('_getLists -> this.limit', this.limit)
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        this.isRepeat = false
        if (err) {
          this.$alert(err.message)
        }
      })
    },
    nextPage () {
      this.page++
      this._getLists()
    }
  }
}
