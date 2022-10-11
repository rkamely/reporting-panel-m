import React from 'react';

const QuickAccessBox = (props) => {
    return (
        <li className='dashQuickAccessBoxFrame'>
            <div>
                <h3>{props.title}</h3>
                <h6>
                    {props.message}
                </h6>
            </div>
            <div className={['dashQuickColorBox', props.color].join(' ')}>
                {props.icon}
            </div>
        </li>
    )
}

export default QuickAccessBox;