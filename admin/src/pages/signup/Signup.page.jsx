import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.comp'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Forms from '../../components/forms/Forms.comp'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../../rtk/features/auth/authSlice.rtk'
import './signup.css'

const Signup = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	})

	const { firstName, lastName, email, password, password2 } = formData

	//initialise the dispatch.
	const dispatch = useDispatch()
	const navigate = useNavigate()

	//get date from the slice.
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		state => state.auth
	)

	//useEffect to track the changes.
	useEffect(() => {
		//handle the errors.
		if (isError) {
			toast.error(message)
		}

		//handle the success case. meaning there will be a user.
		if (isSuccess || user) {
			//we navigate the user to the home page.
			return navigate('/signin')
		}

		// once success reset the state.
		dispatch(reset())
	}, [user, isError, isSuccess, message, navigate, dispatch])
	// function to update the state.
	const onDataChange = event => {
		setFormData(prevState => ({
			//handle the initialState.
			...prevState,
			[event.target.name]: event.target.value,
		}))
	}

	//function to submit the form.
	const onFormSubmit = event => {
		event.preventDefault()

		//ensure the passwords match.
		if (password !== password2) {
			toast.error('Please Match Passwords')
		} else {
			//register the user.
			//put the data in an object called userData.
			const userData = {
				firstName,
				lastName,
				email,
				password,
			}

			//dispatch the data.
			dispatch(register(userData))
		}
	}

	//check for isLoading if so return a success message.
	if (isLoading) {
		return <h3>Working on it..</h3>
	}
	return (
		<Layout>
			<Container>
				<Row className='form-row'>
					<Col md={{ span: 6, offset: 3 }}>
						<Form onSubmit={onFormSubmit}>
							<Row>
								<Col md={6}>
									<Forms
										label='Enter FirstName'
										placeholder='Enter FirstName'
										value={firstName}
										name='firstName'
										type='text'
										onChange={onDataChange}
									/>
								</Col>
								<Col md={6}>
									<Forms
										label='Enter lastName'
										placeholder='Enter lastName'
										value={lastName}
										name='lastName'
										type='text'
										onChange={onDataChange}
									/>
								</Col>
							</Row>

							<Forms
								label='Enter Email'
								placeholder='Enter Email'
								value={email}
								name='email'
								type='email'
								onChange={onDataChange}
							/>

							<Forms
								label='Enter Password'
								placeholder='Enter Password'
								value={password}
								name='password'
								type='password'
								onChange={onDataChange}
							/>

							<Forms
								label='Confirm Password'
								placeholder='Confirm Password'
								value={password2}
								name='password2'
								type='password'
								onChange={onDataChange}
							/>

							<Button variant='primary' type='submit'>
								Submit
							</Button>
						</Form>
					</Col>
				</Row>
			</Container>
		</Layout>
	)
}

export default Signup
