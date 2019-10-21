export const signUp = data => dispatch => {
  dispatch({
    type: "SIGNUP_SUCCESS",
    data
  });

  return Promise.resolve(true);
};

export const logIn = data => ({
  type: "LOGIN_SUCCESS",
  data
});

export const setInitialUser = user => ({
  type: "LOGIN_SUCCESS",
  data: user
});
