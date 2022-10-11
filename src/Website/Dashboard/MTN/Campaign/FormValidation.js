

const FormValidation = (status) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(status === ''){
            errorsObject['campaignStatus'] = 'وضعیت کمپین را انتخاب نکرده اید';
            reject(errorsObject);
        }
    
        // if( fromDate === ''){
        //     errorsObject['fromDate'] = 'تاریخ را انتخاب نکرده اید';
        //     reject(errorsObject);
        // }
        // if(toDate === ''){
        //     errorsObject['toDate'] = 'تاریخ را انتخاب نکرده اید';
        //     reject(errorsObject);
        // }
        resolve(true);
    })    
}

export default FormValidation;