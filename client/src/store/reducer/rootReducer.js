const initState = {
  currentUser: {},
  errMsg: "",
  successMsg: null,
  currentTodos: []
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS": {
      return {
        ...state,
        errMsg: "",
        successMsg: true
      };
    }

    case "SIGNUP_ERR": {
      return {
        ...state,
        successMsg: "",
        errMsg: action.errMsg
      };
    }

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        errMsg: "",
        currentUser: action.data
      };
    }

    case "LOGIN_ERR": {
      return {
        ...state,
        successMsg: "",
        errMsg: action.errMsg
      };
    }

    case "SET_TODO": {
      return {
        ...state,
        currentTodos: [...action.data.data]
      };
    }

    case "LOGOUT": {
      return {
        ...initState
      };
    }

    default:
      return state;
  }
}
