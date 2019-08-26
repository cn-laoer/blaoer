import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Index from './pages/index/index';
import {Switch, Router, Route} from 'react-router-dom';
import PrivateRoute from './router/index';
import History from './api/history';
import Login from './pages/login/index';
import NotFound from './pages/result/notFound/index';

function App() {  
  return (
    // <div>
    //   {
    //     (isLogin.loginState()) ? 
    //     (
    //       <Router basename="/" history={History}>
    //         <PrivateRoute path="/" component={Index}/>
    //       </Router>
    //     ) :
    //     (
    //       <Router basename="/" history={History}>
    //         <Route path="/login" component={Login}/>
    //       </Router>
    //     )
    //   }
    // </div>
    <Router basename="/" history={History}>
      <Switch>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/" component={Index}/>
        <Route component={NotFound}/>
      </Switch>
    </Router>
  );
}

export default App;
