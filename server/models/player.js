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

export function setReady(player : Player) : Player {
  return Object.assign({}, player, {isReady: true});
}

export function eraseGuess(player : Player) : Player {
  return Object.assign({}, player, {
    guess: {
      value: 'pending',
      time: 0
    }
  });
}
