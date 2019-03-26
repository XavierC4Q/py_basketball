import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

import LoginForm from './components/forms/login';
import MainHeader from './components/headers/mainHeader';

import {getLoggedInUser} from './actions/users';

import './App.css'

const App = (props) => {
  useEffect(() => {
    props.getLoggedInUser();
  }, []);

  return (
    <div>
      <MainHeader loggedIn={props.loggedInUser}/>
      <Route path='/login' render={(props) => <LoginForm {...props}/>}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {loggedInUser: state.users.loggedInUser}
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInUser: () => {
      dispatch(getLoggedInUser())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
