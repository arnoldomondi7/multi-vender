import React from 'react'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/esm/Form'

const Forms = ({ label, placeholder, errorMessage, value, onChange }) => {
	return (
		<Form.Group className='mb-3' controlId='formBasicEmail'>
			<FloatingLabel controlId='floatingInput' label={label} className='mb-3'>
				<Form.Control
					type='text'
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
				<Form.Text className='text-muted'>{errorMessage}</Form.Text>
			</FloatingLabel>
		</Form.Group>
	)
}

export default Forms
