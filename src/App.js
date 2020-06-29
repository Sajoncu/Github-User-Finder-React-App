import React, { Component } from 'react'
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users : [],
    loading : false
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

  

  render(){
    return (
      <div>
        <Navbar title="GitHubFinder" icon="fab fa-github"/>
          <div className='container'>
            <Search 
              searchUser={this.searchUser}
            />
            <Users loading={this.state.loading} users={this.state.users}/>
          </div>
      </div>
    );
  }
}

export default App;
