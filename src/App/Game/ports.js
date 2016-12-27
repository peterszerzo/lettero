/* eslint max-len : "off" */
var ctrl = require('./controllers')

var fb = require('../../utilities/firebase')

module.exports = function (ports) {
  var db = fb.getDb()

  var shipToElm = function (obj) {
    ports.roomStateUpdate.send(JSON.stringify(obj))
  }

  var subscribedRoomIds = []

  ports.sendGameCommand.subscribe(function (msgString) {
    var msgObj = JSON.parse(msgString)
    var type = msgObj.type
    var roomId = msgObj.roomId
    var payload = msgObj.payload
    if (subscribedRoomIds.indexOf(roomId) === -1) {
      ctrl.watchRoom(db, roomId, shipToElm)
      subscribedRoomIds.push(roomId)
    }
    if (type === 'requestRoomState') {
      return ctrl.getRoom(db, roomId).then(shipToElm)
    }
    if (type === 'requestNewRound') {
      return ctrl.scheduleNewRound(db, payload).then(shipToElm)
    }
    if (type === 'player') {
      ctrl.updatePlayer(db, roomId, payload)
    }
  })
}
