export function addTodo(data) {
  console.log(data)
  return dispatch => {
    fetch(`/api/todos`, {
      method : "POST", 
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        return {
          type : 'ADD_TODO',
          data
        }
      })  
  }
}

export function setTodos(cb) {
  return dispatch => fetch(`/api/todos`)
    .then(res => res.json())
    .then(data => {
      cb(true)
      return dispatch({
        type : 'SET_TODO',
        data
      })
    })
}

export function setTodo(data, cb) {
  return dispatch => fetch(`/api/todos`, {
    method : "POST", 
    headers : {
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    cb(true)
    return dispatch({
      type : 'SET_TODO',
      data
    })
  }) 
}