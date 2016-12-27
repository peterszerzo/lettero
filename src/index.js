require('./index.compiled.css')
var domReady = require('domready')
var attachFastClick = require('fastclick')
var App = require('./App')
var fb = require('./utilities/firebase')

domReady(function () {
  fb.start()
  attachFastClick.attach(document.body)
  App(document.getElementById('app'))
})
