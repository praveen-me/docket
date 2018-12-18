import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoValue : ''
    }
  }
  
  handleChange = e => {
    this.setState({
      todoValue : e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    fetch(`/api/todos`, {
      method : "POST", 
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        todo : this.state.todoValue,
        done : false
      })
    })
  }

  render() {
    const {currentUser} = this.props;
    if(!currentUser._id) return <Redirect to="/login"/>
    
    return (
      <main className="wrapper">
        <form>
          <input type="text" name="" id="" onChange={this.handleChange}/>
          <button type="submit">Add Todo</button>
        </form>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser : state.currentUser
  }
}

export default connect(mapStateToProps)(Dashboard);