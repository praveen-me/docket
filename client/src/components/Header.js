import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Docket</h1>
        <Link to="/login">Login</Link> <br />
        <Link to="/signup">Sign Up</Link>
      </header>
    );
  }
}

export default Header;