import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setTodos, setTodo } from "../store/actions/todo.action";
import Loader from "./Loader";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      isLoading: false
    };
    this.rgba = "";
  }

  handleChange = e => {
    this.setState({
      todo: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      isLoading: true
    });
    this.props.dispatch(
      setTodos(isData => {
        if (isData) {
          this.setState({
            isLoading: false
          });
        }
      })
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const { currentUser } = this.props;
    this.setState({
      isLoading: true
    });
    this.props.dispatch(
      setTodo(
        {
          todo: this.state.todo
        },
        isSucced => {
          if (isSucced) {
            this.setState({
              isLoading: false
            });
            document.getElementById("todoVal").value = "";
          }
        }
      )
    );
  };

  hanldeDelete = e => {
    const deleteId = e.target.parentElement.id;
    fetch(`/api/todos/${deleteId}`, {
      method: "DELETE",
      headers: { Authorization : localStorage.getItem("token")}
    })
      .then(res => res.json())
      .then(data => {
        this.props.dispatch({
          type: "SET_TODO",
          data
        });
      });
  };

  handleDone = e => {};

  render() {
    const { currentUser, currentTodos = {} } = this.props;
    const { isLoading } = this.state;
    if (!currentUser.id) return <Redirect to="/login" />;

    return (
      <main className="wrapper">
        <h2 className="center todo_form-head">Add Your Todo</h2>
        <form onSubmit={this.handleSubmit} className="todo-form">
          <input
            type="text"
            name=""
            id="todoVal"
            onChange={this.handleChange}
          />
          <button type="submit">Add Todo</button>
        </form>
        {isLoading ? (
          <Loader />
        ) : (
          currentTodos.length > 0 &&
          currentTodos.map(todo => (
            <div
              className="todo-block"
              id={todo.id}
              key={todo.id}
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
              }}
            >
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
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentTodos: state.currentTodos
  };
}

export default connect(mapStateToProps)(Dashboard);
