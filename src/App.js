import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Index from './pages/index/index';
import { HashRouter as Router} from 'react-router-dom';
import PrivateRoute from './router/index';
// import History from './api/history';

function App() {  
  return (
    <Router basename="/">
      <PrivateRoute path="/" component={Index}/>
    </Router>
  );
}

export default App;
