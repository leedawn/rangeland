<template>
  <div class="detail">
    <div class="topbar">
      <div class="ui secondary menu">
        <a class="item active">首页</a>
        <a class="item">提问</a>
        <a class="item">分享</a>
        <a class="item">讨论</a>
        <a class="item">建议</a>
        <a class="item">公告</a>
        <a class="item">动态</a>
        <div class="right menu">
          <div class="item">
            <div class="ui icon input">
              <input type="text" placeholder="请输入搜索内容" />
              <i class="search link icon"></i>
            </div>
          </div>
          <div class="post-new-post">
            <button class="ui positive basic button">发表新帖</button>
          </div>
        </div>
      </div>
    </div>
    <div class="post-content">
      <div class="ui stackable two column grid">
        <div class="column">
          <div class="ui relaxed divied list">
            <div class="post-list">
              <div class="item stick">
                <h3>置顶</h3>
              </div>
              <div class="item">
                <i class="large github middle aligned icon"></i>
                <div class="content">
                  <div class="header">
                    <button>提问</button>
                    <a>test2</a>
                  </div>
                  <div class="description">
                    mock 3天前
                    <i class="heart outline icon"></i>
                    <i class="comment alternate outline icon"></i>
                  </div>
                </div>
              </div>
              <div class="item">
                <i class="large github middle aligned icon"></i>
                <div class="content">
                  <a class="header">Semantic-Org/Semantic-UI-Meteor</a>
                  <div class="description">Updated 34 mins ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="warm-channel">
            <div class="table-name"><h3>温馨通道</h3></div>
            <table class="ui celled table">
              <tbody>
                <tr>
                  <td data-label="test">imooc</td>
                  <td data-label="test">imooc</td>
                </tr>
                <tr>
                  <td data-label="test">imooc</td>
                  <td data-label="test">imooc</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="user-info"></div>
          <div class="this-week--heated-discussion"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import listMix from '@/mixin/list'
export default {
  name: 'detail',
  mixins: [listMix],
  //   data() {
  //     return {
  //       items: {
  //         title: 'hello',
  //         pic: 'test'
  //       }
  //     }
  //   },
  //   props: {
  //     lists: {
  //       default: () => [],
  //       type: Array
  //     },
  //     isShow: {
  //       default: true,
  //       type: Boolean
  //     },
  //     isEnd: {
  //       default: false,
  //       type: Boolean
  //     }
  //   },
  computed: {
    // items () {
    //   this.lists.map(item => {
    //     switch (item.catalog) {
    //       case 'ask':
    //         item.catalog = '提问'
    //         break
    //       case 'share':
    //         item.catalog = '分享'
    //         break
    //       case 'logs':
    //         item.catalog = '动态'
    //         break
    //       case 'notice':
    //         item.catalog = '公告'
    //         break
    //       case 'advise':
    //         item.catalog = '建议'
    //         break
    //       case 'discuss':
    //         item.catalog = '交流'
    //         break
    //     }
    //   })
    //   return this.lists
    // }
  },
  methods: {
    // more() {
    //   this.$emit('nextpage')
    // }
  }
}
</script>
<style>
.detail {
  width: 100%;
  background-color: gray;
  height: 2000px;
}
.topbar {
  background-color: white;
  padding-left: 40px;
  padding-right: 40px;
}
.post-new-post {
  margin-right: 30px;
  margin-top: 5px;
}
.post-content {
  width: 90%;
  margin-left: auto; /*设置浏览器边距*/
  margin-right: auto;
  margin-top: 20px;
}
.post-list {
  background-color: white;
  padding:7px;
  padding-left:14px;
}
.warm-channel {
    background-color: white;
    padding:7px;
}
</style>
