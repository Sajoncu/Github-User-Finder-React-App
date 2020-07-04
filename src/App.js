import React, { Fragment, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// COMPONENTS
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import About from './components/pages/About';
import Search from './components/users/Search';

// CONTEXTS FOR STATE MANAGEMENT AND CODE REUSE
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState'

// STYLE SHEET
import './App.css';

const App =  () => {
  return (
    <GithubState>
      <AlertState>
      <Router>
        <div className='App'>
          <Navbar title="GitHubFinder" icon="fa fa-github"/>
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' render={props => (
                    <Fragment>
                      <Search />
                      {/* <Users loading={loading} users={users}/> */}
                      <Users />
                    </Fragment>
                )} />

                <Route exact path='/about' component={About} />
                <Route exact path='/user/:login' component={User}/>
                
              </Switch>

            </div>
        </div>
      </Router>
      </AlertState>
    </GithubState>
  );
}

export default App;
