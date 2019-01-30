import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { signUp } from '../store/actions/auth.action';
import Loader from './Loader';
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCreds : {
        username : '',
        email : '',
        fullName : '',
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
      this.props.dispatch(signUp(this.state.userCreds, (isSucced) => {
        if(isSucced) {
          this.setState({
            isLoading : false
          })
        }
      }));
    } else {
      this.setState({
        isLoading : false,
        msg : "Internet is not available."
      })
    }
  }
  
  render() {
    const {successMsg, errMsg} = this.props;
    const {isLoading} = this.state;
    if(successMsg) return <Redirect to="/login" />

    return (
      isLoading ? <Loader /> : (
        <div className="form_container SignUp">
          <h1 className="form_head">SignUp</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <input type="text" 
            className="form_field utils_style" 
            placeholder="Full Name"
            name="fullName" 
            onChange={this.handleChange}
            required/>
            <input type="text" 
            className="form_field utils_style" 
            placeholder="Email"
            name="email" 
            onChange={this.handleChange}
            required/>
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
            <button className="form_btn utils_style">Signup</button>
            <div className="center">
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      )
    );
  }
}


function mapStateToProps(state) {
  return {
    errMsg : state.errMsg,
    successMsg : state.successMsg
  }
}

export default connect(mapStateToProps)(SignUp);