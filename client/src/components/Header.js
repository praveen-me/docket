import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { setInitialUser } from '../store/actions/auth.action';


class Header extends Component {
  componentDidMount() {
    // this.props.setInitialUser()
  }
  
  
  render() {
    const {currentUser} = this.props;
    
    return (
      <header className="">
        <div className="shadow wrapper">
          <Link to="/"><h1>Docket</h1></Link>
          {
            !currentUser._id  ? (
              <div className="auth_links-block">
                <Link to="/login" className="auth_link">Login</Link>
                <Link to="/signup" className="auth_link">Sign Up</Link>
              </div>
            ) : (
              <div className="auth_links-block">
                <Link to="/logout" className="auth_link">Log out</Link>
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
    setInitialUser : () => dispatch(setInitialUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);