

const FormValidation = (fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
    
        if(fromDate === ''){
            errorsObject['fromDate'] = 'تاریخ را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(toDate === ''){
            errorsObject['toDate'] = 'تاریخ را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        resolve(true);
    })    
}

export default FormValidation;