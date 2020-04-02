var redis=require('redis')
var client=redis.createClient(15001,'47.99.202.255',{auth_pass:'123456'})
client.on('ready',function(res){
    console.log('ready')
})

client.on('connect',function(){
    client.set('author','Wilson',redis.print)
    client.get('author',redis.print)
    console.log('connect')
})

client.on('connect',function(){
    client.hmset('short',{'js':'javascript','c#':'c sharp'},redis.print)
    client.hmset('short','SQL','Structured Query Language',redis.print)
    client.hgetall('short',function(err,res){
        if(err){
            console.log('error:'+err)
            return
        }
        console.dir(res)  // 打印对象
        console.log(res)
    })
})