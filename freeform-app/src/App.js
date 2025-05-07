// Library imports
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Image imports
//import logo from "./logo.svg";

// CSS imports
import "./css/index.css";

// Page imports
import Home from "./Home.js"
import Signup from "./Signup.js"
import Login from "./Login.js"
import Feed from "./Feed.js"
import Profile from "./Profile.js"
import FriendRequests from "./FriendRequests.js"
import FriendList from "./FriendList.js"


function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/feed" element = {<Feed/>}/>
        <Route path = "/profile/:username" element = {<Profile/>}/>
        <Route path = "/friendlist" element = {<FriendList/>}/>
        <Route path = "/friendrequests" element = {<FriendRequests/>}/>
      </Routes>
    </Router>
  );
}

export default App;
