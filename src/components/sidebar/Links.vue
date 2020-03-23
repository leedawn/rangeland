<template>
  <div class="friendly-link">
    <h3>项目链接</h3>
    <div class="ui divider"></div>
    <table class="ui basic table">
      <tr>
        <td>
          <router-link :to="{name:'home'}">游戏评分信息</router-link>
        </td>
        <td>
          <router-link :to="{name:'demo'}">Vue Demo</router-link>
        </td>
      </tr>
      <tr>
        <td>
          <router-link :to="{name:'ulikecam'}">剪映</router-link>
        </td>
        <td>
          <router-link :to="{name:'semantic'}">semantic</router-link>
        </td>
      </tr>
      <tr>
        <td>
          <router-link :to="{name:'blog-home'}">Blog</router-link>
        </td>
        <td>
          <router-link :to="{name:'blog-home'}">fever</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>
