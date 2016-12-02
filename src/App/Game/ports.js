/* eslint max-len : "off" */
import {
  scheduleNewRound,
  getRoom,
  watchRoom,
  updatePlayer
} from './controllers'
import {getDb} from '../../utilities/firebase'

export default (ports) => {
  const db = getDb()

  const shipToElm = (obj) => {
    ports.roomStateUpdate.send(JSON.stringify(obj))
  }

  const subscribedRoomIds = []

  ports.sendGameCommand.subscribe((msgString) => {
    const {type, roomId, payload} = JSON.parse(msgString)
    if (subscribedRoomIds.indexOf(roomId) === -1) {
      watchRoom(db, roomId, shipToElm)
      subscribedRoomIds.push(roomId)
    }
    if (type === 'requestRoomState') {
      return getRoom(db, roomId).then(shipToElm)
    }
    if (type === 'requestNewRound') {
      return scheduleNewRound(db, payload).then(shipToElm)
    }
    if (type === 'player') {
      updatePlayer(db, roomId, payload)
    }
  })
}
