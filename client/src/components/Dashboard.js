import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo : '',
      isLoading : false
    }
  }
  
  handleChange = e => {
    this.setState({
      todo : e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const {currentUser} = this.props;

    fetch(`/api/todos`, {
      method : "POST", 
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        todo : this.state.todo,
        userId : currentUser._id 
      })
    })
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type : 'SET_TODO',
        data
      })
    })
  }

  hanldeDelete = e => {
    const deleteId = e.target.parentElement.id;
    fetch(`/api/todos/${deleteId}`, {
      method : "DELETE",
    })
    .then(res => res.json())
    .then(data => {
      this.props.dispatch({
        type : 'SET_TODO',
        data
      })
    })
  }

  render() {
    const {currentUser, currentTodos} = this.props;
    if(!currentUser._id) return <Redirect to="/login"/>
    
    return (
      <main className="wrapper">
        <h2 className="center todo_form-head">Add Your Todo</h2>
        <form onSubmit={this.handleSubmit} className="todo-form">
          <input type="text" name="" id="" onChange={this.handleChange}/>
          <button type="submit">Add Todo</button>
        </form>

        {
          currentTodos.length > 0 && currentTodos.map(todo => (
            <div className="todo-block" id={todo._id}>
              <p className="todo-name">{todo.todo}</p>
              <button className="todo-delete" onClick={this.hanldeDelete}>Delete</button>
            </div>
          ))
        }
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser : state.currentUser,
    currentTodos : state.currentTodos
  }
}

export default connect(mapStateToProps)(Dashboard);