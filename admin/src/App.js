import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Index.home'
import Signin from './pages/signin/Index.signin'
import Signup from './pages/signup/Index.page'
import PrivateRoute from './components/HOC/PrivateRoute'
import { isUserLoggedIn } from './redux/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import Products from './pages/products/Products.page'
import Orders from './pages/orders/Orders.page'
import './App.css'

const App = () => {
	const auth = useSelector(state => state.auth)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn())
		}
	}, [dispatch, auth.authenticate])
	return (
		<div className='App'>
			<Routes>
				<Route element={<PrivateRoute />}>
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
					<Route path='/orders' element={<Orders />} />
				</Route>
				<Route path='/signin' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />
			</Routes>
		</div>
	)
}

export default App
