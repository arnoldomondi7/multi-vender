import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store } from './rtk/app/store'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
