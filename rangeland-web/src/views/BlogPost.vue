<script>
import Butter from 'buttercms'
export default {
  name: 'blog-post',
  data () {
    return {
      post: {}
    }
  },
  methods: {
    getPost () {
      const butter = Butter('ca435e59391fea39b4428c21a45ed1f2df567d0a')
      butter.post.retrieve(this.$route.params.slug)
        .then(res => {
          this.post = res.data
        }).catch(res => {
          console.log(res)
        })
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.getPost()
      }
    }
  }
}
</script>

<template>
  <div id="blog-post">
    <h1>{{ post.data.title }}</h1>
    <h4>{{ post.data.author.first_name }} {{ post.data.author.last_name }}</h4>
    <div v-html="post.data.body"></div>

    <router-link
      v-if="post.meta.previous_post"
      :to="/blog/ + post.meta.previous_post.slug"
      class="button"
    >
      {{ post.meta.previous_post.title }}
    </router-link>
    <router-link
      v-if="post.meta.next_post"
      :to="/blog/ + post.meta.next_post.slug"
      class="button"
    >
      {{ post.meta.next_post.title }}
    </router-link>
  </div>
</template>
