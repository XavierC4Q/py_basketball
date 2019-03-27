import React from 'react';
import { Link } from 'react-router-dom';

import './headers.css';

const VisitorLinks = () => (
	<React.Fragment>
		<Link className='header-a' to='/login'>
			Login
		</Link>{' '}
		<Link className='header-a' to='/'>
			Home
		</Link>{' '}
		<Link className='header-a' to='/register'>
			Register
		</Link>
	</React.Fragment>
);

const LoggedInLinks = user => {
	const url = `/profile/${user.pk}`;
	return (
		<React.Fragment>
			<Link className='header-a' to='/'>
				Home
			</Link>{' '}
			<Link className='header-a' to={url}>Profile Page</Link>
		</React.Fragment>
	);
};

const MainHeader = props => {
	return (
		<div className='main-header'>
			{
				props.loggedIn ? LoggedInLinks(props.loggedIn) :
				<VisitorLinks />}
		</div>
	);
};

export default MainHeader;
