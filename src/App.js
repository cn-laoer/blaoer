import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Index from './pages/index/index';
import {Router} from 'react-router-dom';
import PrivateRoute from './router/index';
import History from './api/history';

function App() {  
  return (
    <Router basename="/blaoer/build/" history={History}>
      <PrivateRoute path="/" component={Index}/>
    </Router>
  );
}

export default App;
