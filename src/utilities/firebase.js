var firebase = require('firebase')

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}

var app, db

module.exports = {
  start: function () {
    app = firebase.initializeApp(config)
    db = app.database()
  },
  getDb: function () {
    return db
  }
}
