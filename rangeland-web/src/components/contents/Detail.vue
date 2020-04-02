<template>
  <div class="container">
    <panel></panel>
    <div class="detail-info">
      <div class="post-left">
        <div class="post-detail">
          <div class="title">{{page.title}}</div>
          <div v-show="false">{{$route.params.tid}}</div>
          <div class="post-info">
            <div class="catalog">
              <span v-if="page.catalog==='share'">分享</span>
              <span v-if="page.catalog==='ask'">提问</span>
              <span v-if="page.catalog==='advise'">建议</span>
              <span v-if="page.catalog==='logs'">动态</span>
              <span v-if="page.catalog==='discuss'">交流</span>
              <span v-if="page.catalog==='notice'">公告</span>
            </div>
            <div class="isEnd">
              <span v-if="page.isEnd==='0'">未结</span>
              <span v-else>已结</span>
            </div>
            <span class="isTop" v-show="page.isTop==='1'">置顶</span>
            <span class="tags" v-for="(tag,index) in page.tags" :key="'tags'+index">{{tag.name}}</span>
            <span class="right-info">
              <i class="comment outline icon"></i>
              <a class="answer" href>{{page.answer}}</a>
              <i class="eye icon"></i>
              <a class="reads" href>{{page.reads}}</a>
            </span>
          </div>
          <div class="middle-wrapper">
            <a class="middle-image">
              <img :src="page.uid?page.uid.pic:'/img/bear-200-200.jpg'" />
            </a>
            <div class="middle-top">
              <a class="uid">
                <cite>{{page.uid?page.uid.name:'imooc'}}</cite>
                <i v-if="page.uid&&page.uid.isVip!=='0'?page.uid.isVip:false">VIP{{page.uid.isVip}}</i>
              </a>
              <span class="create-time">{{page.created|moment}}</span>
            </div>
            <div class="middle-bottom">
              <span>悬赏：{{page.fav}}</span>
            </div>
            <hr class="line" />
            <div class="right-buttons">
              <a class="common-button extra-button" href>编辑</a>
              <a class="common-button" href>收藏</a>
            </div>
          </div>
          <div class="post-content" v-html="content"></div>
        </div>
        <!-- 回帖模块 -->
        <div class="comments">
          <div class="comments-divider-line"></div>
          <div class="comments-title">回帖</div>
          <form class="ui form">
            <ValidationObserver ref="observer" v-slot="{ validate }">
              <editor @changeContent="add" :initContent="content"></editor>
              <ValidationProvider
                name="code"
                ref="codefield"
                rules="required|length:4"
                v-slot="{ errors }"
              >
                <div class="code">
                  <div class="code-text">验证码</div>
                  <input
                    class="code-input"
                    type="text"
                    name="code"
                    v-model="code"
                    placeholder="请输入验证码"
                  />
                  <span class="code-svg" @click="_getCode()" v-html="svg"></span>
                  <span class="error-message">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <button class="submit" @click="validate().then(submit)">提交回复</button>
            </ValidationObserver>
          </form>
        </div>
      </div>
      <!-- 回帖相关模块 -->
      <!-- <div>
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
      </div>-->
      <div class="post-right">
        <hotlist></hotlist>
        <ads></ads>
        <links></links>
        <!-- <imooc-edit></imooc-edit> -->
        <!-- <imooc-page></imooc-page> -->
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getDetail } from '@/api/content'
import { getComents, addComment } from '@/api/comments'
import Hotlist from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor/Index'
import CodeMix from '@/mixin/code'
// import Pagination from '@/components/modules/pagination/Index'
import { escapeHtml } from '@/util/escapeHtml'
import { scrollToElem } from '@/util/common'
export default {
  name: 'Detail',
  mixins: [CodeMix],
  props: ['tid'],
  components: {
    ValidationObserver,
    ValidationProvider,
    Hotlist,
    Ads,
    Links,
    Panel,
    Editor
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
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getCommentslist()
    },
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    getPostDetail () {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data
          console.log('getPostDetail -> res.data', res.data)
        }
      })
    },
    getCommentsList () {
      getComents({
        tid: this.tid,
        page: this.current,
        limit: this.size
      }).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    addContent (val) {
      this.editInfo.content = val
    },
    add (val) {
      this.content = val
      const saveData = {
        title: this.title,
        cataIndex: this.cataIndex,
        content: this.content,
        favIndex: this.favIndex
      }
      if (this.title.trim() !== '' && this.content.trim() !== '') {
        localStorage.setItem('addData', JSON.stringify(saveData))
      }
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        debugger
        return
      }
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        this.$pop('shake', '请先登录')
        return
      }
      this.editInfo.code = this.code
      this.editInfo.sid = this.$store.state.sid
      this.editInfo.tid = this.tid
      addComment(this.editInfo).then(res => {
        if (res.code === 200) {
          this.$pop('', '发表评论成功')
          this.code = ''
          this.editInfo.content = ''
          const user = this.$store.state.userInfo
          const cuid = {
            _id: user._id,
            pic: user.pic,
            name: user.name,
            isVip: user.isVip
          }
          res.data.cuid = cuid
          this.comments.push(res.data)
          requestAnimationFrame(() => {
            this.$refs.observer && this.$refs.observer.reset()
          })
          this._getCode()
        }
      })
    },
    editComment (item) {
      this.editInfo.content = item.content
      scrollToElem('.layui-input-block', 500, -65)
      document.getElementById('edit').focus()
    },
    setBest (item) {
      this.$confirm(
        '确定采纳为最佳答案吗？',
        () => {
          console.log(item._id)
        },
        () => {}
      )
    }
  },
  computed: {
    content () {
      if (typeof this.page.content === 'undefined') {
        return ''
      }
      if (this.page.content.trim() === '') {
        return ''
      }
      return escapeHtml(this.page.content)
    },
    user () {
      return this.$store.state.userInfo
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 1200px;
  background-color: #e6e6e6;
}
.detail-info {
  position: absolute;
  top: 130px;
  left: 2.5%;
  width: 95%;
}
.post-left {
  position: absolute;
  width: 66%;
  padding: 15px;
}
.post-right {
  position: absolute;
  left: 67%;
  width: 33%;
}
.post-detail {
  height: 450px;
  background-color: white;
  padding: 15px;
}
.title {
  position: relative;
  top: 10px;
  font-size: 24px;
}
/* 帖子相关信息 */
.post-info {
  position: relative;
  top: 30px;
}
.catalog {
  padding: 5px 10px;
  background-color: #009688;
  color: white;
  width: 50px;
  font-size: 14px;
}
.isEnd {
  position: absolute;
  top: 0px;
  left: 60px;
  padding: 5px 10px;
  background-color: #999999;
  color: white;
}
.isTop {
  position: absolute;
  top: 0px;
  left: 120px;
  padding: 5px 10px;
  color: white;
  background-color: black;
}
.right-info {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 20px;
}
.comment.outline.icon {
  color: #999999;
  position: relative;
  right: 30px;
}
.answer {
  color: black;
  position: relative;
  right: 28px;
}
.eye.icon {
  color: #999999;
}
.reads {
  color: black;
}
/* 详细的帖子信息 */
.middle-wrapper {
  position: relative;
  top: 50px;
  background-color: #f8f8f8;
  height: 130px;
}
.middle-image {
  position: relative;
  top: 15px;
  left: 15px;
}
.middle-image img {
  width: 45px;
}
.middle-top {
  position: absolute;
  top: 15px;
  left: 72px;
}
.uid {
  color: #00aaed;
}
.create-time {
  position: relative;
  left: 10px;
}
.middle-bottom {
  position: relative;
  top: -10px;
  left: 70px;
  color: #ff7200;
}
.line {
  position: relative;
  top: 5px;
  border: 1px solid #e6e6e6;
}
.right-buttons {
  position: relative;
  top: 20px;
  left: 580px;
}
.common-button {
  padding: 10px 12px;
  background-color: #009688;
  color: white;
}
.extra-button {
  margin-right: 10px;
}
.post-content {
  position: relative;
  top: 65px;
  width: 100%;
}
/* 回帖模块 */
.comments {
  position: relative;
  top: 25px;
  background-color: white;
  padding: 15px;
}
.comments-divider-line {
  position: relative;
  top: 20px;
  background-color: #e6e6e6;
  height: 1px;
}
.comments-title {
  position: absolute;
  top: 25px;
  left: 45%;
  padding: 1px 10px;
  background-color: white;
  font-size: 22px;
  color: #999;
}
.code {
  position: relative;
  top: 100px;
  width: 100%;
}
.code-text {
  position: absolute;
  border: 1px solid #e6e6e6;
  background-color: #fbfbfb;
  width: 120px;
  font-size: 15px;
  padding: 10px 18px;
  text-align: center;
}
.ui.form input {
  position: absolute;
  top: 1px;
  left: 119px;
  width: 20%;
}
.code-svg {
  position: absolute;
  top: -10px;
  left: 280px;
}
.submit {
  position: relative;
  top: 150px;
  background-color: #009688;
  padding: 15px;
  color: white;
  margin: 30px 0px 200px;
}
.error-message {
  position: absolute;
  top: 10px;
  left: 450px;
  color: red;
  font-size: 16px;
}
</style>
