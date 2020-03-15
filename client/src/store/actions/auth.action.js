export function signUp(data, cb) {
  return dispatch => {
    fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 201) {
        res.json().then(resData => {
          cb(true);
          return dispatch({
            type: "SIGNUP_SUCCESS",
            data: resData.user
          });
        });
      } else {
        res.json().then(resData => {
          cb(true);
          return dispatch({
            type: "SIGNUP_ERR",
            errMsg: resData.msg
          });
        });
      }
    });
  };
}

export function logIn(data, cb) {
  return dispatch => {
    fetch("/api/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 200) {
        res.json().then(resData => {
          // storing token in local storage
          localStorage.setItem("token", resData.token);

          cb(true);
          return dispatch({
            type: "LOGIN_SUCCESS",
            data: resData.user
          });
        });
      } else {
        res.json().then(resData => {
          cb(true);
          return dispatch({
            type: "LOGIN_ERR",
            errMsg: resData.msg
          });
        });
      }
    });
  };
}

export function setInitialUser(cb) {
  return dispatch =>
    fetch("/api/isLoggedIn", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then(res => {
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
