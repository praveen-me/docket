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


    default : return state
  }
}