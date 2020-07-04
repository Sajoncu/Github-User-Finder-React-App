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

import GithubState from './context/github/GithubState';

const App =  () => {
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


  // CLEAR USERS


  // GET SINGLE USER


  // GET SINGLE USER REPOSITORY


  //SET ALERT
  const showAlert = (msg, type) => {
    //this.setState({alert: {msg, type}});
    setAlert({msg, type});
    setTimeout(() => setAlert(null), 2000);
  };

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title="GitHubFinder" icon="fa fa-github"/>
            <div className='container'>
              <Alert alert={alert}/>
              <Switch>
                <Route exact path='/' render={props => (
                    <Fragment>
                      <Search
                        setAlert = {showAlert}
                      />
                      {/* <Users loading={loading} users={users}/> */}
                      <Users/>
                    </Fragment>
                )} />

                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User}/>
              </Switch>

            </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;
