import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { setInitialUser } from '../store/actions/auth.action';

class Header extends Component {
  handleLogOut = e => {
    localStorage.removeItem('token');
    
    fetch(`/api/logout`)
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type : "LOGOUT_SUCCESS"
      })
    })
  }

  
  render() {
    const {currentUser} = this.props;

    return (
      <header className="">
        <div className="shadow wrapper">
          <Link to="/"><h1>Docket</h1></Link>
          {
            !currentUser.id  ? (
              <div className="auth_links-block">
                <Link to="/login" className="auth_link">Login</Link>
                <Link to="/signup" className="auth_link">Sign Up</Link>
              </div>
            ) : (
              <div className="auth_links-block">
                <span className="user-name">Welcome {currentUser.username}</span>
                <a href="#" className="auth_link" onClick={this.handleLogOut}>Log out</a>
              </div>
            )
          }
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser : state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setInitialUser : () => dispatch(setInitialUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);