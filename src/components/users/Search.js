import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        text: ''
    };

    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    
    onSubmit = e =>{
        e.preventDefault();
        this.props.searchUser(this.state.text);
        this.setState({text:''});
    }

    render() {
        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type='text' name='text' placeholder='Search user...' value={this.state.text} onChange={this.onChange}/>
                    <input type='submit' className='btn btn-dark btn-block' value='Search'/>
                </form>
            </div>
        )
    }
}

Search.propType = {
    searchUser: PropTypes.func.isRequired
}

export default Search;