import React, { Component, Fragment } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';
import axios from 'axios';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users : [],
    user: {},
    loading : false,
    alert : null
  };

  // async componentDidMount() {
  //   this.setState({loading:true});
  //   const res = await axios.get('https://api.github.com/users');
  //   this.setState({users:res.data, loading: false});
  // }

  //SEARCH GITHUB USER
  searchUser = async (text) => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    console.log(res.data.items);
    this.setState({users:res.data.items, loading: false});
  }

  // CLEAR USERS
  clearUsers = () => this.setState({users:[], loading: false});

  // GET SINGLE USER
  getSingleUSer = async (username) => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}`);
    console.log(res.data.items);
    this.setState({user:res.data, loading: false});
  }

  //SET ALERT
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert:null}), 2000);
  };

  render(){
    const { users, loading, alert, user } = this.state;
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
                        searchUser={this.searchUser}
                        clearUsers = {this.clearUsers}
                        showClear = {users.length > 0 ? true : false}
                        setAlert = {this.setAlert}
                      />
                      <Users loading={loading} users={users}/>
                    </Fragment>
                )} />

                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' render={props=>(
                  <User {...props} getUser={this.getSingleUSer} user={user} loading={loading} /> // (...) spread operator
                )}/>
              </Switch>

            </div>
        </div>
      </Router>
    );
  }
}

export default App;
