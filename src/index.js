require('./index.compiled.css')
var attachFastClick = require('fastclick')
var App = require('./App')
var fb = require('./utilities/firebase')

console.log('Hi, Mom!')
fb.start()
attachFastClick.attach(document.body)
App(document.getElementById('app'))
