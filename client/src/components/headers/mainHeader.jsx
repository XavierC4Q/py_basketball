import React from 'react';
import {Link} from 'react-router-dom';

import './headers.css';

const MainHeader = (props) => {
  return (
    <div className='main-header'>
      <Link className='header-a' to='/login'>Login</Link>
      {" "}
      <Link className='header-a' to='/'>Home</Link>
    </div>
  );
}

export default MainHeader;