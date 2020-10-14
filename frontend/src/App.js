import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Register}/>
      <Route path = '/login' component={Login}/>
      <Route path = '/dashboard' component={Dashboard}/>
    </div>
  );
}

export default App;
