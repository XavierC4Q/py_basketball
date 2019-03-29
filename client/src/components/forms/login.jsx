import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import useFormHook from './useFormHook';
import Field from './field';
import LoadingScreen from '../util/loading';

import { loginUser } from '../../actions/users';

import './forms.css';

const validate = Yup.object().shape({
	username: Yup.string().required('username: Username is required'),
	password: Yup.string().required('password: Password is required')
});

const LoginForm = props => {
	const isLoggedIn = localStorage.getItem('user');

	const initialInputs = {
		username: '',
		password: ''
	};

	const formHook = useFormHook(initialInputs);

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
			await props.loginUser(formHook.inputs);
			formHook.resetForm();
		} catch (err) {
			formHook.handleErrors(err.errors);
		}
	};

	return (
		<LoadingScreen active={props.loginPending}>
			<div className='form-wrap'>
				<h1>Login Here</h1>
				<form className='form' onSubmit={handleSubmit}>
					<Field
						label='Username'
						fieldname='username'
						fieldvalue={formHook.inputs.username}
						placeholder='Enter Your Username'
						fielderror={formHook.errors.username}
						handleInput={formHook.handleInput}
						classNames='form-section'
					/>
					<Field
						label='Password'
						fieldname='password'
						fieldvalue={formHook.inputs.password}
						placeholder='Enter Your Password'
						fielderror={formHook.errors.password}
						handleInput={formHook.handleInput}
						classNames='form-section'
					/>
					<div>
						<button className='submit-button' type='submit'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</LoadingScreen>
	);
};

const mapStateToProps = state => {
	return {
		loggedInUser: state.users.loggedInUser,
		loginPending: state.users.loginPending,
		loginError: state.users.loginError
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loginUser: auth => dispatch(loginUser(auth))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
