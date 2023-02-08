import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Index.home'
import Signin from './pages/signin/Index.signin'
import Signup from './pages/signup/Index.page'
import './App.css'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signin' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</div>
	)
}

export default App
