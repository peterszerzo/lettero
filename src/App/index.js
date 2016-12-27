var Elm = require('./Main.elm')
var talk = require('./ports.js')

module.exports = function (domNode) {
  domNode.innerHTML = ''
  const elmApp = Elm.Main.embed(domNode)
  talk(elmApp.ports)
}
