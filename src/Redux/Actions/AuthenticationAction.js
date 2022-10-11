import {
    IS_AUTHENTICATED,
    IS_LOGIN_PENDING,
    GET_USER_INFORMATION,
    CALCULATE_LOADING,
    CHANGE_OPERATOR_TYPE,
    ACTIVE_NIGHT_MODE,
} from '../../Common/Const/ActionConst';
import axios from "axios";
import {getTokenFromLocalStorage} from "../../AuthorizeStorage";
import BaseURL from "../../BaseURL";
import SimpleRequest from "../../Container/Axios/SimpleRequest";


var baseURL = BaseURL();
export const isLoginPending = (isLoginPending) => ({
    type: IS_LOGIN_PENDING,
    isLoginPending
});

export const isAuthenticated = (authenStatus) => ({
    type: IS_AUTHENTICATED,
    authenStatus
});

export const getUserInformation = (data) => ({
    type: GET_USER_INFORMATION,
    data
});

export const calculateLoading = (param) => ({
    type: CALCULATE_LOADING,
    calculateLoading: param
});

export const changeOperatorFunc = (data) => ({
    type: CHANGE_OPERATOR_TYPE,
    data
});

export const changeNightModeFunc = (data) => ({
    type: ACTIVE_NIGHT_MODE,
    data
})



/********************** Call Login API ***********************/
export const LoginAPIFunction = (username, password) => {
    return new Promise((resolve, reject) => {
        SimpleRequest('login','GET', 'https://jsonplaceholder.typicode.com/posts/1',
            {username, password})
            .then(() => {
                resolve(true)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

/********************** Change Operator Type ***********************/
export const changeOperatorType = (type) => {
    return async (dispatch) => {
        dispatch(changeOperatorFunc(type))
    }
};

/********************** Change Night Mode ***********************/
export const changeNightMode = (data) => {
    return async (dispatch) => {
        dispatch(changeNightModeFunc(data))
    }
}


/*************************************** LogOut user from everyWhere ***********************************/
export const logOutRequest = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
            localStorage.removeItem('state')
        }, 2000)
    })
}


export const ChangeOperator = () => {
    return new Promise (( resolve, reject) => {
        setTimeout(() => {
            resolve (true);
        })
    })
}