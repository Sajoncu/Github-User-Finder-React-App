import React, {Fragment} from 'react'
import spinner from './spinner.gif';

/*
* SPINNER COMPONENT FOR SHOWING SPINNER WHILE SEARCHING USERS
*/
const Spinner = () => <Fragment>
            <img src={spinner} alt="Loading..." style={{width: '200px', margin: 'auto', display: 'block'}}></img>
        </Fragment>

export default Spinner