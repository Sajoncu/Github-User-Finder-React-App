import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types';

import GithubContext from '../../context/github/githubContext';
/*
* SEARCH COMPONENT (FUNCTIONS BASED)
*/
const Search = ({clearUsers, showClear, setAlert}) => {
    // INITIALIZE CONTEXT
    const gitHubContext = useContext(GithubContext);

    // FOR STATE MANAGEMENT
    const [text, setText] = useState('');

    // GET SEARCH KEYWORD FROM THE INPUT FIELD
    const onChange = (e) => setText(e.target.value);
    
    // SEARCH GITHUB USER
    const onSubmit = e =>{
        e.preventDefault();
        if(text === '') {
            setAlert('Please enter something.', 'danger');
        } else {
            gitHubContext.searchUser(text);
            setText('');
        }
    }

    // THIS WILL CLEAR USERS FROM THE WINDOW 
    // const clearUsers = e => clearUsers();

// THIS WILL RENDER THE CURRENT COMPONENT
    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search user...' value={text} onChange={onChange}/>
                <input type='submit' className='btn btn-dark btn-block' value='Search'/>
            </form>

            {showClear && (
                <button className='btn btn-danger btn-block' onClick={clearUsers}>CLEAR</button>
            )}
            
        </div>
    )
}

// SET PROPS VALIDATION
Search.propType = {
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired
};

export default Search;