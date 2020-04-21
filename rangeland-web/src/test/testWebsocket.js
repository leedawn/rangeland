var ws = new WebSocket('wss://echo.websocket.org')

ws.onopen = function (evt) {
  console.log('Connection open ...')
  ws.send('Hello WebSockets2!')
  console.log(ws.readyState)
}

ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data)
  ws.close()
}

ws.onclose = function (evt) {
  var code = evt.code
  console.log(code)
  console.log('Connection closed.')
}
