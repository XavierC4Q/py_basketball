import React from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/users';

const LoginForm = (props) => {
    return (<div></div>);
}

const validate = (inputs, setInputs) => {
    const {username, password} = inputs;
    
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state.users.loggedInUser,
        loginPending: state.users.loginPending,
        loginError: state.users.loginError
    }
}

export default connect(mapStateToProps, { loginUser })(LoginForm);