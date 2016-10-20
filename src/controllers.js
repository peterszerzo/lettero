import curry from 'lodash/curry';

let wordsCache;

export const getRoom = curry(
  (db, roomId) => {
    return db.ref(`/rooms/${roomId}`).once('value').then(s => s.val());
  }
);

export const listWords = curry(
  (db) => {
    if (wordsCache) {
      return Promise.resolve(wordsCache);
    }
    return db.ref('/words').once('value').then(s => s.val());
  }
);

export const saveRoom = curry(
  (db, rm) => {
    return (
      Promise.all([
        Promise.resolve(rm),
        db.ref(`/rooms/${rm.id}`).set(rm)
      ]).then(data => data[0])
    );
  }
);

export const watchRoom = curry(
  (db, roomId, onValue) => {
    return db.ref(`/rooms/${roomId}`).on('value', s => onValue(s.val()));
  }
);

export const updatePlayer = curry(
  (db, roomId, player) => {
    return getRoom(db, roomId)
      .then(rm => {
        return Object.assign({}, rm, {
          players: rm.players.map(p => (p.id === player.id ? player : p))
        });
      }).then(saveRoom(db));
  }
);

export const setNewRound = curry(
  (db, roomId) => {
    return getRoom(db, roomId)
      .then(rm => {
        return Promise.all([
          Promise.resolve(rm),
          listWords(db)
        ]);
      })
      .then(([rm, words]) => {
        return Object.assign({}, rm, {
          round: rm.round + 1,
          roundData: {
            word: words[Math.floor(Math.random() * words.length)]
          },
          players: rm.players.map(player => Object.assign({}, player, {
            guess: {
              value: 'pending',
              time: 0
            }
          }))
        });
      })
      .then(saveRoom(db));
  }
);

export const scheduleNewRound = curry(
  (db, roomId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        setNewRound(db, roomId).then(resolve).catch(reject);
      }, 3000);
    });
  }
);
