import React, { Component } from 'react'
import './App.css';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users : [],
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

  //SET ALERT
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert:null}), 2000);
  };

  render(){
    const { users, loading, alert } = this.state;
    return (
      <div>
        <Navbar title="GitHubFinder" icon="fa fa-github"/>
          <div className='container'>
            <Alert alert={alert}/>
            <Search 
              searchUser={this.searchUser}
              clearUsers = {this.clearUsers}
              showClear = {users.length > 0 ? true : false}
              setAlert = {this.setAlert}
            />
            <Users loading={loading} users={users}/>
          </div>
      </div>
    );
  }
}

export default App;
