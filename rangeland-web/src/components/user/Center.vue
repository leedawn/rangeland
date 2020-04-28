<template>
  <div class="right-content-container">
    <div class="user-welcome">Hi,Admin,您已经是我们的正式会员！</div>
    <div class="ui card vip">
      <div class="user-content">我的会员信息</div>
      <div class="extra content">
        <p>
          积分经验值：
          <b class="font-red">60</b>
        </p>
        <p>
          您当前为：
          <b class="font-red">非VIP</b>
        </p>
      </div>
    </div>
    <div class="ui card sign-in">
      <div class="user-content">
        <p class="tab">
          <a>签到</a>｜
          <a>说明</a>｜
          <a>活跃榜</a>
        </p>
        <p class="days" v-show="isSign||isLogin">
          已连续签到
          <b class="font-red">{{count}}</b>天
        </p>
      </div>
      <div class="extra content today-info">
        <button class="ui red button today-sign-in" @click="sign()">今日签到</button>
        <p class="kiss">
          可获得
          <b class="font-red">{{favs}}</b>飞吻
        </p>
      </div>
    </div>
    <div class="ui card shortcut">
      <div class="content">快捷方式</div>
      <div class="extra content">
        <div class="ui massive image my_image">
          <i class="users icon"></i>
        </div>
        <p>后台管理</p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'dayjs'
import { userSign } from '@/api/user'
export default {
  name: 'sign',
  data () {
    return {
      isShow: false,
      showList: false,
      current: 0,
      isSign: false,
      msg: '',
      ctrl: ''
    }
  },
  mounted () {
    const isSign = this.$store.state.userInfo.isSign
    const lastSign = this.$store.state.userInfo.lastSign
    const nowDate = moment().format('YYYY-MM-DD')
    const lastDate = moment(lastSign).format('YYYY-MM-DD')
    const diff = moment(nowDate).diff(moment(lastDate), 'day')
    if (diff > 0 && isSign) {
      this.isSign = false
    } else {
      this.isSign = isSign
      if (diff === 0 && isSign) {
        this.nextSign()
      } else {
        this.msg = '今日已签到'
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    favs () {
      const count = parseInt(this.count)
      let result = 0
      if (count < 5) {
        result = 5
      } else if (count >= 5 && count < 15) {
        result = 10
      } else if (count >= 15 && count < 30) {
        result = 15
      } else if (count >= 30 && count < 100) {
        result = 20
      } else if (count >= 100 && count < 365) {
        result = 30
      } else if (count >= 365) {
        result = 50
      }
      return result
    },
    count () {
      if (this.$store.state.userInfo !== {}) {
        if (typeof this.$store.state.userInfo.count !== 'undefined') {
          return this.$store.state.userInfo.count
        } else {
          return 0
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    sign () {
      if (!this.isSign) {
        this.$pop('shake', '请先登录')
        return
      }
      userSign().then(res => {
        const user = this.$store.state.userInfo
        if (res.code === 200) {
          user.favs = res.favs
          user.count = res.count
          this.$pop('', '签到成功！')
        } else {
          this.$pop('', '您已经签到！')
        }
        user.isSign = true
        user.lastSing = res.lastSign
        this.isSign = true
        this.$store.commit('setUserInfo', user)
      })
      //   this.nextSign()
    }
  }
}
</script>
<style scoped>

</style>
