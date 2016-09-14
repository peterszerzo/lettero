import type {Guess} from './guess';

export type PlayerId = string;

export type Player = {
  id : PlayerId,
  guess : ?Guess,
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

export function getWinnerId(players : Players) : ?PlayerId {
  const winner =
    players
      .filter(player => player.guess && player.guess.value === 0)
      .sort((a, b) => (a.time - b.time))[0];
  return winner && winner.id;
}
