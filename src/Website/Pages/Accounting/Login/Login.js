import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { connect, useSelector } from 'react-redux';
import { BeatLoader } from "react-spinners";
import './Login.scss';
import {AiOutlineUser, AiOutlineEye} from "react-icons/ai";
import AuthSidebar from "../../../../Container/AuthSidebar/AuthSidebar";
import ErrorAuthenticationDialog from "../../../../Container/Dialog/ErrorAuthenticationDialog";
import { Input  } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {
    isAuthenticated,
    isLoginPending, LoginAPIFunction
} from "../../../../Redux/Actions/AuthenticationAction";
import { useSnackbar } from 'notistack';
import ValidateLoginForm from "../../../../Container/Validation/Authentication/ValidateLoginForm";
import TokenKey from '../../../Modules/TokenKey';
import Iframe from 'react-iframe'





const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [ invalidLogin, setInvalidLogin ] = useState(false);

    var jwt = require('jsonwebtoken');
    const userState = useSelector(state => state.AppReducer);


    useEffect(() => {
        props.dispatch(isLoginPending(false));


        /*************** Redirect Page If User Be Authorized ******************/
        // if (userState.hasAuthenticated){
        //     if (userState.operatorType === 'MTN'){
        //         props.history.push('/mtnMainPage');
        //     }
        //     else{
        //         props.history.push('/mciMainPage');
        //     }

        // }
    }, []);

    const { enqueueSnackbar } = useSnackbar();

    const pushErrorSnack = (variant) => {
        enqueueSnackbar('نام کاربری یا کلمه عبور صحیح نیست', { variant });
    }

    /*************** Change Value of Inputs And Set In State ******************/
    const changeInputValue = (e) => {
        switch (e.target.name) {
            case 'usernameInput':
                setUsername(e.target.value);
                break;
            case 'passwordInput':
                setPassword(e.target.value)
                break;
            default:
                return;
        }
    };

    /*************** The Function When Submit Button Clicks ******************/
    const submitForm = (e) => {
        setErrors({});
        e.preventDefault();

        /************* Check The Validation In Client Side ******************/
        ValidateLoginForm(username, password)
            .then(() => {
                props.dispatch(isLoginPending(true));
                props.dispatch(isAuthenticated(true));

                /************* Call Login API In Action Creator ******************/
                LoginAPIFunction(username, password)
                    .then(() => {
                        var key = TokenKey();
                        var token = jwt.sign({ tokenValue: '1B87E5971A602DE38CA055159AA7E5F74358946D361EEB59FCA0C8233E528EE2' },
                            key);
                        localStorage.setItem('token', token);
                        setTimeout(()=>{

                            props.dispatch(isLoginPending(false));
                            if (userState.operatorType === 'MTN'){
                                props.history.push('/mtnMainPage');
                            }
                            else{
                                props.history.push('/mciMainPage');
                            }
                        }, 3000)
                    })
                    .catch((err) => {
                        setTimeout(() => {
                            props.dispatch(isLoginPending(false));
                            // setInvalidLogin(true);
                            pushErrorSnack('error');
                        }, 2000)
                    })
            })
            .catch((err) => {
                props.dispatch(isLoginPending(false));
                setErrors(err.errorsObject);
            })
    };



    /********************* The Function To evacuate The Fields ********************/
    // const resetForm = () => {
    //     props.dispatch(isLoginPending(false));
    //     setUsername('');
    //     setPassword('');
    //     setErrors({});
    // }

    return(
        <div className='authPageStyle'>
            <AuthSidebar />
            {
                invalidLogin?
                    <ErrorAuthenticationDialog openDialog={invalidLogin} close={() => setInvalidLogin(false)}
                        dialogTitle={FaStaticTexts.loginErrorDialogTitle} dialogMessage={FaStaticTexts.loginErrorDialogMessage}
                    />:null
            }
            <div className='authContainer'>
                <img src={require('../../../../assets/images/setare1Logo.png')} className='authMainPageLogo'
                     alt={FaStaticTexts.signatureTitle} />
                {/* <Link to='/' className='sidebarBackBtn'>
                    {FaStaticTexts.returnToMainPageText}
                    <AiOutlineSwapLeft />
                </Link> */}
                <Grow in={true} appear={true}>
                    <div>
                        <h5>{FaStaticTexts.enterToManagementSystemTitle}</h5>
                        <h6>{FaStaticTexts.enterUsernameAndPasswordText}</h6>
                        <form className='customForm' onSubmit={submitForm}>
                            <div className='inputRow'>
                                <FormControl className={'customInput ' + (errors.username ? "errorOnInput" : "")} >
                                    <Input
                                        type='text' name='usernameInput'
                                        placeholder={FaStaticTexts.usernameTitle}
                                        value={username} onChange={changeInputValue}
                                        endAdornment={
                                            <InputAdornment position="end" className='inRowInputIcon'>
                                                <AiOutlineUser />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <span>
                                    {errors.username? errors.username : null}
                                </span>
                            </div>
                            <div className='inputRow'>
                                <FormControl className={'customInput ' + (errors.password ? "errorOnInput" : "")} >
                                    <Input
                                        type='password'
                                        name='passwordInput'
                                        value={password}
                                        placeholder={FaStaticTexts.passwordTitle}
                                        onChange={changeInputValue}
                                        endAdornment={
                                            <InputAdornment position="end" className='inRowInputIcon'>
                                                <AiOutlineEye />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <span>
                                    {errors.password ? errors.password: null}
                                </span>
                            </div>
                            <Button type='submit' className='authenticationSubmitBtn'
                                    disabled={userState.isLoginPending}>
                                {
                                    userState.isLoginPending?
                                        <BeatLoader
                                            size={9}
                                            color={"#fff"}
                                            loading={true}
                                        />: <span>{FaStaticTexts.loginButtonText}</span>
                                }
                            </Button>
                        </form>

                    </div>
                </Grow>
            </div>
        </div>
    )
}


export default connect()(Login);
