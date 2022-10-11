import React, { useEffect } from 'react'
import {Route, useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardHeader from "../../../Container/Header/DashboardHeader/DashboardHeader";
import Hidden from "@material-ui/core/Hidden";
import DashboardDesktopSideMenu from "../../Dashboard/DashboardSideMenu/DashboardDesktopSideMenu";
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import * as Scroll from 'react-scroll';
import {IoIosArrowUp} from 'react-icons/io';
import TokenKey from '../../Modules/TokenKey';


const DashboardLayout = ({component: Component, ...rest}) => {
    
    var scroll = Scroll.animateScroll;

    const history = useHistory();  
    var jwt = require('jsonwebtoken');  

    useEffect(() => {
        scrollToTop();        
    }, []);
    useEffect(() => {
        permissionCheck();
    }, [Component]);

    const permissionCheck = async () => {
        let decodedToken;
        let key = await TokenKey();
        let tokenValue = await localStorage.getItem('token');
        jwt.verify(tokenValue, key, function(err, decoded) {
            if(decoded !== undefined){
                decodedToken = decoded.tokenValue;
            }
        });
        if(decodedToken !== '1B87E5971A602DE38CA055159AA7E5F74358946D361EEB59FCA0C8233E528EE2'){
            localStorage.clear();
            history.push('/');
        }
    }
    
    const scrollToTop = () => {
        scroll.scrollToTop({
            duration: 1500,
            delay: 100,
            smooth: 'easeInOutQuint'
        });
    }

    return (
        <Route {...rest} render={matchProps => (
            <SnackbarProvider maxSnack={3} autoHideDuration={2000} >
                <React.Fragment>
                    <main>
                        <DashboardHeader />
                        <div className='dashboardBackgroundColor'>
                            <div className='myContainer dashboardContentFrame'>
                                <Hidden only={['xs', 'sm']}>
                                    <DashboardDesktopSideMenu />
                                </Hidden>
                                <Component {...matchProps} />
                            </div>
                        </div>
                        <Button style={{ position: 'fixed', bottom: 30, left: 20, backgroundColor: '#f50057',
                                borderRadius: 100, minWidth: 45, minHeight: 45 }} 
                            onClick={() => scrollToTop()}>
                                <IoIosArrowUp style={{ color: '#fff',  fontSize: 25}} />
                            </Button>
                    </main>
                </React.Fragment>
            </SnackbarProvider>
        )} />
    )
};
export default DashboardLayout;
