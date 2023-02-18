import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.page'
import Signup from './pages/signup/Signup.page'
import Signin from './pages/signin/Signin.page'
import './App.css'

const App = () => {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/signin' element={<Signin />} />
			</Routes>
		</div>
	)
}

export default App
