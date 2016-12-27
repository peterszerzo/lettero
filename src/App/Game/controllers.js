var wordsCache

function curry (fx) {
  const arity = fx.length
  return function f1 () {
    const args = Array.prototype.slice.call(arguments, 0)
    if (args.length >= arity) {
      return fx.apply(null, args)
    } else {
      return function f2 () {
        var args2 = Array.prototype.slice.call(arguments, 0)
        return f1.apply(null, args.concat(args2))
      }
    }
  }
}

var getRoom = curry(
  function (db, roomId) {
    return (
      db.ref('/rooms/' + roomId)
        .once('value')
        .then(function (s) { return s.val() })
    )
  }
)

var listWords = curry(
  function (db) {
    if (wordsCache) {
      return Promise.resolve(wordsCache)
    }
    return (
      db.ref('/roundData/words')
        .once('value')
        .then(function (s) { return Object.keys(s.val()) })
    )
  }
)

var saveRoom = curry(
  function (db, rm) {
    return (
      Promise.all([
        Promise.resolve(rm),
        db.ref('/rooms/' + rm.id).set(rm)
      ]).then(function (data) { return data[0] })
    )
  }
)

var watchRoom = curry(
  function (db, roomId, onValue) {
    return db.ref('/rooms/' + roomId).on('value', function (s) {
      onValue(s.val())
    })
  }
)

var updatePlayer = curry(
  function (db, roomId, player) {
    db.ref('/rooms/' + roomId + '/players/' + player.id).set(player)
  }
)

var setNewRound = curry(
  function (db, room) {
    return (
      listWords(db)
        .then(function (words) {
          return Object.assign({}, room, {
            roundData: {
              word: words[Math.floor(Math.random() * words.length)]
            }
          })
        }).then(saveRoom(db))
    )
  }
)

var scheduleNewRound = curry(
  function (db, room) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        setNewRound(db, room).then(resolve).catch(reject)
      }, 3000)
    })
  }
)

module.exports = {
  getRoom: getRoom,
  listWords: listWords,
  saveRoom: saveRoom,
  watchRoom: watchRoom,
  updatePlayer: updatePlayer,
  setNewRound: setNewRound,
  scheduleNewRound: scheduleNewRound
}
