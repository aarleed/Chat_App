import React, { Component } from 'react';
// import Navbar from './components/Navbar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Main from './components/Main'
import '../src/index.css'
import socketIOClient from "socket.io-client";


const ENDPOINT = "http://127.0.0.1:4001";
// reference https://www.valentinog.com/blog/socket-react/

class App extends Component {
  render() {
    const [response, setResponse] = React.useState("");
    useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
        setResponse(data);
      });
    }, []);

    return (
      <BrowserRouter>
        <div className="App">
          {/* <Navbar /> */}
          <Switch>
            <Route exact path='/' component={Login}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/main' component={Main}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
