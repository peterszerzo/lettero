var fb = require('../utilities/firebase')

var talkToGame = require('./Game/ports')

module.exports = function (ports) {
  const db = fb.getDb()
  ports.roomRequest.subscribe(function (roomId) {
    db.ref('/rooms/' + roomId)
      .once('value')
      .then(function (s) { return JSON.stringify(s.val()) })
      .then(function (s) {
        ports.roomResponse.send(s)
      })
  })

  ports.createRoomRequest.subscribe(function (msg) {
    const room = JSON.parse(msg)
    db.ref('/rooms/' + room.id).set(room).then(function () {
      ports.createRoomResponse.send('success')
    }).catch(function () {
      ports.createRoomResponse.send('error')
    })
  })

  talkToGame(ports)

  global.onbeforeunload = function () {
    ports.closeTab.send('')
  }
}
