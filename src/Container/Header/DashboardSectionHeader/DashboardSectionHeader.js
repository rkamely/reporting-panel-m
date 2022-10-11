import React from 'react';
import {AiOutlineSwapLeft} from "react-icons/all";
import { withRouter } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';


const DashboardSectionHeader = (props) => {
    const { title, message, icon, color } = props;
    return(
        <div className={['dashboardSectionHeader', color].join(' ')}>
            <div className='inRowFlexItems dashboardHeaderDetailFrame'>
                {icon}
                <span>
                    <h3>{title}</h3>
                    <Hidden only={['sm', 'xs']}>
                        <p>{message}</p>    
                    </Hidden>
                </span>
            </div>
            <button className='dashboardSectionHeaderBackBtn' onClick={()=>props.history.goBack()}>
                <span>بازگشت</span>
                <AiOutlineSwapLeft />
                
            </button>
        </div>
    )
}

export default withRouter(DashboardSectionHeader);