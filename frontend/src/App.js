import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';

function App() {

 return (
  <div className="App">
   <div>
    <video autoPlay muted loop className="video">
     <source src="bg.mp4" type="video/mp4" />
    </video>
    <h1 className="heading">Expense Manager</h1>
    <div className="card">
     <Route path="/" exact component={Register} />
     <Route path="/login" component={Login} />
     <Route path = '/dashboard' component={Dashboard}/>


    </div>
   </div>
  </div>
 );
}

export default App;
