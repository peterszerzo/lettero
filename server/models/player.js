import type {Guess} from './guess';

export type Player = {
  id : string,
  guess : ?Guess,
  score : number,
  isReady : boolean
};

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

export function setGuess(guess : Guess, player : Player) : Player {
  return Object.assign({}, player, {
    guess
  });
}

export function eraseGuess(player : Player) : Player {
  return setGuess(null, player);
}

export function winRound(player : Player) : Player {
  return Object.assign({}, player, {
    score: player.score + 1
  });
}

export function loseRound(player : Player) : Player {
  return player;
}
