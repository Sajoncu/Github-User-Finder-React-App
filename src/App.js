import React, { Component } from 'react'
import './App.css';
import Navbar from './components/layout/Navbar'
import UserItem from './components/users/UserItem';
class App extends Component {
  render() {
    return (
      <div>
        <Navbar title="GitHubFinder" icon="fab fa-github"/>
        <UserItem />
      </div>
    )
  }
}

export default App;
