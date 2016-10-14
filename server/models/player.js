import type {Guess} from './guess';

export type PlayerId = string;

export type Player = {
  id : string,
  roomId : string,
  guess : Guess,
  score : number,
  isReady : boolean
};

export type Players = Array<Player>;

export function create(id : string) : Player {
  return {
    id,
    guess: null,
    score: 0,
    isReady: false
  };
}

export function setReady(player : Player) : Player {
  return Object.assign({}, player, {isReady: true});
}

export function winRound(player : Player) : Player {
  return Object.assign({}, player, {
    score: player.score + 1
  });
}

export function loseRound(player : Player) : Player {
  return Object.assign({}, player, {
    score: player.score
  });
}

export function eraseGuess(player : Player) : Player {
  return Object.assign({}, player, {
    guess: {
      value: 'pending',
      time: 0
    }
  });
}

export function getWinnerId(players : Players) : ?PlayerId {
  const winner =
    players
      .filter(player => player.guess.value === 0)
      .sort((a, b) => (a.guess.time - b.guess.time))[0];
  return winner && winner.id;
}

export function isDraw(players : Players) : boolean {
  return players.reduce(
    (accumulator, player) => {
      const guessValue = player.guess.value;
      return (
        accumulator &&
        (guessValue === 'idle' || (guessValue !== 'pending' && guessValue > 0))
      );
    },
    true
  );
}
