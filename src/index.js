import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

import './assets/style/init.css'
import './assets/style/iconfont/iconfont.css'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// render(
//   <App />,
//   document.getElementById('root')
// )
