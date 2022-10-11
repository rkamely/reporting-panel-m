import React from 'react';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import Grow from "@material-ui/core/Grow";

const CheckItemIcon = (props) => {
    return(
        <Grow in={true}>
            <IoMdCheckmarkCircle name='IoMdCheckmarkCircle' className='checkChargeItemIcon' />
        </Grow>
    )
}

export default CheckItemIcon;