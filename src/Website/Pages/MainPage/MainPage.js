import React from 'react';
import {Link} from 'react-router-dom';
import bg  from '../../../assets/images/entrancebg.png';
import './mainPage.scss';

const MainPage = () => {
    return(
        <div className="mainPageCentralFrame">
            <img src={bg} className='entranceBg' alt='' />
            <div className='myContainer quickAccessManagementFrame'>
                <div>
                    {/*<Link to='/' className='quickAccessManagementBox'>*/}
                    {/*    ZSM*/}
                    {/*</Link>*/}
                    <Link to='/login' className='quickAccessManagementBox'>
                        Behsa
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MainPage;
