import React, { Component, useState } from 'react';
// import Navbar from './components/Navbar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './components/Main'
import '../src/index.css'
import ClientComponent from "./components/ClientComponent"


const ENDPOINT = "http://127.0.0.1:4001";
// reference https://www.valentinog.com/blog/socket-react/

class App extends Component {
  constructor() {
      super();
      this.handleSignIn = this.handleSignIn.bind(this); // pass ref to fct to mutate in child
      this.handleLogin = this.handleLogin.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
  }
  
  state = {
    email: localStorage.getItem("email") || '',
    password: localStorage.getItem("password") || '',
    gender: localStorage.getItem("gender") || '',
    loggedIn: localStorage.getItem("loggedIn") || false
  };
  
  handleSignIn = (data) => {
    console.log(data)
    this.setState({email: data.email, password: data.pass, gender: data.gender, loggedIn: false}, () => {
      console.log(this.state);
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("password", this.state.password);
      localStorage.setItem("gender", this.state.gender);
      localStorage.setItem("loggedIn", false);
    });
    
  }

  handleLogin = (data) => {
    this.setState({email: data.name, password: data.pass, loggedIn: data.loggedIn}, () => {
      console.log(this.state);
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("password", this.state.password);
      localStorage.setItem("loggedIn", this.state.loggedIn);
    });
  }

  handleLogout = () => {
    this.setState({email: '', password: '', loggedIn: false}, () => {
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("password", this.state.password);
      localStorage.setItem("loggedIn", this.state.loggedIn);
    })
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Navbar /> */}
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/signup' render={() => (
              <SignUp handleSignIn = {this.handleSignIn}/>
            )}/>
            <Route exact path='/login' render={(props) => (
              <Login {...props} state = {this.state} handleLogin = {this.handleLogin}/>

              // <Login props={this.state} />
            )}/>
            <Route exact path='/main' render={(props) => (
              <Main {...props} state={this.state} handleLogout = {this.handleLogout}/>
              // <Main {...props} props={this.state} loggedIn={this.state.loggedIn} />
            )}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
