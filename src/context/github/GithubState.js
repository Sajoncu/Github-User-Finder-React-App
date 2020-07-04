import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
    SEARCH_USERS,
    SET_LOADING,
    SET_ALERT,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    REMOVE_ALERT
} from '../types';

const GithubState = props => {
    const initialState = {
        users : [],
        user: {},
        repos: [],
        loading : false,
        alert : null
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search User
    const searchUser = async (text) => {
        setLoading();
    
        const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
        
        //this.setState({users:res.data.items, loading: false});
        // setUsers(res.data.items);
        console.log(res.data.items);
        // setLoading(false);
        dispatch({type: SEARCH_USERS, payload: res.data.items});
    }
    // Get User
    const getUser = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}`);
        console.log(res.data);
        //this.setState({user:res.data, loading: false});
        // setUser(res.data);
        // setLoading(false);
        dispatch({type: GET_USER, payload: res.data});
    }
    // Get Repos
    const getUserRepos = async (username) => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created`);
    
        //this.setState({repos:res.data, loading: false});
        // setRepos(res.data);
        // setLoading(false);
        dispatch({type: GET_REPOS, payload: res.data});
      }
    // Clear Users
    const clearUsers = () => {
        //this.setState({users:[], loading: false});
        // setUsers([]);
        // setLoading(false);
        dispatch({type: CLEAR_USERS});
    }
      
    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <GithubContext.Provider
            value = {{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUser,
                clearUsers,
                getUser,
                getUserRepos
            }}
        >
        {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;