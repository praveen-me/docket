import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { logIn } from "../store/actions/auth.action";
import Loader from "./Loader";
import { SignInMutation } from "../graphql/user-mutations";

const LogIn = props => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  });
  const [logInUser, { error, loading, data }] = useMutation(SignInMutation);

  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setUserCredentials({
      ...userCredentials,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    logInUser({
      variables: {
        input: userCredentials
      }
    })
      .then(({ data }) => {
        // Set token to local storage
        localStorage.setItem("authToken", data.signin.token);

        dispatch(logIn(data.signin.user));
        props.history.push("/");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleGoogleLogin = e => {
    fetch(`/api/login/google`);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="form_container SignUp">
      <h1 className="form_head">LOG IN TO YOUR ACCOUNT</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form_field utils_style"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form_field utils_style"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          required
        />
        {/* {errMsg ? <p className="center warning-msg">{errMsg}</p> : ""} */}
        <button className="form_btn utils_style">Signin</button>
        <div className="center">
          {/* <a href="#" className="form_link">Forget Password?</a> */}
        </div>
      </form>
      <p
        className="center"
        style={{
          fontSize: "1.3rem",
          fontWeight: 300
        }}>
        OR
      </p>
      <a href="http://localhost:8001/api/login/google" className="login-OAuth">
        <button className="login-google">
          <i className="fab fa-google"></i>Login With Google
        </button>
      </a>
      <p
        className="center"
        style={{
          fontSize: "1.3rem",
          fontWeight: 300
        }}>
        OR
      </p>
      <a href="http://localhost:8001/api/login/github" className="login-OAuth">
        <button className="login-github">
          <i className="fab fa-github"></i>Login With Github
        </button>
      </a>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     errMsg : state.errMsg,
//     currentUser : state.currentUser
//   }
// }

export default LogIn;
