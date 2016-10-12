import pg from 'pg';

export function connect() {
  return new Promise((resolve, reject) => {
    pg.connect(process.env.DATABASE_URL, (err, client, done) => {
      if (err) {
        reject(err);
        return;
      }
      client.query('SELECT * FROM information_schema.tables', (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(client);
      });
    });
  });
}

export const createRooms = `
CREATE TABLE rooms(
  id varchar(50) primary key not null,
  round int not null,
  round_data json not null
)
`;

export const createPlayers = `
CREATE TABLE players(
  id varchar(50) primary key not null,
  room_id varchar(50) references rooms(id),
  score int not null,
  guess json,
  is_ready boolean not null
)
`;
