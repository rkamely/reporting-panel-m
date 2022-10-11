import FaStaticTexts from "../../../../Constants/Fa/FaStatic";


const SubscriberFormValidation = (mobileNumber, serviceType, fromTime, toTime, fromDate, toDate) => {
    return new Promise((resolve, reject) => {
        let errorsObject = {};
        if(mobileNumber === ''){
            errorsObject['mobileNumber'] = FaStaticTexts.missMobileNumberText;
            reject(errorsObject);
        }
        if(serviceType === ''){
            errorsObject['serviceType'] = FaStaticTexts.missServiceTypeText;
            reject(errorsObject);
        }
        if(fromTime === ''){
            errorsObject['fromTime'] = 'زمان را انتخاب نکرده اید';
            reject(errorsObject);
        }
        if(toTime === ''){
            errorsObject['toTime'] = 'زمان را انتخاب نکرده اید';
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

export default SubscriberFormValidation;