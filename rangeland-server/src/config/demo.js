const User = require('./test')

const user = {
    name: 'brian',
    age: 30,
    email: 'test@toimc.com'
}

const createMethod = async () => {
    const data =new User(user)
    const result = await data.save()
    console.log(result)
}

const findMethod = async () => {
    const result = await User.find()
    console.log(result)
}

const updateMethod = async () => {
    const result = await User.updateOne({name:'brian'},{
        email:'leedawnm@163.com'
    })
    console.log(result)
}

const deleteMethod = async () => {
    const result = await User.deleteOne({name:'brian'})
    console.log(result)
}

findMethod()