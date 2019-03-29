import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import useFormHook from './useFormHook';
import Field from './field';

import { registerUser } from '../../actions/users';

import './forms.css';

const initialInputs = {
	username: '',
	password1: '',
	password2: '',
	first_name: '',
	last_name: ''
};

const validate = Yup.object().shape({
	username: Yup.string()
		.min(8, 'username: Username must be at least 8 characters')
		.max(16, 'username: Username cannot excede 16 characters')
		.required('username: Username is required'),
	password1: Yup.string()
		.min(8, 'password1: Password must be at least 8 characters')
		.max(21, 'Password cannot excede 21 characters')
		.required('password1: Password is required'),
	password2: Yup.string()
		.oneOf([ Yup.ref('password1'), null ], 'password2: Passwords must match')
		.required('password2: Confirm password is required'),
	first_name: Yup.string().required('first_name: First name is required'),
	last_name: Yup.string().required('last_name: Last name is required')
});

const RegisterForm = props => {
	const formHook = useFormHook(initialInputs);

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

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await validate.validate(formHook.inputs, { abortEarly: false });
			await props.registerUser(formHook.inputs);
			formHook.resetForm();
		} catch (err) {
			formHook.handleErrors(err.errors);
		}
	};

	return (
		<div className='form-wrap'>
			<h1>Register Here</h1>
			<form className='form' onSubmit={handleSubmit}>
				<Field
					fieldvalue={formHook.inputs.username}
					fieldname='username'
					placeholder='Enter Username'
					label='Username'
					handleInput={formHook.handleInput}
					fielderror={formHook.errors.username}
				/>
				<Field
					label='Password'
					fieldname='password1'
					fieldvalue={formHook.inputs.password1}
					placeholder='Enter Your Password'
					fielderror={formHook.errors.password1}
					handleInput={formHook.handleInput}
					classNames='form-section'
				/>
				<Field
					label='Confirm Password'
					fieldname='password2'
					fieldvalue={formHook.inputs.password2}
					placeholder='Confirm Your Password'
					fielderror={formHook.errors.password2}
					handleInput={formHook.handleInput}
					classNames='form-section'
				/>
				<Field
					label='First Name'
					fieldname='first_name'
					fieldvalue={formHook.inputs.first_name}
					placeholder='Enter Your First Name'
					fielderror={formHook.errors.first_name}
					handleInput={formHook.handleInput}
					classNames='form-section'
				/>
				<Field
					label='Last Name'
					fieldname='last_name'
					fieldvalue={formHook.inputs.last_name}
					placeholder='Enter Your Last Name'
					fielderror={formHook.errors.last_name}
					handleInput={formHook.handleInput}
					classNames='form-section'
				/>
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</div>
	);
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
