

const FormValidation = (fromDate, toDate, fromTime, toTime) => {
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
        if(fromTime === ''){
            errorsObject['fromTime'] = 'ساعت را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(toTime === ''){
            errorsObject['toTime'] = 'ساعت را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        resolve(true);
    })    
}

export default FormValidation;