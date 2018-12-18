import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route path='/' component={Dashboard}/>
            <Route path="/login" component={LogIn}/>
            <Route path="/signup" component={SignUp}/>
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;