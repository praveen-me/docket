export function signUp(data, cb) {
  console.log(data)
  return dispatch => {
    fetch(`/api/signUp`, {
      method : "POST", 
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
      .then(res => {
        if(res.status === 200) {
          res.json()
          .then(data => {
            cb(true)
            console.log(data)
            return dispatch({
              type : "SIGNUP_SUCCESS", 
              data : data.user
            })
          })
        } else {
          res.json()
          cb(true)
          .then(data => {
            console.log(data)
            return dispatch({
              type : "SIGNUP_ERR", 
              errMsg : data.msg
            })
          })
        }
      })
  }
}

export function logIn(data, cb) {
  return dispatch => {
    fetch(`/api/logIn`, {
      method : "POST", 
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
    .then(res => {
      if(res.status === 200) {
        res.json()
        .then(data => {
          cb(true)
          return dispatch({
            type : "LOGIN_SUCCESS",
            data : data.user
          })
        })
      } else {
        res.json()
        .then(data => {
          cb(true)
          return dispatch({
            type : "LOGIN_ERR",
            errMsg : data.msg
          })
        })
      }
    })
  }
}

export function setInitialUser(cb) {
  return dispatch => {
      return fetch('/api/isLoggedIn')
      .then(res => {
        if(res.status === 200) {
          res.json()
          .then(data => cb(data))
        }
      })
      
  }
}