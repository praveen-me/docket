import React from "react";

const Input = ({ type, name, placeholder, handleChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={e => handleChange(e)}
      className="form_field utils_style"
      required
    />
  );
};

export default Input;
