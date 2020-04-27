<template>
  <div class="homepage-wrapper">
    <panel></panel>
    <div class="post-content-wrapper">
      <div class="post-list">
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
                <div class="code-wrapper">
                  <div class="text">验证码</div>
                  <input
                    class="code-input"
                    type="text"
                    name="code"
                    v-model="code"
                    placeholder="请输入验证码"
                  />
                  <span class="svg" @click="_getCode()" v-html="svg"></span>
                  <span class="code-error-message">{{errors[0]}}</span>
                </div>
              </ValidationProvider>
              <button class="publish" @click="validate().then(submit)" type="button">提交回复</button>
            </ValidationObserver>
          </form>
        </div>
      </div>
      <div class="sidebar">
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
import addPicURL from '@/util/addPicURL'
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
          res.data.uid.pic = addPicURL(res.data.uid.pic)
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
          for (const temp of res.data) {
            temp.cuid.pic = addPicURL(temp.cuid.pic)
          }
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

</style>
