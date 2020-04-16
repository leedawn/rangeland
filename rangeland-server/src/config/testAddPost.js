const Post = require('../model/Post')

const post = {
    uid: '1234',
    content: 'test add post',
    created: new Date(),
    catalog: 'none',
    fav:'yes'
}

const createMethod = async () => {
    const data =new Post(post)
    const result = await data.save()
    console.log(result)
}
createMethod()

// uid: { type: String, ref: 'users' },
//   title: { type: String },
//   content: { type: String },
//   created: { type: Date },
//   catalog: { type: String },
//   fav: { type: String },