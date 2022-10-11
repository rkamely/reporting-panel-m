import React from 'react';
import Routes from "./Routes/Routes";

import './assets/fonts/fonts.css';
import './Styles/_mainStyles.scss';
import { Provider } from "react-redux";
import createStore from './Store/Store';
import {loadState, saveState} from "./localStorage";
import axios from 'axios';


const persistedState = loadState();
const store = createStore(persistedState);

store.subscribe(() => {
    saveState(store.getState())
});



// For GET requests
axios.interceptors.request.use(
    (req) => {
       // Add configurations here
       return req;
    },
    (err) => {
       return Promise.reject(err);
    }
 );
 
 // For POST requests
 axios.interceptors.response.use(
    (res) => {
       // Add configurations here
       if (res.status === 201) {
          console.log('Posted Successfully');
       }
       return res;
    },
    (err) => {
       return Promise.reject(err);
    }
 );

const App = () =>  {
    return (
        <Provider store={store}>
            <div className='test'>
                <Routes/>
            </div>
        </Provider>
    )
};

export default App;
