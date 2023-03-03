import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import ForgetPassword from './components/ForgetPassword';


function App() {

  const [user, userlogin] = useState({});

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Signin  userlogin = {userlogin}/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          
        </Routes>
      </Router>

    </div>
  );
}

export default App;