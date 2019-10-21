export const signUp = data => ({
  type: "SIGNUP_SUCCESS",
  data
});

export const logIn = data => ({
  type: "LOGIN_SUCCESS",
  data
});

export const setInitialUser = user => ({
  type: "LOGIN_SUCCESS",
  data: user
});
