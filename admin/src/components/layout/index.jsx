import React from 'react'
import Header from '../header'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import { NavLink } from 'react-router-dom'

const Layout = ({ children, sidebar }) => {
	return (
		<>
			<Header />
			{sidebar ? (
				<Container fluid>
					<Row>
						<Col md={2} className='sidebar'>
							<ul>
								<li>
									<NavLink to={`/`}>Home</NavLink>
								</li>
								<li>
									<NavLink to={`/products`}>Products</NavLink>
								</li>
								<li>
									<NavLink to={`/orders`}>Orders</NavLink>
								</li>
							</ul>
						</Col>
						<Col md={10} style={{ marginLeft: 'auto' }}>
							{children}
						</Col>
					</Row>
				</Container>
			) : (
				children
			)}
		</>
	)
}

export default Layout
