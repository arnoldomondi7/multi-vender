import React from 'react'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const Input = props => {
	return (
		<Form.Group>
			<FloatingLabel label={props.label} className='mb-3'>
				<Form.Control
					type={props.type}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
				/>
			</FloatingLabel>

			<Form.Text className='text-muted'>{props.errorMessage}</Form.Text>
		</Form.Group>
	)
}

export default Input
