import React  from 'react'
import {Route} from 'react-router-dom';
import Footer from "../../../Container/Footer/Main/Footer";



const MainWebsiteLayout = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={matchProps => (
            <React.Fragment>
                <main>
                    <Component {...matchProps} />
                </main>
                <Footer/>
            </React.Fragment>
        )} />
    )
};
export default MainWebsiteLayout;
