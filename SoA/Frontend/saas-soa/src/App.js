import logo from './logo.svg';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import React from 'react';
import Header from './header';
import Footer from './footer';
import Home from './home';
import Login from './login';
import Signup from './signup';
import Ask from './ask';
import Forgot from './forgot';
import Profile from './profile';
import './App.css';

class App extends React.Component {




  render(){
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/header" component={Header}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/AmA" component={Ask}/>
            <Route path="/recover" component={Forgot}/>
            <Route path="/profile" component={Profile}/>
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
