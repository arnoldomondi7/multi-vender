import React, { useState } from 'react'
import Layout from '../../components/layout'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '../../components/ui/input/index.ui'
import { login } from '../../redux/actions/auth.action'
import { useDispatch } from 'react-redux'

const Signin = () => {
	//create state.
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const dispatch = useDispatch()

	//function to handle the login.
	const handleSubmit = event => {
		event.preventDefault()

		const user = {
			email: 'ano@test.com',
			password: 'qqqqqqqq',
		}

		dispatch(login(user))
	}
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={handleSubmit}>
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
									Sign In
								</button>
							</div>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Signin
