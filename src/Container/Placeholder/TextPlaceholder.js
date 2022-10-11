
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';


const TextPlaceholder = (props) => {

    let rows = [];
    for (var i = 0; i < props.rows; i++) {
        rows.push(
            <div className='itemPlaceholderFrame'>
                <Skeleton variant="circle" width={40} height={40} />
                <div style={{ width: '75%'}}>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </div>
            </div>
        );
    }
    return (
        <div className='placeHolderStyle'>
            {rows}
        </div>
    )
}
export default TextPlaceholder;

