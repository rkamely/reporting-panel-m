import React from 'react';
import {PropagateLoader} from "react-spinners";

const LoadingBackDrop = () => {
    return(
        <div className='loadingBackDrop'>
            <PropagateLoader
                size={14}
                margin='3px'
                color={"#31cfff"}
                loading={true}
            />
        </div>
    )
}
export default LoadingBackDrop;