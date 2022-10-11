import React from 'react'
import {Route} from 'react-router-dom';
import '../../../Styles/_mainStyles.scss';
import { SnackbarProvider } from 'notistack';


const AuthWebsiteLayout = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={matchProps => (
            <SnackbarProvider maxSnack={3} autoHideDuration={2000} >
                <React.Fragment>
                    {/*<WebsiteHeader />*/}
                    <main>
                        <Component {...matchProps} />
                    </main>
                    {/*<Footer/>*/}
                </React.Fragment>
            </SnackbarProvider>
        )} />
    )
};
export default AuthWebsiteLayout;
