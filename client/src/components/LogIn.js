import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { logIn } from "../store/actions/auth.action";
import { SignInMutation } from "../graphql/user-mutations";
import AuthHOC from "../AuthHOC";
import SmallLoader from "./SmallLoder";
import AuthError from "./Error/AuthError";
import Input from "./From/Input";

const LogIn = props => {
  const [showError, setShowErr] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: ""
  });
  const [logInUser, { error, loading }] = useMutation(SignInMutation);

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
        console.log(data, "data");
        // Set token to local storage
        localStorage.setItem("authToken", data.signin.token);

        dispatch(logIn(data.signin.user));
        props.history.push("/");
      })
      .catch(e => setShowErr(true));
  };

  return (
    <div className="form_container SignUp">
      <h1 className="form_head">LOG IN TO YOUR ACCOUNT</h1>
      <form className="form" onSubmit={handleSubmit}>
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
          {loading ? <SmallLoader /> : "Signin"}
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
          {/* <a href="#" className="form_link">Forget Password?</a> */}
        </div>
      </form>
    </div>
  );
};
export default AuthHOC(LogIn);
