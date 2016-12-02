import Elm from './Main.elm'
import talk from './ports.js'

export default (domNode) => {
  domNode.innerHTML = ''
  const {ports} = Elm.Main.embed(domNode)
  talk(ports)
}
