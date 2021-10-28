import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import React from 'react'
import './App.css';
import Dashboard from './Dashboard';
import { UserContextProvider } from './contexts/user';



function App() {
  return (
  
 
    <UserContextProvider>
       <Router >
    <Switch>
     

    <Route path="/Dashboard" component={Dashboard}>
        <Dashboard/>
      </Route>
      
     
      </Switch>
      </Router>
    </UserContextProvider>      
 
  );
}

export default App;
