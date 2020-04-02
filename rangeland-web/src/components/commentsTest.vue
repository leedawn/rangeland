<template>
  <div>{{test}}</div>
</template>
<script>
import { addComment } from '../api/comments'
export default {
  data () {
    return [
      {
        options: 'test'
      }
    ]
  },
  computed: {
    test () {
      const options = {
        sid: 'f7ddd7c2-ec22-4854-a5cc-e218773b3e2e',
        code: 'm7mu',
        content: 'test'
      }
      return addComment(options)
    }
  }
}
</script>
