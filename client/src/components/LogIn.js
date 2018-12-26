import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { logIn } from '../store/actions/auth.action';
import Loader from './Loader';


class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCreds : {
        username : '',
        password : ''
      }, 
      isLoading : false,
      msg : ''
    }
  }
  
  handleChange = e => {
    this.setState({
      ...this.state,
      userCreds : {
        ...this.state.userCreds,
        [e.target.name] : e.target.value
      }
    })
  } 

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isLoading : true
    })
    
    if(navigator.onLine) {
      this.props.dispatch(logIn(this.state.userCreds, (isSucced) => {
        if(isSucced) {
          this.setState({
            isLoading : false
          })
        }
      }));
    } else {
      this.setState({
        isLoading : false,
        msg : "Internet is not avialble."
      })
    }
  }

  handleGoogleLogin = e => {
    fetch(`/api/login/google`);
    
  }

  render() {
    const {currentUser, errMsg} = this.props;
    const {isLoading} = this.state;
    if(currentUser._id) return <Redirect to="/" />

    return (
      isLoading ? <Loader/> : (
        <div className="form_container SignUp">
          <h1 className="form_head">LOG IN TO YOUR ACCOUNT</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <input type="text" 
            className="form_field utils_style" 
            placeholder="Username"
            name="username" 
            onChange={this.handleChange}
            required/>
            <input type="text" 
            className="form_field utils_style" 
            placeholder="Password" 
            name="password"
            onChange={this.handleChange}
            required/>
            {
              errMsg ? <p className="center warning-msg">{errMsg}</p> : ''
            }
            <button className="form_btn utils_style">Signin</button>
            <div className="center">
              {/* <a href="#" className="form_link">Forget Password?</a> */}
            </div>
          </form>
          <p className="center" style={{
            fontSize : '1.3rem',
            fontWeight : 300
          }}>OR</p>
          <a href="http://localhost:8001/api/login/google" className="login-OAuth">
            <button className="login-google"><i className="fab fa-google"></i>Login With Google</button>
          </a>
          <p className="center" style={{
            fontSize : '1.3rem',
            fontWeight : 300
          }}>OR</p>
          <a href="http://localhost:8001/api/login/github" className="login-OAuth">
            <button className="login-github"><i className="fab fa-github"></i>Login With Github</button>
          </a>
        </div>
      )
    );
  }
}


function mapStateToProps(state) {
  return {
    errMsg : state.errMsg,
    currentUser : state.currentUser
  }
}

export default connect(mapStateToProps)(LogIn);