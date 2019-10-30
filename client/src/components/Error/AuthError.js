import React from "react";

const AuthError = ({ message, removeError }) => {
  return (
    <div className="error">
      <p className="center">{message}</p>
      <button
        onClick={e => {
          e.preventDefault();
          removeError(false);
        }}>
        x
      </button>
    </div>
  );
};

export default AuthError;
