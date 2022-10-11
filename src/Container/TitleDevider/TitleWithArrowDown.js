import React from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const TitleWithArrowDown = (props) => {
    const { title, onClick, arrowDirection } = props;
    return(
        <div className='TitleWithArrowDownStyle' onClick={onClick}>
            <h4>{title}</h4>
            {
                arrowDirection?
                <IoIosArrowUp name='IoIosArrowUp' /> :
                <IoIosArrowDown name='IoIosArrowDown' />   
            }
            
        </div>
    )
}

export default TitleWithArrowDown;