

const FormValidation = (price, scoreValue, fromDate, toDate, serviceType) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(price === ''){
            errorsObject['priceValue'] = 'مبلغ را وارد نکرده اید';
            reject(errorsObject);
        }
        if(scoreValue === ''){
            errorsObject['scoreValue'] = 'میزان امتیاز را وارد نکرده اید';
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
        if(serviceType === ''){
            errorsObject['serviceType'] = 'نوع سرویس را انتخاب نکرده اید';
            reject(errorsObject);
        }
        resolve(true);
    })    
}

export default FormValidation;