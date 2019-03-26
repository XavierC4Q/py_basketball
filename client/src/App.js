import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import { getLoggedInUser } from './actions/users';

const App = (props) => {
  useEffect(() => {
    props.getLoggedInUser();
  }, []);

  return (
    <div></div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.users.loggedInUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLoggedInUser: () => {
      dispatch(getLoggedInUser())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
