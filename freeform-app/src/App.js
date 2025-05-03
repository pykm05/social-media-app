// Library imports
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Image imports
//import logo from './logo.svg';

// CSS imports
import './css/index.css';

// Page imports
import Home from './Home.js'
import Signup from './Signup.js'
import Login from './Login.js'


function App() {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/login' element = {<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
