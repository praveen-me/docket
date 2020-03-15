const getToken = () => {
  return { authorization: localStorage.getItem("token") };
};

export function setTodos(cb) {
  return dispatch =>
    fetch("/api/todos", {
      headers: getToken()
    })
      .then(res => res.json())
      .then(data => {
        cb(true);
        return dispatch({
          type: "SET_TODO",
          data
        });
      });
}

export function setTodo(data, cb) {
  return dispatch => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getToken()
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        cb(true);
        return dispatch({
          type: "SET_TODO",
          data
        });
      });
  };
}
