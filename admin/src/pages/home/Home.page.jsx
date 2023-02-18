import React from 'react'
import Layout from '../../components/layout/Layout.comp'
import './home.css'

const Home = () => {
	return (
		<Layout>
			<div className='jumbotron text-center home'>
				<h1>Welcome To The Admin Dashboard.</h1>
				<p>This is where the magic happens.</p>
			</div>
		</Layout>
	)
}

export default Home
