import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {AiOutlineLogout} from "react-icons/ai";
import {MdDashboard} from "react-icons/md";
import {logOutRequest} from "../../Redux/Actions/AuthenticationAction";


const ToggleProfileHeader = () => {
    const logOutBtn = () => {
        props.dispatch(logOutRequest());
    };
    return(
        <div className='accountCollapseFrame'>
            <ul>
                <Link to='/dashboard'>
                    <li className='rowFrame'>
                        <MdDashboard />
                        <div>
                            <p>ناحیه کاربری</p>
                        </div>
                    </li>
                </Link>
                {/*<hr/>*/}
                <li className='rowFrame accountCollapseMenu' onClick={logOutBtn}>
                    <button onClick={props.logOutBtn}>
                        <AiOutlineLogout/>
                        <span>
                                خروج
                            </span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        avatar: state.AppReducer.userInfo.avatar
    }
};

export default connect(mapStateToProps)(ToggleProfileHeader);
