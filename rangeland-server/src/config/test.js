// var redisConfig=require('./RedisConfig')

// redisConfig.setValue('imooc', 'imooc message from redis client')

// redisConfig.getValue('imooc').then((res) => {
//   console.log('getValue:' + res)
// })

// redisConfig.delValue('imooc')

// redisConfig.setValue('imoocobj', {name: 'brian', age: 30, email: 'brian@toimc.com'})

// redisConfig.getHValue('imoocobj').then((res) => {
//   console.log('getHValue:' +JSON.stringify(res, null, 2))
// })


var mongoose = require('./DBHelper');
const Schema = mongoose.Schema
const TestSchema = new Schema({
  'name': {type:String},
  'age': {type:Number},
  'email': {type:String},
})
const TestModel= mongoose.model('users',TestSchema)
module.exports=TestModel




// 官网上的例子
// var db = mongoose.connection
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   var kittySchema = new mongoose.Schema({
//     name: String
//   });
//   kittySchema.methods.speak = function () {
//     var greeting = this.name
//       ? "Meow name is " + this.name
//       : "I don't have a name";
//     console.log(greeting);
//   }
//   var Kitten = mongoose.model('Kitten', kittySchema);
// var fluffy = new Kitten({ name: 'fluffy' });
// console.log(fluffy.name); // 'Felyne'
// fluffy.speak(); // "Meow name is flu
// });






// var Kitten = mongoose.model('Kitten', kittySchema);

// var fluffy = new Kitten({ name: 'fluffy' });


// fluffy.save(function (err, fluffy) {
//   if (err) return console.error(err);
//   fluffy.speak;
// });

// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

// Kitten.find({ name: /^fluff/ }, callback);