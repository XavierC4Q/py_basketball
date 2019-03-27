import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

class Profile extends PureComponent {
  render() {
    return (
      <div>
        Profile
      </div>
    )
  }
}

export default connect(null, null)(Profile);