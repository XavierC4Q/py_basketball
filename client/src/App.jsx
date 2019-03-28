import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import { getLoggedInUser } from './actions/users';

import LoginForm from './components/forms/login';
import RegisterForm from './components/forms/register';
import MainHeader from './components/headers/mainHeader';
import Footer from './components/footer/footer';
import Profile from './components/profile/profile';

import './App.css';

const App = props => {
	useEffect(() => {
		props.getLoggedInUser();
	}, []);


	return (
		<React.Fragment>
			<MainHeader loggedIn={props.loggedInUser} />
			<Route path='/login' render={props => <LoginForm {...props} />} />
			<Route path='/register' render={props => <RegisterForm {...props} />} />
			<Route path='/profile/:id' render={props => <Profile {...props} />} />
			<Footer />
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return { loggedInUser: state.users.loggedInUser };
};

const mapDispatchToProps = dispatch => {
	return {
		getLoggedInUser: () => {
			dispatch(getLoggedInUser());
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
