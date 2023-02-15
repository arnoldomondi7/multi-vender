import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { signOut } from '../../redux/actions/auth.action'

const Header = () => {
	const auth = useSelector(state => state.auth)
	const dispatch = useDispatch()

	//function to logout the user.
	const logout = () => {
		dispatch(signOut())
	}
	//code to render to auth nav.
	const renderLoggedInLinks = () => {
		return (
			<Nav>
				<li className='nav-item'>
					<span className='nav-link' onClick={logout}>
						Sign Out
					</span>
				</li>
			</Nav>
		)
	}

	//code to show authLinks to the non authenticated.
	const renderNonLoggedInLinks = () => {
		return (
			<Nav>
				<li className='nav-item'>
					<NavLink to='/signin' className='nav-link'>
						Sign In
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink to='/signup' className='nav-link'>
						Sign Up
					</NavLink>
				</li>
			</Nav>
		)
	}
	return (
		<Navbar
			collapseOnSelect
			expand='lg'
			bg='dark'
			variant='dark'
			style={{ zIndex: 1 }}
		>
			<Container fluid>
				<Link to='/' className='navbar-brand'>
					Admin Dashboard
				</Link>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
						{/* <NavDropdown title='Dropdown' id='collasible-nav-dropdown'>
								<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.2'>
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href='#action/3.3'>
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href='#action/3.4'>
									Separated link
								</NavDropdown.Item>
							</NavDropdown> */}
					</Nav>

					{auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Header
