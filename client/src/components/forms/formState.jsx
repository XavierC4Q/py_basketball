import { useState } from 'react';

const FormState = props => {
	let initialState = { ...props };

	const [ inputs, setInputs ] = useState(initialState);

	const [ errors, setErrors ] = useState(initialState);

	const handleInput = e =>
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});

	const handleError = errs => setErrors({ ...errs });

	const resetForm = () => {
		setInputs(initialState);
		setErrors(initialState);
	};

	const clearInputs = () => setInputs(initialState);

	return [ inputs, handleInput, errors, handleError, resetForm, clearInputs ];
};

export default FormState;
