import React from 'react';
import {Link} from "react-router-dom";
import './AuthSidebar.scss';
import Hidden from "@material-ui/core/Hidden";
import {AiOutlineSwapLeft} from "react-icons/all";

const AuthSidebar = () => {

    return (
        <div>
            {/*Display side in Tablet and desktop*/}
            <Hidden only={['md','sm', 'xs']}>
                <div className='authSidebar'>
                    <img src={require('../../assets/images/sidebar2.png')} alt='' />
                </div>
            </Hidden>

            {/*Display side in Mobile Devices*/}
            <Hidden only={[ 'lg', 'xl']}>
                <div className='authSidebar mobileAuthHeader'>
                    <Link to='/' className='sidebarBackBtn'>
                        بازگشت به صفحه اصلی
                        <AiOutlineSwapLeft />
                    </Link>
                </div>
            </Hidden>
        </div>
    )
};

export default AuthSidebar;
