import React from 'react';
import validator from "validator";
import FaStaticTexts from "../../../Constants/Fa/FaStatic";

const ValidateLoginForm = (username, password) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        /************** Validate username input *****************/
        if (validator.isEmpty(username)) {
            errorsObject["username"] = FaStaticTexts.loginUsernameNotEnteredText;
            reject({errorsObject});

        } else if (!validator.isLength(username, {min: 6, max: undefined})) {
            errorsObject["username"] = FaStaticTexts.loginUsernameNotEnough6CharText;
            reject({errorsObject});
        }
        /************* Validate password input ***********/
        if (validator.isEmpty(password)) {
            errorsObject["password"] = FaStaticTexts.loginPasswordNotEnteredText;
            reject({errorsObject});
        } else if (!validator.isLength(password, {min: 6, max: undefined})) {
            errorsObject["password"] = FaStaticTexts.loginUsernameNotEnough6CharText;
            reject({errorsObject});
        }
        resolve(true);
    })
}

export default ValidateLoginForm;