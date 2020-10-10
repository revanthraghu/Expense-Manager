import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Register}/>
      <Route path = '/login' component={Login}/>
    </div>
  );
}

export default App;
