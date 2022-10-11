

const FormValidation = (serviceType, durationType, justDate, selectedMonth, fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(serviceType === ''){
            errorsObject['serviceType'] = 'سرویس را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(durationType === ''){
            errorsObject['durationType'] = 'مدت زمان را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(durationType === 'روزانه' && justDate === '' ){
            errorsObject['justDate'] = 'تاریخ را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(durationType === 'ماهیانه' && selectedMonth === '') {
            errorsObject['selectedMonth'] = 'ماه را وارد نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(durationType === 'تاریخ' && fromDate === ''){
            errorsObject['fromDate'] = 'تاریخ را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        if(durationType === 'تاریخ' && toDate === ''){
            errorsObject['toDate'] = 'تاریخ را انتخاب نکرده اید';
            // setErrors(errorsObject);
            reject(errorsObject);
        }
        resolve(true);
    })    
}

export default FormValidation;