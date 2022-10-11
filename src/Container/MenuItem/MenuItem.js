import React from 'react';

import { Link } from 'react-router-dom';
import './MenuItem.scss';

const MenuItem = (props) => {
    return(
        <li className='menuItem'>
            <Link to={props.linkTo}>{props.children}</Link>
        </li>
    )
};

export default MenuItem;