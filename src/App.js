import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }
  // async componentDidMount() {
  //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
  //   this.setState({loading:true});
  //   const resa = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({loading:false, users: resa.data});
  // }
  searchUsers =async (inputValue) => {
    this.setState({loading:true});
    const resa = await axios.get(`https://api.github.com/search/users?q=${inputValue}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({loading:false, users: resa.data.items});
  }
  clearUsers = () => {
    this.setState({users: [], loading: false})
  }
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(()=>{
      this.setState({alert: null})
    }, 3000)
  }
  render() {
    const { users, loading} = this.state
    return (
      <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={this.state.alert}/>
          <Routes>
            <Route exact path='/' element={
              <Fragment>
                <Search searchUsers={this.searchUsers} 
                        clearUsers={this.clearUsers} 
                        showClear={users.length? true: false}
                        setAlert={this.setAlert}></Search>
                <Users loading={loading} users={users}></Users>
              </Fragment>

            } />
            <Route exact path='/about' element={<About></About>} />            
          </Routes>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
