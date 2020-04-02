// import { addComment } from '../comments'
const { addComment } = require('./comments')

const options = {
  sid: 'f7ddd7c2-ec22-4854-a5cc-e218773b3e2e',
  code: 'm7mu',
  content: 'test'
}
addComment.addComment(options)
