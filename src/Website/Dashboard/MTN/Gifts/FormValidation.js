

const FormValidation = (giftName, score, fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(giftName === ''){
            errorsObject['giftName'] = 'نام جایزه را انتخاب نکرده اید';
            reject(errorsObject);
        }
        if(score === ''){
            errorsObject['giftScore'] = 'مقدار امتیاز را انتخاب نکرده اید';
            reject(errorsObject);
        }

        if( fromDate === ''){
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