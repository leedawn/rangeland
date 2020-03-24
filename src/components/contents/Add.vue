<template>
  <div class="add-post">
    <div class="container">
      <div class="top-menu">
        <div class="post-tab">发表新帖</div>
      </div>
      <hr class="selected-line" />
      <hr class="cutting-line" />
      <div class="classify">
        <div class="special-column">
          <div class="text">所在专栏</div>
          <select class="ui dropdown special">
            <option value>请选择</option>
            <option value="提问">提问</option>
            <option value="分享">分享</option>
            <option value="分享">讨论</option>
            <option value="建议">建议</option>
          </select>
        </div>
        <div class="title">
          <div class="text">标题</div>
          <input class="title-input" />
        </div>
      </div>
      <editor></editor>
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
      <div class="code">
        <div class="text">验证码</div>
        <input class="code-input" />
      </div>
      <button class="publish">立即发布</button>
    </div>
  </div>
</template>
<script>
import Editor from '../modules/editor/Index'
export default {
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
    // const saveData = localStorage.getItem(addData)
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
  z-index: 1000;
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
  background-color: white;
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
.publish {
  position: relative;
  top: 270px;
  background-color: #009688;
  padding: 15px;
  color: white;
}
</style>
