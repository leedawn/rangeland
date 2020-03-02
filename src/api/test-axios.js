const axios = require('axios')
axios.get('http://localhost:3000/public/getCaptcha').then(function (response) {
  console.log(response)
  console.log(response.status)
}).catch(function (error) {
  console.log(error)
})
