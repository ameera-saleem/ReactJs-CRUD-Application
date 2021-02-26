import React from 'react';
import Auth from './Auth'
import Home from './Home'
import Protected from './Protected'
import {Switch,Route, BrowserRouter as Router} from "react-router-dom"; 
import View from './View'
import ErrorPage from './ErrorPage'



const App = ()=>{
   
  
    return(
        <>
         <Router>
         <Switch>
        <Route exact  path = '/' component = {Auth} /> 
        <Route exact  path = '/home/view/:name' component = {View} /> 
         <Protected exact path = '/home'  component = {Home}/>
         <Route component = {ErrorPage}/>
        </Switch> 
        </Router>
        </>
        
      );
}

export default App
