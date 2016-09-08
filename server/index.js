require('babel-register');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

require('./server');
