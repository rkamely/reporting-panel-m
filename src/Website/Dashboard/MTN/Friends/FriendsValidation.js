import FaStaticTexts from "../../../../Constants/Fa/FaStatic";

const FriendsValidation = (mobileNumber, requestType, statusType, fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if (mobileNumber === '') {
            errorsObject['mobileNumber'] = FaStaticTexts.missMobileNumberText;
            reject(errorsObject);
        }
        if (requestType === '') {
            errorsObject['requestType'] = FaStaticTexts.missRequestTypeText;
            reject(errorsObject);
        }
        if (statusType === '') {
            errorsObject['statusType'] = FaStaticTexts.missStatusText;
            reject(errorsObject);
        }
        if (fromDate === '') {
            errorsObject['fromDate'] = FaStaticTexts.missDateText;
            reject(errorsObject);
        }
        if (toDate === '') {
            errorsObject['toDate'] = FaStaticTexts.missDateText;
            reject(errorsObject);
        }
        resolve(true);
    })
}

export default FriendsValidation;