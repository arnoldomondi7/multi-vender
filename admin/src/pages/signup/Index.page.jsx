import React, { useState } from 'react'
import Layout from '../../components/layout'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '../../components/ui/input/index.ui'
import { Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../redux/actions/user.actions.js'

const Signup = () => {
	//handle the state.
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	//get dispatch from the redux.
	const dispatch = useDispatch()

	//get auth from redux.
	const auth = useSelector(state => state.auth)
	const user = useSelector(state => state.user)

	//function to register user.
	const handleUserReg = event => {
		event.preventDefault()

		//get the data.
		const user = { firstName, lastName, email, password }

		dispatch(signUp(user))
	}
	//handle the authsystem.
	if (auth.authenticate) {
		return <Navigate to={`/`} />
	}

	if (user.loading) {
		return (
			<p
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				Working on it...
			</p>
		)
	}
	return (
		<Layout>
			<Container>
				{user.message}
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={handleUserReg}>
							<Row>
								<Col md={6}>
									<Input
										label='First Name'
										placeholder='Enter First Name'
										value={firstName}
										type='text'
										onChange={event => setFirstName(event.target.value)}
									/>
								</Col>

								<Col md={6}>
									<Input
										label='Last Name'
										placeholder='Enter Last Name'
										value={lastName}
										type='text'
										onChange={event => setLastName(event.target.value)}
									/>
								</Col>
							</Row>
							<Input
								label='Email'
								placeholder='Enter Email Address'
								value={email}
								type='email'
								onChange={event => setEmail(event.target.value)}
							/>

							<Input
								label='Password'
								placeholder='Enter Password'
								value={password}
								type='password'
								onChange={event => setPassword(event.target.value)}
							/>
							<div className='d-grid gap-2 col-6 mx-auto'>
								<button
									variant='primary'
									type='submit'
									className='btn btn-primary'
								>
									Sign Up
								</button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Signup
