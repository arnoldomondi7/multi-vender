import React from 'react'
import Layout from '../../components/layout'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from '../../components/ui/input/index.ui'

const Signin = () => {
	return (
		<Layout>
			<Container>
				<Row style={{ marginTop: '50px' }}>
					<Col md={{ span: 6, offset: 3 }}>
						<Form>
							<Input
								label='Email'
								placeholder='Enter Email Address'
								value=''
								type='email'
								onChange={() => {}}
							/>

							<Input
								label='Password'
								placeholder='Enter Password'
								value=''
								type='password'
								onChange={() => {}}
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
