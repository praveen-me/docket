import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
      fetch(`/api/signUp`, {
        method : "POST", 
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(this.state.userCreds)
      })
        .then(res => res.json())
        .then(data => console.log(data))
    } else {
      this.setState({
        isLoading : false,
        msg : "Internet is not avialble."
      })
    }
  }
  
  render() {
    return (
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
          <button className="form_btn utils_style">Signup</button>
          <div className="center">
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;