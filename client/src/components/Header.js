import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { setInitialUser } from '../store/actions/auth.action';


class Header extends Component {
  componentDidMount() {
     this.props.setInitialUser()
  }
  
  
  render() {
    const {currentUser} = this.props;
    
    return (
      <header>
        <h1>Docket</h1>
        {
          !currentUser._id  ? (
            <div className="auth_links-block">
              <Link to="/login">Login</Link> <br />
              <Link to="/signup">Sign Up</Link>
            </div>
          ) : (
            <div className="auth_links-block">
              <Link to="/logout">Log out</Link>
            </div>
          )
        }
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
    setInitialUser : () => dispatch(setInitialUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);