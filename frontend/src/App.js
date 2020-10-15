import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import { useLocation } from 'react-router-dom';
import Ledger from './Components/Ledger';


function App() {
 const location = useLocation();
 const paths = ['/', '/login'];

 return (
  <div className="App">
   <div>

    {paths.includes(location.pathname) && (
     <div>
      <video autoPlay muted loop className="video">
       <source src="bg.mp4" type="video/mp4" />
      </video>
      <h1 className="heading">Expense Manager</h1>
     </div>
    )}
    <div className="card">
     <Route path="/" exact component={Register} />
     <Route path="/login" component={Login} />
    </div>
    <Route path="/dashboard" component={Dashboard} />
    <Route path = '/ledger' component={Ledger}/>
   </div>
  </div>
 );
}

export default App;
