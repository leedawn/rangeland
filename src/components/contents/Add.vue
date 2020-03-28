<template>
  <div class="add-post">
    <div class="container">
      <div class="top-menu">
        <div class="post-tab">发表新帖</div>
      </div>
      <hr class="selected-line" />
      <hr class="cutting-line" />
      <validation-observer ref="observer" v-slot="{validate}">
        <form>
          <div class="classify">
            <!-- <validation-provider name="catalog" rules="is_not:请选择" v-slot="{errors}"> -->
            <div class="special-column">
              <div class="text">所在专栏</div>
              <select class="ui dropdown special">
                <option value="none">请选择</option>
                <option value="提问">提问</option>
                <option value="分享">分享</option>
                <option value="分享">讨论</option>
                <option value="建议">建议</option>
              </select>
              <!-- <span>{{errors[0]}}</span> -->
            </div>
            <!-- </validation-provider> -->
            <!-- <validation-provider name="title" rules="required" v-slot="{errors}"> -->
            <div class="title">
              <div class="text">标题</div>
              <input class="title-input" type="text" v-model="title" />
              <!-- <span>{{errors[0]}}</span> -->
            </div>
            <!-- </validation-provider> -->
          </div>
          <editor @changeContent="add" :initContent="content"></editor>
          <div class="kiss">
            <div class="text">悬赏飞吻</div>
            <select class="ui dropdown kiss">
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="80">80</option>
            </select>
            <div class="description">发表后无法更改飞吻</div>
          </div>
          <!-- <validation-provider
            name="code"
            ref="codefield"
            rules="required|length:4"
            v-slot="{errors}"
          >-->
          <div class="code">
            <div class="text">验证码</div>
            <input class="code-input" type="text" name="code" v-model="code" placeholder="请输入验证码" />
            <span class="svg" @click="_getCode()" v-html="svg"></span>
            <!-- <span>{{errors[0]}}</span> -->
          </div>
          <!-- </validation-provider> -->
          <button class="publish" @click="validate().then(submit)">立即发布</button>

          <div class="dropdown-wrapper" @click="changeSelect()">
            <div class="dropdown-input">
              <input type="text" placeholder="请选择" readonly v-model="catalogs[cataIndex].text" />
            </div>
            <dl class="dropdown-select" v-show="isSelect">
              <dd
                v-for="(item,index) in catalogs"
                :key="'catalog'+index"
                @click="chooseCatalog(item,index)"
              >{{item.text}}</dd>
            </dl>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>
<script>
import Editor from '../modules/editor/Index'
import { addPost } from '@/api/content'
import CodeMix from '@/mixin/code'
export default {
  name: 'add',
  mixins: [CodeMix],
  components: {
    Editor
  },
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '讨论',
          value: 'discuss'
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favlist: [20, 30, 50, 60, 80],
      content: '',
      title: ''
    }
  },
  mounted () {
    // const saveData = localStorage.getItem('addData')
    // if (saveData && saveData !== '') {
    //   this.$confirm(
    //     '是否加在未编辑完的内容？',
    //     () => {
    //       const obj = JSON.parse(saveData)
    //       this.content = obj.content
    //       this.title = obj.title
    //       this.cataIndex = obj.cataIndex
    //       this.favIndex = obj.favIndex
    //     },
    //     () => {
    //       localStorage.setItem('addData', '')
    //     }
    //   )
    // }
  },
  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    chooseFav (item, index) {
      this.favIndex = index
    },
    changeSelect () {
      this.isSelect = !this.isSelect
    },
    changeFav () {
      this.isSelect_fav = !this.isSelect
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
      console.log('submit -> isValid', isValid)
      if (!isValid) {
        return
      }
      if (this.content.trim() === '') {
        this.$alert('文章内容不得为空！')
        return
      }
      console.log(
        'submit -> title',
        this.title,
        this.code,
        this.$store.state.sid
      )
      addPost({
        title: this.title,

        // catalog: this.catalogs[this.cataIndex].value,
        // content: this.content,
        // fav: this.favList(this.favIndex),
        code: this.code,
        sid: this.$store.state.sid
      })
        .then(res => {
          console.log('submit -> res', res)
          debugger
          // if (res.code === 200) {
          //   localStorage.setItem('addData', '')
          //   this.$alert('发帖成功～2s后跳转')
          //   setTimeout(() => {
          //     this.$router.push({ name: 'index' })
          //   }, 2000)
          // } else {
          //   this.$alert(res.msg)
          // }
        })
        .catch(err => {
          const data = err.response.data
          console.log('submit -> data', data)
          debugger
        })
    }
  },
  computed: {
    isHide () {
      return this.$store.state.isHide
    }
  }
}
</script>
<style scoped>
.add-post {
  width: 2560px;
  height: 3000px;
  background-color: #fbfbfb;
}
.container {
  position: absolute;
  left: 5%;
  top: 25%;
  width: 90%;
  height: 800px;
  background-color: #fff;
  padding: 50px;
}
.post-tab {
  position: relative;
  left: 10px;
  color: #009688;
  font-size: 18px;
  padding: 4px;
}
.selected-line {
  position: absolute;
  width: 100px;
  border: 1px solid #009688;
  z-index: 10;
}
.cutting-line {
  position: relative;
  z-index: 0;
}
.special-column {
  position: absolute;
  top: 100px;
}
.text {
  position: absolute;
  border: 1px solid #e6e6e6;
  background-color: #fbfbfb;
  width: 120px;
  font-size: 15px;
  padding: 10px 18px;
  text-align: center;
}
.ui.dropdown.special {
  position: absolute;
  top: 2px;
  left: 120px;
  width: 150px;
  /* background-color: white; */
}
.title {
  position: absolute;
  top: 96px;
  left: 400px;
}
.title-input {
  position: absolute;
  top: -10px;
  left: 110px;
  width: 400px;
}
.kiss {
  position: relative;
  top: 100px;
}
.ui.dropdown.kiss {
  position: absolute;
  top: 2px;
  left: 120px;
  width: 150px;
  background-color: white;
}
.description {
  position: absolute;
  top: 13px;
  left: 290px;
  color: #999;
}
.code {
  position: relative;
  top: 170px;
}
.code-input {
  position: absolute;
  top: -10px;
  left: 110px;
}
.svg {
  position: absolute;
  top: -10px;
  left: 300px;
}
.publish {
  position: relative;
  top: 270px;
  background-color: #009688;
  padding: 15px;
  color: white;
}

.dropdown-wrapper {
  position: relative;
  top: 250px;
}
.dropdown-input {
  position: absolute;
}
.dropdown-select {
  position: absolute;
  top: 35px;
  left: 10px;
  border: 1px solid rgb(230, 230, 230);
  width: 170px;
}
</style>
