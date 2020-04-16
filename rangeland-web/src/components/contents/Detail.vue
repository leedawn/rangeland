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
              <!-- 官方获取图片的方式使用了 publicPath, 方便打包-->
            </a>
            <div class="middle-top">
              <a class="uid">
                <cite>{{page.uid?page.uid.name:'echo'}}</cite>
                <i v-if="page.uid&&page.uid.isVip!=='0'?page.uid.isVip:false">VIP{{page.uid.isVip}}</i>
              </a>
              <span class="create-time">{{page.created|moment}}</span>
            </div>
            <div class="middle-bottom">
              <span>悬赏：{{page.fav}}</span>
            </div>
            <hr class="line" />
            <div class="right-buttons">
              <router-link
                class="common-button extra-button"
                :to="{name:'edit',params:{tid:tid,page:page}}"
              >编辑</router-link>
              <a class="common-button" @click="setCollect">收藏</a>
            </div>
          </div>
          <div class="post-content" v-html="content"></div>
        </div>
        <!-- 回帖模块 -->
        <div class="comments-module">
          <div class="comments-divider-line"></div>
          <div class="comments-title">回帖</div>

          <ul class="comments-detail">
            <li class="comment-detial" v-for="(item,index) in comments" :key="'commments' + index">
              <div class="comment-top">
                <a class="user-avatar" href>
                  <img :src="item.cuid ? item.cuid.pic : '/img/bear-200-200.jpg'" alt="用户头像" />
                </a>
                <div class="comment-user-detail">
                  <a href class="comment-user-link">
                    <cite>{{item.cuid? item.cuid.name :'echo'}}</cite>
                    <i
                      v-if="item.cuid && item.cuid.isVip !=='0'?item.cuid.isVip : false "
                      class="layui-badge fly-badge-vip"
                    >VIP{{item.cuid.isVip}}</i>
                  </a>

                  <span class="comment-user-info" v-if="index === 0">(楼主)</span>
                </div>

                <div class="comment-created">
                  <span>{{item.created | moment}}</span>
                </div>

                <i class="iconfont icon-caina" title="最佳答案" v-show="item.isBest === '1'"></i>
              </div>
              <div class="comment-body" v-html="item.content"></div>
              <!--原来是 v-richtext-->
              <div class="comment-bottom">
                <span class="comment-zan" :class="{'zanok' :item.handed === '1'}" type="zan">
                  <i class="thumbs up outline icon"></i>
                  <em>{{item.hands}}</em>
                </span>
                <span class="comment-reply">
                  <i class="comments outline icon"></i>
                  回复
                </span>
                <div class="comment-admin">
                  <span
                    class="comment-edit"
                    v-show="page.isEnd ==='0'"
                    @click="editComment(item)"
                  >编辑</span>
                  <!-- <span type="del">删除</span>   &&item.cuid._id === user._id-->
                  <span class="comment-accept" v-show="page.isEnd ==='0'" @click="setBest(item)">采纳</span>
                </div>
              </div>
              <div v-show="comments.length>0" class="ui divider comment-divider"></div>
            </li>
            <!-- 无数据时 -->
            <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
          </ul>
          <div class="comment-pagination">
            <pagination
              v-show="comments.length>0&&total>0"
              :showType="'icon'"
              :hasSelect="false"
              :hasTotal="false"
              :total="total"
              :size="size"
              :current="current"
              :showEnd="true"
              @changeCurrent="handleChange"
              @changeLimit="handleLimit"
            ></pagination>
          </div>
          <form class="ui form comments-form">
            <ValidationObserver ref="observer" v-slot="{ validate }">
              <editor @changeContent="addContent" :initContent="editInfo.content"></editor>
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
              <button class="submit" @click="validate().then(submit)" type="button">提交回复</button>
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
                    <cite>{{item.cuid?item.cuid.name:'echo'}}</cite>
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
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { getDetail } from '@/api/content'
import { getComments, addComment } from '@/api/comments'
import { addCollect } from '@/api/user'
import Hotlist from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/components/Panel'
import Editor from '../modules/editor/Index'
import CodeMix from '@/mixin/code'
import Pagination from '@/components/modules/pagination/Index'
import { escapeHtml } from '@/util/escapeHtml'
import { scrollToElem } from '@/util/common'
export default {
  name: 'Detail',
  mixins: [CodeMix],
  props: ['tid'], // 路由传参
  components: {
    ValidationObserver,
    ValidationProvider,
    Hotlist,
    Ads,
    Links,
    Panel,
    Editor,
    pagination: Pagination
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
      },
      publicPath: process.env.BASE_URL
    }
  },
  mounted () {
    this.getPostDetail()
    this.getCommentsList()
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    handleLimit (val) {
      this.size = val
      this.getCommentsList()
    },
    getPostDetail () {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          this.page = res.data
        }
      })
    },
    getCommentsList () {
      getComments({
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
          // this.code = ''
          // this.editInfo.content = ''
          // const user = this.$store.state.userInfo
          // const cuid = {
          //   _id: user._id,
          //   pic: user.pic,
          //   name: user.name,
          //   isVip: user.isVip
          // }
          // res.data.cuid = cuid
          // this.comments.push(res.data)
          // requestAnimationFrame(() => {
          //   this.$refs.observer && this.$refs.observer.reset()
          // })
          location.reload() // 还有更好的方法
          // this._getCode()
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
    },
    setCollect () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        addCollect({
          tid: this.tid,
          title: this.page.title,
          isFav: this.page.isFav
        }).then(res => {
          if (res.code === 200) {
            console.log('setCollect -> res.code', res.code)
            this.page.isFav = !this.page.isFav
            console.log('setCollect -> res.code', this.page.isFav)
            this.$pop('', this.page.isFav ? '帖子收藏成功' : '帖子已取消收藏')
          }
        })
      } else {
        this.$pop('shake', '请先登录')
      }
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
  height: 100%;
  background-color: #e6e6e6;
}
.detail-info {
  position: relative;
  top: 20px;
  left: 7%;
  width: 90%;
  height: 100%;
}
.post-left {
  position: absolute;
  margin-bottom: 60px;
  width: 64%;
  padding: 15px;
}
.post-right {
  position: relative;
  top: -25px;
  width: 33%;
  left: 65%;
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
  top: 60px;
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
/* 评论列表 */
.comments-detail {
  position: relative;
  top: 55px;
  padding: 5px;
}
.comment-detial {
  position: relative;
  height: 160px;
}
.comment-top {
  position: realtive;
}
.user-avatar {
  position: relative;
}
.user-avatar img {
  width: 60px;
}
.comment-user-detail {
  position: absolute;
  top: 1px;
  left: 70px;
}
.comment-user-info {
  position: relative;
  left: 10px;
  color: #999;
}
.comment-created {
  position: absolute;
  top: 44px;
  left: 70px;
  color: #999;
}
.comment-body {
  position: relative;
  top: 10px;
}
.comment-bottom {
  position: relative;
  top: 20px;
  font-size: 16px;
}
.comment-zan {
  position: relative;
  color: #999;
}
.comment-reply {
  position: absolute;
  top: 1px;
  left: 60px;
  color: #999;
}
.comment-admin {
  position: absolute;
  top: 0px;
  right: 40px;
  color: #999;
}
.comment-edit {
  position: relative;
  left: -15px;
}
.comment-pagination {
  position: relative;
  top: 70px;
  z-index: 1;
}
.comment-divider {
  position: relative;
  top: 18px;
}
/* 回帖模块 */
.comments-module {
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
.ui.form {
  position: relative;
  top: 10px;
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
