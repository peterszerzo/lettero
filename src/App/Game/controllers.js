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
    return db.ref(`/rooms/${roomId}`).on('value', s => {
      onValue(s.val());
    });
  }
);

export const updatePlayer = curry(
  (db, roomId, player) => {
    db.ref(`/rooms/${roomId}/players/${player.id}`).set(player);
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
        const newPlayers = {};
        Object.keys(rm.players).forEach(key => {
          newPlayers[key] = Object.assign({}, rm.players[key], {
            guess: {
              value: 'pending',
              time: 0
            }
          });
        });
        const newRm = Object.assign({}, rm, {
          round: rm.round + 1,
          roundData: {
            word: words[Math.floor(Math.random() * words.length)]
          },
          players: newPlayers
        });
        return newRm;
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
