import domReady from 'domready'
import attachFastClick from 'fastclick'
import './index.css'
import App from './App'
import {start as startFirebase} from './utilities/firebase'

domReady(() => {
  startFirebase()
  attachFastClick.attach(document.body)
  App(document.getElementById('app'))
})
