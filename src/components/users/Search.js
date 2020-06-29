import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
* SEARCH COMPONENT (FUNCTIONS BASED)
*/
class Search extends Component {

    // FOR STATE MANAGEMENT
    state = {
        text: ''
    };

    // SET PROPS VALIDATION
    static propType = {
        searchUser: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired
    };

    // GET SEARCH KEYWORD FROM THE INPUT FIELD
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
    // SEARCH GITHUB USER
    onSubmit = e =>{
        e.preventDefault();
        if(this.state.text === '') {
            this.props.setAlert('Please enter something.', 'danger');
        } else {
            this.props.searchUser(this.state.text);
            this.setState({text:''});
        }
    }

    // THIS WILL CLEAR USERS FROM THE WINDOW 
    //clearUsers = e => this.props.clearUsers();

    // THIS WILL RENDER THE CURRENT COMPONENT
    render() {
        const {clearUsers, showClear} = this.props
        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type='text' name='text' placeholder='Search user...' value={this.state.text} onChange={this.onChange}/>
                    <input type='submit' className='btn btn-dark btn-block' value='Search'/>
                </form>

                {showClear && (
                    <button className='btn btn-danger btn-block' onClick={clearUsers}>CLEAR</button>
                )}
                
            </div>
        )
    }
}



export default Search;