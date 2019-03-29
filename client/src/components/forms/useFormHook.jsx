import { useState } from 'react';

const initialErrors = values => {
	let errs = {};
	for (let k in values) {
		errs[k] = [];
	}
	return errs;
};

const useFormHook = values => {
	const initialState = { ...values };

	const [ inputs, setInputs ] = useState(initialState);

	const [ errors, setErrors ] = useState(initialErrors(initialState));

	const handleInput = e => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value
		});
	};

	const handleErrors = errs => {
		let newErrors = { ...errors };
		for (let k in errs) {
			let splitErr = errs[k].split(': ');
			newErrors[splitErr[0]].push(splitErr[1]);
		}
		setErrors(newErrors);
	};

	const resetForm = () => {
		setInputs(initialState);
		setErrors(initialState);
	};


	return { inputs, handleInput, errors, handleErrors, resetForm };
};

export default useFormHook;
