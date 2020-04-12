// 闭包测试
// function Test () {
//   var num = 0
//   const myfunction = function () {
//     num = num + 1
//     return num
//   }
//   return myfunction
// }
// const obj1 = Test()
// const obj2 = Test()
// const obj3 = Test()
// console.log(obj1(), obj2(), obj3())
// const result1 = obj()
// const result2 = obj()
// const result3 = obj()
// console.log(result1, result2, result3)

// 理解闭包
// var num1 = 1
// function Test () {
//   var num2 = 2
//   // console.log(num1)
//   function innerTest () {
//     return num2
//   }
//   return innerTest()
// }
// console.log(Test())

// var name = 'The Window'

// var object = {
//   name: 'My Object',

//   getNameFunc: function () {
//     var that = this
//     return function () {
//       return that.name
//     }
//   }

// }

// console.log(object.getNameFunc()())

// for (var i = 0; i < 5; ++i) {
//   //   (function (i) {
//   setTimeout(function () {
//     console.log(i + ' ')
//   }, 100)
//   //   }(i))
// }
// console.log(i)

// var name = 'windowsName'
// var a = {
//   name: null,
//   // name: "Cherry",
//   fn: function () {
//     console.log(this.name) // windowsName
//   }
// }

// var f = a.fn
// f()

for (var i = 0; i < 5; i++) {
  (function (j) {
    setTimeout(function () {
      console.log(j)
    }, 1000)
  })(i)
}
