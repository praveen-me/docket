import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useMutation, useQuery } from "@apollo/react-hooks";
import Loader from "./Loader";
import {
  addTodoMutation,
  DELETE_TODO,
  TOGGLE_TODO_DONE
} from "../graphql/todo-mutations";
import { GET_ALL_TODOS } from "../graphql/todo-queries";

const Dashboard = props => {
  const [todoVal, setTodoVal] = useState("");
  const { data: allTodos, loading } = useQuery(GET_ALL_TODOS);
  const [addTodo, { error, data }] = useMutation(addTodoMutation, {
    update(
      cache,
      {
        data: { addTodo }
      }
    ) {
      const { todos } = cache.readQuery({ query: GET_ALL_TODOS });
      cache.writeQuery({
        query: GET_ALL_TODOS,
        data: { todos: [...todos, addTodo] }
      });
    }
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    update(
      cache,
      {
        data: { deleteTodo }
      }
    ) {
      const { todos } = cache.readQuery({ query: GET_ALL_TODOS });

      if (deleteTodo._id) {
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { todos: todos.filter(todo => todo._id !== deleteTodo._id) }
        });
      }
    }
  });

  const [toggleTodoDone] = useMutation(TOGGLE_TODO_DONE);

  const rgba = useRef("");

  const handleChange = ({ target: { value } }) => {
    setTodoVal(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTodo({
      variables: {
        input: todoVal
      }
    });
  };

  const handleDelete = ({ target: { parentElement } }) => {
    deleteTodo({
      variables: {
        id: parentElement.id
      }
    });
  };

  const handleDone = ({ target: { parentElement } }, lastValue) => {
    toggleTodoDone({
      variables: {
        input: {
          id: parentElement.id,
          lastValue
        }
      }
    });
  };

  return (
    <main className="wrapper">
      <h2 className="center todo_form-head">Add Your Todo</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <input type="text" name="" id="todoVal" onChange={handleChange} />
        <button type="submit">Add Todo</button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        allTodos.todos &&
        allTodos.todos.map(todo => (
          <div
            className="todo-block"
            id={todo._id}
            key={todo._id}
            style={{
              background: (() => {
                rgba.current = `rgb(${Math.floor(
                  Math.random() * 240
                )},${Math.floor(Math.random() * 240)},${Math.floor(
                  Math.random() * 240
                )})`;
                return rgba.current;
              })(),
              boxShadow: `0px 1px 11px 3px ${rgba.currentTodos}`
            }}>
            <input
              type="checkbox"
              className="todo_done"
              onChange={e => handleDone(e, todo.done)}
              checked={todo.done}
            />
            <p className="todo-name">{todo.todo}</p>
            <button className="todo-delete" onClick={handleDelete}>
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
