const moment = require('moment')

const result = moment().format('ddd')
console.log(result)
console.log(moment().endOf('day').fromNow())
console.log(moment().locale())
console.log(moment().format('LLL'))
moment().set('year', 2017)
console.log(moment().year())
