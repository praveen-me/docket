import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../store/actions/auth.action";

const Header = props => {
  const { currentUser } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleLogOut = e => {
    dispatch(logOut());
    localStorage.removeItem("authToken");
    props.history.push("/login");
  };

  return (
    <header className="">
      <div className="shadow wrapper">
        <NavLink to="/">
          <h1>Docket</h1>
        </NavLink>
        {!currentUser._id ? (
          <div className="auth_links-block">
            <NavLink to="/login" className="auth_link">
              Login
            </NavLink>
            <NavLink to="/signup" className="auth_link">
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="auth_links-block">
            <span className="user-name">
              Welcome {currentUser.fullName.split(" ")[0]}
            </span>
            <a href="#" className="auth_link" onClick={handleLogOut}>
              Log out
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default withRouter(Header);
