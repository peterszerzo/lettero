export type Player = {
  id : string,
  guess : ?number,
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

export function setGuess(player : Player, guess : number) : Player {
  return Object.assign({}, player, {guess});
}

export function winRound(player : Player) : Player {
  return Object.assign({}, player, {
    score: player.score + 1,
    guess: null
  });
}

export function loseRound(player : Player) : Player {
  return Object.assign({}, player, {
    guess: null
  });
}
