export function signUp(data, cb) {
  console.log(data);
  return (dispatch) => {
    fetch('/api/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((resData) => {
              cb(true);
              console.log(resData);
              return dispatch({
                type: 'SIGNUP_SUCCESS',
                data: resData.user,
              });
            });
        } else {
          res.json()
            .then((resData) => {
              cb(true);
              console.log(resData);
              return dispatch({
                type: 'SIGNUP_ERR',
                errMsg: resData.msg,
              });
            });
        }
      });
  };
}


export function logIn(data, cb) {
  return (dispatch) => {
    fetch('/api/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json()
            .then((resData) => {
              cb(true);
              return dispatch({
                type: 'LOGIN_SUCCESS',
                data: resData.user,
              });
            });
        } else {
          res.json()
            .then((resData) => {
              cb(true);
              return dispatch({
                type: 'LOGIN_ERR',
                errMsg: resData.msg,
              });
            });
        }
      });
  };
}

export function setInitialUser(cb) {
  return () => fetch('/api/isLoggedIn')
    .then((res) => {
      if (res.status === 200) {
        res.json()
          .then(data => cb(data));
      }
    });
}
