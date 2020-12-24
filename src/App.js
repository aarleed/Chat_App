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
  state = {
    email: 'ag',
    password: '',
    gender: '',
    loggedIn: false
  };

  render() {
    
    // const [loadClient, setLoadClient] = useState(true);
    return (
      <BrowserRouter>
        <div className="App">
          {/* <Navbar /> */}
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/login' render={(state) => (
              <Login props={this.state} />
            )}/>
            <Route exact path='/main' render={(props) => (
              <Main {...props} props={this.state} />
              // <Main {...props} props={this.state} loggedIn={this.state.loggedIn} />
            )}/>
            {/* <Route exact path='/login' component={Login}/> */}
            {/* <Route exact path='/main' component={Main}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
