import React from 'react';

import './Button.scss';

const Button = (props) => {

    let classes = ['customBtn'];
    switch (props.btnType) {
        case 'loginNavBtn':
            classes.push('loginNavBtn');
            break;
        case 'registerNavBtn':
            classes.push('registerNavBtn');
            break;
        case 'danger':
            classes.push('danger');
            break;
        case 'alert':
            classes.push('alert');
            break;
        case 'info':
            classes.push('info');
            break;
        case 'darkOrange':
            classes.push('darkOrange');
            break;
        case 'authBtn':
            classes.push('authBtn');
            break;
        default:
            break;
    }
    return (
        <button className={classes.join(' ')}>
            <p>{props.children}</p>
        </button>
    )
};


export default Button;