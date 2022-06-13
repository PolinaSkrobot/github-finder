import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

import "./App.css";
const App = () => {
  // useEffect(() => {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   setLoading(true);
  //   async function fetch() {
  //     const resa = await axios.get(
  //       `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //     );
  //     setUsers(resa.data);
  //     setLoading(false);
  //   }
  //   fetch();
  // }, []);

  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Routes>
                <Route exact path='/' element={<Home></Home>} />
                <Route exact path='/about' element={<About></About>} />
                <Route exact path='/user/:login' element={<User></User>} />
                <Route path='*' element={<NotFound></NotFound>} />
              </Routes>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
