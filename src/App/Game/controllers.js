let wordsCache

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

export const getRoom = curry(
  (db, roomId) => {
    return db.ref(`/rooms/${roomId}`).once('value').then(s => s.val())
  }
)

export const listWords = curry(
  (db) => {
    if (wordsCache) {
      return Promise.resolve(wordsCache)
    }
    return db.ref('/roundData/words').once('value').then(s => Object.keys(s.val()))
  }
)

export const saveRoom = curry(
  (db, rm) => {
    return (
      Promise.all([
        Promise.resolve(rm),
        db.ref(`/rooms/${rm.id}`).set(rm)
      ]).then(data => data[0])
    )
  }
)

export const watchRoom = curry(
  (db, roomId, onValue) => {
    return db.ref(`/rooms/${roomId}`).on('value', s => {
      onValue(s.val())
    })
  }
)

export const updatePlayer = curry(
  (db, roomId, player) => {
    db.ref(`/rooms/${roomId}/players/${player.id}`).set(player)
  }
)

export const setNewRound = curry(
  (db, room) => {
    return listWords(db)
      .then(words => {
        return Object.assign({}, room, {
          roundData: {
            word: words[Math.floor(Math.random() * words.length)]
          }
        })
      }).then(saveRoom(db))
  }
)

export const scheduleNewRound = curry(
  (db, room) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setNewRound(db, room).then(resolve).catch(reject)
      }, 3000)
    })
  }
)
