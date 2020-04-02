
<template>
  <div id="blog-home" data-tab="blog">
    <h1>{{ page_title }}</h1>
    <!-- 创建 `v-for` 并为 Vue 应用一个 `key`，该示例使用了 `slug` 和 `index` 的组合。 -->
    <div v-for="(post,index) in posts" :key="post.slug + '_' + index">
      <router-link :to="'/blog/' + post.slug">
        <article>
          <figure>
            <!-- 使用 `:` 绑定结果 -->
            <!-- 使用一组 `v-if`/`else` 判断它们是否是 `featured_image` -->
            <img class="ui small image" v-if="post.featured_image" :src="post.featured_image" alt />
            <img class="ui small image" v-else src="http://via.placeholder.com/250x250" alt />
          </figure>
          <h2>{{ post.title }}</h2>
          <p>{{ post.summary }}</p>
        </article>
      </router-link>
    </div>
  </div>
</template>

<script>
import Butter from 'buttercms'

export default {
  name: 'blog-home',
  data () {
    return {
      page_title: 'Blog',
      posts: []
    }
  },
  methods: {
    getPosts () {
      const butter = Butter('ca435e59391fea39b4428c21a45ed1f2df567d0a')
      butter.post
        .list({
          page: 1,
          page_size: 10
        })
        .then(res => {
          this.posts = res.data.data
        })
    }
  },
  created () {
    this.getPosts()
  }
}
</script>
