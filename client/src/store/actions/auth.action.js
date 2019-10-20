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

export function setInitialUser(cb) {
  return dispatch =>
    fetch("/api/isLoggedIn").then(res => {
      if (res.status === 200) {
        res.json().then(data => cb(data));
      } else {
        res.json().then(resData => {
          return dispatch({
            type: "LOGIN_ERR",
            errMsg: resData.msg
          });
        });
      }
    });
}
