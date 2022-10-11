

const FormValidation = (mobileNumber, fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(mobileNumber === ''){
            errorsObject['mobileNumber'] = 'شماره تلفن را انتخاب نکرده اید';
            reject(errorsObject);
        }

        if(fromDate === ''){
            errorsObject['fromDate'] = 'تاریخ را انتخاب نکرده اید';
            reject(errorsObject);
        }
        if(toDate === ''){
            errorsObject['toDate'] = 'تاریخ را انتخاب نکرده اید';
            reject(errorsObject);
        }
    
        resolve(true);
    })    
}

export default FormValidation;