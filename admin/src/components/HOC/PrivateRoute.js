import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
	let token = localStorage.getItem('token')
	return token ? <Outlet /> : <Navigate to={`/signin`} />
}

export default PrivateRoute
