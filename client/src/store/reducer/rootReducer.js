const initState = {
  currentUser : {}, 
  errMsg : '',
  successMsg : '',
}

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS" : {
      return {
        ...state,
        errMsg : '',
        successMsg : "Signup Sucessfull"
      }
    }

    case 'SIGNUP_ERR' : {
      return {
        ...state,
        successMsg : '',
        errMsg : action.errMsg
      }
    }

    case "LOGIN_SUCCESS" : {
      return {
        ...state, 
        errMsg : '',
        currentUser : action.data
      }
    } 

    case "LOGIN_ERR" : {
      return {
        ...state,
        successMsg : '',
        errMsg : action.errMsg
      }
    }

    default : return state
  }
}