import React, { useState, useContext } from 'react'

import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
/*
* SEARCH COMPONENT (FUNCTIONS BASED)
*/
const Search = () => {
    // INITIALIZE CONTEXT
    const gitHubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);

    // FOR STATE MANAGEMENT
    const [text, setText] = useState('');

    // GET SEARCH KEYWORD FROM THE INPUT FIELD
    const onChange = (e) => setText(e.target.value);
    
    // SEARCH GITHUB USER
    const onSubmit = e =>{
        e.preventDefault();
        if(text === '') {
            alertContext.setAlert('Please enter something.', 'danger');
        } else {
            gitHubContext.searchUser(text);
            setText('');
        }
    }

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type='text' name='text' placeholder='Search user...' value={text} onChange={onChange}/>
                <input type='submit' className='btn btn-dark btn-block' value='Search'/>
            </form>

            {gitHubContext.users.length > 0 && (
                <button className='btn btn-danger btn-block' onClick={gitHubContext.clearUsers}>CLEAR</button>
            )}
            
        </div>
    )
}

export default Search;