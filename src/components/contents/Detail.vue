<template>
  <div class="container">
    <imooc-panel></imooc-panel>
    <div>
      <div>
        <div>
          <h1>{{page.title}}</h1>
          <div>
            <span v-if="page.catalog==='share'">分享</span>
            <span v-if="page.catalog==='ask'">提问</span>
            <span v-if="page.catalog==='advise'">建议</span>
            <span v-if="page.catalog==='logs'">动态</span>
            <span v-if="page.catalog==='discuss'">交流</span>
            <span v-if="page.catalog==='notice'">公告</span>
            <span v-if="page.isEnd==='0'">未结</span>
            <span v-else>已结</span>
            <span v-show="page.isTop==='1'">置顶</span>
            <span v-for="(tag,index) in page.tags" :key="'tags'+index">{{tag.name}}</span>
            <span>
              <a href>{{page.answer}}</a>
              <a href>{{page.reads}}</a>
            </span>
          </div>
          <div>
            <a>
              <img :src="page.uid?page.uid.pic:'/img/bear-200-200.jpg'" />
            </a>
            <div>
              <a>
                <cite>{{page.uid?page.uid.name:'imooc'}}</cite>
                <i v-if="page.uid&&page.uid.isVip!=='0'?page.uid.isVip:false">VIP{{page.uid.isVip}}</i>
              </a>
              <span>{{page.created|moment}}</span>
            </div>
            <div>
              <span>悬赏：{{page.fav}}</span>
            </div>
          </div>
          <div>
            <a href>编辑</a>
            <a href>收藏</a>
          </div>
          <div v-html="content"></div>
        </div>
        <!-- 回帖相关模块 -->
        <div>
          <fieldset>
            <legend>回帖</legend>
          </fieldset>
          <ul>
            <li v-for="(item,index) in comments" :key="'comments'+index">
              <div>
                <a href>
                  <img :src="item.cuid?item.cuid.pic:'/img/bear-200-200.jpg'" alt />
                </a>
                <div>
                  <a href>
                    <cite>{{item.cuid?item.cuid.name:'imooc'}}</cite>
                    <i
                      v-if="item.cuid&&item.cuid.isVip!=='0'?item.cuid.isVip:false"
                    >VIP{{item.cuid.isVip}}</i>
                  </a>
                  <span v-if="index===0">(楼主)</span>
                </div>
                <div>
                  <span>{{item.created | moment}}</span>
                </div>
                <i title="最佳答案" v-show="item.isBest==='1'"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getDetail } from '@/api/content'
// import { getComents, addComment } from '@/api/comments'
// import HotList from '@/components/sidebar/HotList'
// import Ads from '@/components/sidebar/Ads'
// import Links from '@/components/sidebar/Links'
// import Panel from '@/components/Panel'
// import Editor from '../modules/editor/Index'
// import CodeMix from '@/mixin/code'
// import Pagination from '@/components/modules/pagination/Index'
// import { escapeHtml } from '@/utils/esacpeHtml'
// import { scrollToElem } from '@/tuils/common'
export default {
  name: 'Detail',
  //   mixins: [CodeMix],
  props: ['tid'],
  components: {
    // 'imooc-hotlist': HotList,
    // 'imooc-ads': Ads,
    // 'imooc-links': Links,
    // 'imooc-panel': Panel,
    // 'imooc-edit': Editor,
    // 'imooc-page': Pagination
  },
  data () {
    return {
      total: 0,
      size: 10,
      current: 0,
      page: {},
      comments: [],
      editInfo: {
        content: '',
        code: '',
        sid: ''
      }
    }
  }
//   mounted () {
//     this.getPostDetail()
//     this.getCommentsList()
//   },
//   methods: {
//     handleChange (val) {
//       this.current = val
//       this.getCommentslist()
//     },
//     handleLimit (val) {
//       this.size = val
//       this.getCommentsList()
//     },
//     getPostDetail () {
//       getDetail(this.tid).then(res => {
//         if (res.cod === 200) {
//           this.page = res.data
//         }
//       })
//     },
//     getCommentsList () {
//       getComents({
//         tid: this.tid,
//         page: this.current,
//         limit: this.size
//       }).then(res => {
//         if (res.code === 200) {
//           this.comments = res.data
//           this.total = res.total
//         }
//       })
//     },
//     addContent (val) {
//       this.editInfo.content = val
//     },
//     async submit () {
//       const isValid = await this.$refs.observer.validate()
//       if (!isValid) {
//         return
//       }
//       const isLogin = this.$store.state.isLogin
//       if (!isLogin) {
//         this.$pop('shake', '请先登录')
//         return
//       }
//       this.editInfo.code = this.code
//       this.editInfo.sid = this.$store.state.sid
//       this.editInfo.tid = this.tid
//       addComment(this.editInfo).then(res => {
//         if (res.code === 200) {
//           this.$pop('', '发表评论成功')
//           this.code = ''
//           this.editInfo.content = ''
//           const user = this.$store.state.userInfo
//           const cuid = {
//             _id: user._id,
//             pic: user.pic,
//             name: user.name,
//             isVip: user.isVip
//           }
//           res.data.cuid = cuid
//           this.comments.push(res.data)
//           requestAnimationFrame(() => {
//             this.$refs.observer && this.$refs.observer.reset()
//           })
//           this._getCode()
//         }
//       })
//     },
//     editComment (item) {
//       this.editInfo.content = item.content
//       scrollToElem('.layui-input-block', 500, -65)
//       document.getElementById('edit').focus()
//     },
//     setBest (item) {
//       this.$confirm(
//         '确定采纳为最佳答案吗？',
//         () => {
//           console.log(item._id)
//         },
//         () => {}
//       )
//     }
//   },
//   computed: {
//     content () {
//       if (typeof this.page.content === 'undefined') {
//         return ''
//       }
//       if (this.page.content.trim() === '') {
//         return ''
//       }
//       return escapeHtml(this.page.content)
//     },
//     user () {
//       return this.$store.state.userInfo
//     }
//   }
}
</script>
