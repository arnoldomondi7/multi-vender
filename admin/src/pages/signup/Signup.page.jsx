import React from 'react'
import Layout from '../../components/layout/Layout.comp'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Forms from '../../components/forms/Forms.comp'
import './signup.css'

const Signup = () => {
	return (
		<Layout>
			<Container>
				<Row className='form-row'>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Row>
								<Col md={6}>
									<Forms
										label='Enter FirstName'
										placeholder='Enter FirstName'
										value=''
										type='text'
										onChange={() => {}}
									/>
								</Col>
								<Col md={6}>
									<Forms
										label='Enter lastName'
										placeholder='Enter lastName'
										value=''
										type='text'
										onChange={() => {}}
									/>
								</Col>
							</Row>

							<Forms
								label='Enter Email'
								placeholder='Enter Email'
								value=''
								type='email'
								onChange={() => {}}
							/>

							<Forms
								label='Enter Password'
								placeholder='Enter Password'
								value=''
								type='password'
								onChange={() => {}}
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
