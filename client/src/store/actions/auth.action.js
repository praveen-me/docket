export function signUp(data) {
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
            console.log(data)
            return dispatch({
              type : "SIGNUP_SUCCESS", 
              data : data.user
            })
          })
        } else {
          res.json()
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

export function logIn(data) {
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
            return dispatch({
              type : "LOGIN_SUCCESS",
              data : data.user
            })
          })
        } else {
          res.json()
          .then(data => {
            return dispatch({
              type : "LOGIN_ERR",
              errMsg : data.msg
            })
          })
        }
      })
  }
}

export function setInitialUser() {
  return dispatch => {
    fetch('/api/isLoggedIn')
      .then(res => {
        if(res.status === 200) {
          res.json()
          .then(data => {
            return dispatch({
              type : "LOGIN_SUCCESS",
              data : data.user
            })
          })
        }
      })
      
  }
}