import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/actions/auth.action";
import Loader from "./Loader";
import { SignUpMutation } from "../graphql/user-mutations";

const SignUp = props => {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    fullName: "",
    password: ""
  });
  const dispatch = useDispatch();
  const [signUpMutation, { loading }] = useMutation(SignUpMutation);

  const handleChange = e => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    signUpMutation({
      variables: {
        input: userCredentials
      }
    })
      .then(data => {
        dispatch(signUp());
        props.history.push("/login");
      })
      .catch(e => console.log(e));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="form_container SignUp">
      <h1 className="form_head">SignUp</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form_field utils_style"
          placeholder="Full Name"
          name="fullName"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className="form_field utils_style"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
        />
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
        <button className="form_btn utils_style">Signup</button>
        <div className="center">
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
