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
