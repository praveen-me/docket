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