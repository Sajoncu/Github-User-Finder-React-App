import React, { Fragment, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';
import axios from 'axios';
import Search from './components/users/Search';

const App =  () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  // state = {
  //   users : [],
  //   user: {},
  //   repos: [],
  //   loading : false,
  //   alert : null
  // };

  // async componentDidMount() {
  //   this.setState({loading:true});
  //   const res = await axios.get('https://api.github.com/users');
  //   this.setState({users:res.data, loading: false});
  // }

  //SEARCH GITHUB USER
  const searchUser = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    
    //this.setState({users:res.data.items, loading: false});
    setUsers(res.data.items);
    setLoading(false);
  }

  // CLEAR USERS
  const clearUsers = () => {
    //this.setState({users:[], loading: false});
    setUsers([]);
    setLoading(false);
  }
  

  // GET SINGLE USER
  const getSingleUSer = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}`);
    console.log(res.data.items);
    //this.setState({user:res.data, loading: false});
    setUser(res.data);
    setLoading(false);
  }

  // GET SINGLE USER REPOSITORY
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created`);

    //this.setState({repos:res.data, loading: false});
    setRepos(res.data);
    setLoading(false);
  }

  //SET ALERT
  const showAlert = (msg, type) => {
    //this.setState({alert: {msg, type}});
    setAlert({msg, type});
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <Router>
      <div className='App'>
        <Navbar title="GitHubFinder" icon="fa fa-github"/>
          <div className='container'>
            <Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                  <Fragment>
                    <Search 
                      searchUser={searchUser}
                      clearUsers = {clearUsers}
                      showClear = {users.length > 0 ? true : false}
                      setAlert = {showAlert}
                    />
                    <Users loading={loading} users={users}/>
                  </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props=>(
                <User 
                  {...props}
                  getUser={getSingleUSer}
                  getUserRepos={getUserRepos}
                  repos = {repos}
                  user={user} 
                  loading={loading} /> // (...) spread operator
              )}/>
            </Switch>

          </div>
      </div>
    </Router>
  );
}

export default App;
