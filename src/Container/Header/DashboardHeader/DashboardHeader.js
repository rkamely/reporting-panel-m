import React, {useState, useEffect, memo} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {VscBell, VscMail, IoIosMenu, AiOutlineArrowRight} from "react-icons/all";

import './DashboardHeader.scss';
import BasicModal from '../../Modal/Modal';
import logo from '../../../assets/images/icon/logo2.png';
import {changeOperatorType, logOutRequest} from "../../../Redux/Actions/AuthenticationAction";
import DashboardSideMenu from "../../../Website/Dashboard/DashboardSideMenu/DashboardSideMenu";
import ConfirmActionDialog from "../../Dialog/ConfirmActionDialog";
import FaStaticTexts from "../../../Constants/Fa/FaStatic";

import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Toggle from "../../Toggle/Toggle";
import {Button} from '@material-ui/core';
import useDarkMode from "use-dark-mode";
import { isLoginPending } from '../../../Redux/Actions/AuthenticationAction';


const DashboardHeader = (props) => {

    const [menuModal, setMenuModal] = useState(false);
    const [operator, setOperator] = useState('');
    const [staticText, setStaticText] = useState({});
    const [toggleAccountState, setToggleAccountState] = useState(false);
    const [backdrop, setBackdrop] = useState(false);
    const [right, setRight] = useState(false);
    const [logOutRequestState, setLogOutRequestState] = useState(false);

    const userState = useSelector(state => state.AppReducer);
    const dispatch = useDispatch();

    const darkMode = useDarkMode(false);

    useEffect(() => {
        setStaticText(FaStaticTexts);
        if (userState.operatorType === 'MCI'){
            setOperator('همراه اول');
        }
        else{
            setOperator('ایرانسل');
        };
    }, [])

    const toggleModal = () => {
        setMenuModal(!menuModal)
    };

    const toggleAccountFunc = () => {
        setToggleAccountState(!toggleAccountState);
        setBackdrop(!backdrop)
    };

    const logOutBtn = () => {
        dispatch(isLoginPending(true));
        setTimeout(() => {
            dispatch(logOutRequest());
        }, 2000);
    };
    const openLogoutRequest = () => {
        setLogOutRequestState(true)
    };

    const toggleDrawerFunc = () => {

        setToggleAccountState(!toggleAccountState)
    };

    /******************* The Function To Change The Operator **********************/
    const handleChangeSelect = (e) => {
        dispatch(changeOperatorType(`${e.target.value}`));
        if (e.target.value === 'MCI'){
            setOperator('همراه اول');
            props.history.push('/mciMainPage')
        }
        else{
            setOperator('ایرانسل');
            props.history.push('/mtnMainPage')
        }
    }

    return(
        <div>

            {
                logOutRequestState?
                    <ConfirmActionDialog
                        dialogTitle={staticText.exitDialogTitle} closeDialog={()=>setLogOutRequestState(false)}
                        dialogMessage={staticText.exitDialogMessage} approveAction={logOutBtn}/>: null
            }

            <div className='mainHeaderDashboardFrame'>

                {
                    backdrop?
                        <div className='backdropLayer' onClick={toggleAccountFunc} />:null
                }
                <div className='myContainer mainNavbar'>
                    {
                        menuModal ?
                            <BasicModal modalType='menu' hideMyModal={toggleModal}/>:null
                    }
                    <div className='menuFrame'>
                        <div className='mobileRightOfMenu'>
                            <Hidden only={['xl','lg', 'md']}>
                                <button
                                    className='hamburgerMenuIcon'
                                    onClick={()=>setRight(true)}>
                                    <IoIosMenu/>
                                </button>
                            </Hidden>
                            <Link to='/dashboard'>
                                <img src={logo} alt={staticText.signatureTitle}/>
                            </Link>
                            <Hidden only={['sm', 'xs']}>
                                <h2>{staticText.mainDashboardTitle}</h2>
                            </Hidden>
                        </div>

                        <div className='navbarLeftBtns'>
                        <Hidden only={['sm', 'xs']}>
                                <FormControl className='changeOperatorSelectFrame'>
                                    <span className='inputLabel'>{operator === ''? 'تفییر اپراتور': operator}</span>
                                    <Select
                                        id="demo-simple-select"
                                        value={operator}
                                        onChange={handleChangeSelect}
                                    >
                                        <MenuItem value='MTN'>ایرانسل</MenuItem>
                                        <MenuItem value='MCI'>همراه اول </MenuItem>
                                    </Select>
                                </FormControl>
                            </Hidden>
                            <ul className='leftSideHeaderMenuButtons'>
                                <li>
                                    <span className='counterFrame'>15</span>
                                    <Link to='/announce'>
                                        <VscBell />
                                        {staticText.headerAnnounceButtonText}
                                    </Link>
                                </li>
                                <li>
                                    <span className='counterFrame'>24</span>
                                    <Link to='/messages'>
                                        <VscMail />
                                        {staticText.headerMessagesButtonText}
                                    </Link>
                                </li>
                            </ul>
                            <div className="dark-mode-toggle">
                                <button type="button" onClick={darkMode.disable}>
                                    ☀
                                </button>
                                <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
                                <button type="button" onClick={darkMode.enable}>
                                    ☾
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Drawer anchor="right" open={right} onClose={()=>setRight(false)}>
                <Button style={{ position: 'fixed', bottom: 30, left: 20, backgroundColor: '#f50057',
                    borderRadius: 100, minWidth: 45, minHeight: 45 }}
                onClick={()=>setRight(false)}>
                    <AiOutlineArrowRight style={{ color: '#fff',  fontSize: 25}} />
                </Button>
                <div
                    tabIndex={0}
                    role="button"
                    onKeyDown={()=>setRight(false)}>
                    <DashboardSideMenu logOutRequest={openLogoutRequest}/>
                </div>
            </Drawer>

        </div>
    )
}

export default memo(withRouter(connect()(DashboardHeader)));
