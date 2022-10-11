

const FormValidation = (maxChance, dayliMaxChance, fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(maxChance === ''){
            errorsObject['maxChance'] = 'حداکثر شانس';
            reject(errorsObject);
        }
        if(dayliMaxChance === ''){
            errorsObject['dayliMaxChance'] = 'حداکثر شانس روزانه';
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