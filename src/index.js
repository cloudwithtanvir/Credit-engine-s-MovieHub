import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)

serviceWorker.unregister()
