export const rooms = {
  create() {
    return (
`
CREATE TABLE rooms(
  id varchar(50) primary key not null,
  round int not null,
  round_data json not null
);
`
    );
  },

  insertInto({id, round, roundData}) {
    return (
`
INSERT INTO rooms VALUES
  ( '${id}'
  , ${round}
  , '${JSON.stringify(roundData)}'
  );
`
    );
  }
};


export const players = {
  create() {
    return (
`
CREATE TABLE players(
  id varchar(50) primary key not null,
  room_id varchar(50) references rooms(id),
  score int not null,
  guess json,
  is_ready boolean not null
);
`
    );
  },

  insertInto({id, roomId, score, guess, isReady}) {
    return (
`
INSERT INTO players VALUES
  ( '${id}'
  , '${roomId}'
  , ${score}
  , '${JSON.stringify(guess)}'
  , ${isReady}
  );
`
    );
  }
};
