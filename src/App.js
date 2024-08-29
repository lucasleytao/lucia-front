import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Login from './pages/Login';
import Main from './components/novoFront/Main';
import Register from './pages/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<Login />}/>
        <Route exact path="/home/*" element={<Main />}/>
        <Route exact path="/register" element={<Register />}/>
      </Routes>
    </Router>
  );
};

export default App;
