import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import { Redirect } from "react-router-dom";
import { setTodos, setTodo } from "../store/actions/todo.action";
import Loader from "./Loader";
import { addTodoMutation } from "../graphql/todo-mutations";

const Dashboard = props => {
  const [todoVal, setTodoVal] = useState("");
  const [addTodo, { error, loading, data }] = useMutation(addTodoMutation);
  const rgba = useRef();

  const handleChange = ({ target: { value } }) => {
    setTodoVal(value);
  };

  // componentDidMount() {
  //   this.setState({
  //     isLoading : true
  //   })
  //   this.props.dispatch(setTodos((isData) => {
  //     if(isData) {
  //       this.setState({
  //         isLoading : false
  //       })
  //     }
  //   }))
  // }

  const handleSubmit = e => {
    e.preventDefault();

    // this.props.dispatch(
    //   setTodo(
    //     {
    //       todo: this.state.todo,
    //       userId: currentUser._id
    //     },
    //     isSucced => {
    //       if (isSucced) {
    //         this.setState({
    //           isLoading: false
    //         });
    //         document.getElementById("todoVal").value = "";
    //       }
    //     }
    //   )
    // );
    addTodo({
      variables: {
        input: todoVal
      }
    }).then(({ data }) => {
      console.log(data.addTodo);
    });
  };

  const hanldeDelete = e => {
    const deleteId = e.target.parentElement.id;
    fetch(`/api/todos/${deleteId}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: "SET_TODO",
          data
        });
      });
  };

  const handleDone = e => {};

  // const { currentUser, currentTodos } = this.props;
  // const { isLoading } = this.state;
  // if (!currentUser._id) return <Redirect to="/login" />;

  return (
    <main className="wrapper">
      <h2 className="center todo_form-head">Add Your Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input type="text" name="" id="todoVal" onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>
      {true ? (
        <Loader />
      ) : (
        currentTodos.length > 0 &&
        currentTodos.map(todo => (
          <div
            className="todo-block"
            id={todo._id}
            key={todo._id}
            style={{
              background: (() => {
                this.rgba = `rgb(${Math.floor(
                  Math.random() * 240
                )},${Math.floor(Math.random() * 240)},${Math.floor(
                  Math.random() * 240
                )})`;
                return this.rgba;
              })(),
              boxShadow: `0px 1px 11px 3px ${this.rgba}`
            }}>
            <input
              type="checkbox"
              className="todo_done"
              onChange={this.handleDone}
            />
            <p className="todo-name">{todo.todo}</p>
            <button className="todo-delete" onClick={this.hanldeDelete}>
              x
            </button>
          </div>
        ))
      )}
    </main>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentTodos: state.currentTodos
  };
}

export default connect(mapStateToProps)(Dashboard);
