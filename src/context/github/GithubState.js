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

    // Get Repos

    // Clear Users

    // Set Loading
    const setLoading = () => dispatch({type: SET_LOADING});

    return (
        <GithubContext.Provider
            value = {{
                users: state.users,
                user: state.user,
                repos: state.repos,
                loading: state.loading,
                searchUser
            }}
        >
        {props.children}
        </GithubContext.Provider>
    )
}

export default GithubState;