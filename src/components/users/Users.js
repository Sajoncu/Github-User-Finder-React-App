import React, { Component } from 'react'
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'

/*
 * USERS COMPONENT WILL SHOW ALL THE SEARCHED USERS 
 */
const Users = ({loading, users}) => {
    if(loading) {
        return <Spinner />
    } else {
        return (
            <div style={userStyle}>
                {   
                    users.map( user => (
                        <UserItem key={user.id} user={user} />
                    ))
                }
            </div>
        )
    }
    
}

// SET PROPS VALIDATION
Users.propType = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

// MANUAL STYLE FOR THE USERS GIRD
const userStyle = {
    display: 'grid', 
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
};

export default Users
