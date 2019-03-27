import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import FormState from './formState';
import Field from './field';

import { registerUser } from '../../actions/users';

import './forms.css';

const RegisterForm = props => {
	const isLoggedIn = localStorage.getItem('user');
    
	useEffect(
        () => {
			if (isLoggedIn) {
				const parsedUser = JSON.parse(isLoggedIn);
				props.history.push(`/profile/${parsedUser.pk}`);
			}
        },
        [ isLoggedIn ]
	);

	const initialInputs = {
		username: '',
		password1: '',
		password2: '',
		first_name: '',
		last_name: ''
	};

	const [ inputs, handleInput, errors, handleErrors, resetForm, clearInputs ] = FormState(initialInputs);

	const handleSubmit = e => {
		e.preventDefault();

		const validForm = validate(inputs, handleErrors);

		if (validForm) {
			props.registerUser(inputs);
			resetForm();
		}
		else {
			clearInputs();
		}
	};

	return (
		<div className='form-wrap'>
			<h1>Register Here</h1>
			<form className='form' onSubmit={handleSubmit}>
				<Field
					label='Username'
					fieldname='username'
					value={inputs.username}
					placeholder='Enter Your Username'
					fielderror={errors.username}
					handleInput={handleInput}
					classNames='form-section'
				/>
				<Field
					label='Password'
					fieldname='password1'
					value={inputs.password1}
					placeholder='Enter Your Password'
					fielderror={errors.password1}
					handleInput={handleInput}
					classNames='form-section'
				/>
				<Field
					label='Confirm Password'
					fieldname='password2'
					value={inputs.password2}
					placeholder='Confirm Your Password'
					fielderror={errors.password2}
					handleInput={handleInput}
					classNames='form-section'
				/>
				<Field
					label='First Name'
					fieldname='first_name'
					value={inputs.first_name}
					placeholder='Enter Your First Name'
					fielderror={errors.first_name}
					handleInput={handleInput}
					classNames='form-section'
				/>
				<Field
					label='Last Name'
					fieldname='last_name'
					value={inputs.last_name}
					placeholder='Enter Your Last Name'
					fielderror={errors.last_name}
					handleInput={handleInput}
					classNames='form-section'
				/>
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
};

const validate = (inputs, handleErrors) => {
	let errs = {};
	const { username, password1, password2, first_name, last_name } = inputs;
	if (!username) {
		errs.username = 'Username is missing';
	}
	if (!password1) {
		errs.password1 = 'Password is missing';
	}
	if (!password2) {
		errs.password2 = 'Confirm password is missing';
	}
	if (!first_name) {
		errs.first_name = 'First name is required';
	}
	if (!last_name) {
		errs.last_name = 'Last name is required';
	}
	if (username.length < 6) {
		errs.username = 'Username is too short';
	}
	if (password1.length < 8) {
		errs.password1 = 'Password is too short';
	}
	if (password1 !== password2) {
		errs.password1 = 'Passwords must match';
		errs.password2 = 'Passwords must match';
	}

	if (Object.keys(errs).length) {
		handleErrors(errs);
		return false;
	}
	else {
		return true;
	}
};

const mapStateToProps = state => {
	return {
		loggedInUser: state.users.loggedInUser,
		registerPending: state.users.registerPending,
		registerError: state.users.registerError
	};
};

const mapDispatchToProps = dispatch => {
	return {
		registerUser: newUser => {
			dispatch(registerUser(newUser));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
