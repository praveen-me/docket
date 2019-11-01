import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../store/actions/auth.action";
import { SignUpMutation } from "../graphql/user-mutations";
import AuthHOC from "../AuthHOC";
import SmallLoader from "./SmallLoder";
import AuthError from "./Error/AuthError";
import Input from "./Form/Input";

const SignUp = props => {
  const [showError, setShowErr] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    fullName: "",
    password: ""
  });
  const dispatch = useDispatch();
  const [signUpMutation, { loading, error }] = useMutation(SignUpMutation);

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
      .catch(e => setShowErr(true));
  };

  return (
    <div className="form_container SignUp">
      <h1 className="form_head">SignUp</h1>
      <form className="form" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Full Name"
          name="fullName"
          handleChange={handleChange}
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          handleChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Username"
          name="username"
          handleChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          handleChange={handleChange}
        />
        <button className="form_btn utils_style">
          {loading ? <SmallLoader /> : "SignUp"}
        </button>
        {showError &&
          error &&
          error.graphQLErrors.map(({ message }) => (
            <AuthError
              key={message}
              message={message}
              removeError={setShowErr}
            />
          ))}
        <div className="center">
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default AuthHOC(SignUp);
