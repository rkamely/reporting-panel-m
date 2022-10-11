
import React  from 'react'
import {Route} from 'react-router-dom';


const NonLayout = ({component: Component, ...rest}) => {

    return (
        <Route {...rest} render={matchProps => (
            <React.Fragment>
                <main>
                    <Component {...matchProps} />
                </main>
            </React.Fragment>
        )} />
    )
};
export default NonLayout;
