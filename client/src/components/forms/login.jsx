import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import FormState from './formState';
import Field from './field';

import {loginUser} from '../../actions/users';

import './forms.css';

const LoginForm = props => {

  useEffect(() => {
    if (props.loggedInUser) {
      props
        .history
        .push('/');
    }
  }, [props.loggedInUser]);

  const initialInputs = {
    username: '',
    password: ''
  };

  const [inputs,
    handleInput,
    errors,
    handleError,
    resetForm] = FormState(initialInputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = {};

    if (!inputs.username) 
      errs.username = 'Username missing';
    if (!inputs.password) 
      errs.password = 'Password missing';
    
    if (errs.username || errs.password) {
      handleError(errs);
    } else {
      props.loginUser(inputs);
      resetForm();
    }
  };

  return (
    <div className='form-wrap'>
      <h1>Login Here</h1>
      <form className='form' onSubmit={handleSubmit}>
        <Field
          fieldname='username'
          fieldvalue={inputs.username}
          placeholder='Enter Your Username'
          fielderror={errors.username}
          handleInput={handleInput}/>
        <Field
          fieldname='password'
          fieldvalue={inputs.password}
          placeholder='Enter Your Password'
          fielderror={errors.password}
          handleInput={handleInput}/>
        <div>
          <button className='submit-button' type='submit'>Submit</button>
        </div>
      </form>

    </div>
  );
};

const mapStateToProps = state => {
  return {loggedInUser: state.users.loggedInUser, loginPending: state.users.loginPending, loginError: state.users.loginError};
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: (auth) => dispatch(loginUser(auth))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
