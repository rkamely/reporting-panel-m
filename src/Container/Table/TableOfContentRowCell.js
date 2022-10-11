import React from 'react';
import Hidden from "@material-ui/core/Hidden";

const TableOfContentRowCell = (props) => {

    const { width, title, text, isRtl, cellType } = props;

    let rtlDirection;
    if (isRtl){
        rtlDirection = 'rtl'
    }
    else{
        rtlDirection = 'ltr'
    }
    return(
        <li className='tableOfContentRowCell'
            style={{width: width, direction: rtlDirection }}>
                <Hidden only={['xl','lg', 'md']}>
                    <span className='inMobileLabelTitle'>
                        {title}:
                    </span>
                </Hidden>
            {text}
            {
                cellType === 'price'?
                ' ریال': null
            }
        </li>
    )
}

export default TableOfContentRowCell;