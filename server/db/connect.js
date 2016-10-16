// This is an experiment - Lettero might or might not run on postgres :).

import pg from 'pg';

export default function connect() {
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