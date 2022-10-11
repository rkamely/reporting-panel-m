import axios from "axios";
import BaseURL from "./BaseURL";
var jwtDecode = require('jwt-decode');

var baseURL = BaseURL();


export const setAuthorizeStorage = (token) => {
    try{
        localStorage.setItem('token', token);

    } catch (err) {
        return undefined;
    }
};


export const getTokenFromLocalStorage = async() => {

    let getTokenPromise = new Promise(async (resolve, reject) => {
        try {
            let token = localStorage.getItem('token');

            setTimeout(() => { resolve(token) }, 2000);
        }
        catch (e) {
            reject(e)
        }
    });

    return getTokenPromise;

};


export const logOutFromServerRequest = async () => {
    let logoutResponse = false;

    const tokenValue = await getTokenFromLocalStorage();

    await axios({
        method: 'post',
        url: `${baseURL}/api/v1/customer/account/signout`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tokenValue.token
        }
    })
        .then((response) => {
            if (response.data.result.code === 200) {
                logoutResponse = true
            }
        })
        .catch((err) => {
            console.log(err);
            logoutResponse = true
        });

    return logoutResponse;

};
