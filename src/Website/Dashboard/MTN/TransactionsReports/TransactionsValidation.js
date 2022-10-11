import { duration } from "moment-jalaali";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";


const TransactionsValidation = (mobileNumber, serviceType, durationType, justDate, selectedMonth, fromDate, toDate) => {
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
        if(durationType === ''){
            errorsObject['durationType'] = FaStaticTexts.missDurationType;
            reject(errorsObject);
        }
        if( durationType === 'روزانه' && justDate === ''){
            errorsObject['justDate'] = FaStaticTexts.missDateText;
            reject(errorsObject);
        }
        if( durationType === 'ماهیانه' && selectedMonth === ''){
            errorsObject['selectedMonth'] = FaStaticTexts.missDurationType;
            reject(errorsObject);
        }
        if( durationType === 'تاریخ' && fromDate === ''){
            errorsObject['fromDate'] = FaStaticTexts.missSelectTime;
            reject(errorsObject);
        }
        if( durationType === 'تاریخ' && toDate === ''){
            errorsObject['toDate'] = FaStaticTexts.missDateText;
            reject(errorsObject);
        }
        resolve(true);
    })    
}

export default TransactionsValidation;