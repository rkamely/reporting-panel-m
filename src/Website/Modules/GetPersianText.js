
const GetPersianText = (type) => {

    let result;

    switch (type) {
        
        /******************** Service types static text ******************/
        case 'charge':
            result = 'شارژ';
            break;
        case 'internet':
            result = 'اینترنت';
            break;
        case 'score':
            result = 'امتیاز';
            break;
        case 'chance':
            result = 'شانس';
            break;

        /******************** Charge types static text ******************/
        case 'directCharge':
            result = 'شارژ مستقیم';
            break;
        case 'exclusiveCharge':
            result = 'شارژ فوق العاده';
            break;
        case 'youngCharge':
            result = 'شارژ جوانان';
            break;
        case 'womenCharge':
            result = 'شارژ بانوان';
            break;
        case 'loyalCharge':
            result = 'شارژ وفاداری';
            break;
        case 'anything':
            result = 'شارژ دلخواه';
            break;

        /******************** Charge Amount static text ******************/
        case '10000':
            result = 'شارژ 10000 ریالی';
            break;
        case '20000':
            result = 'شارژ 20000 ریالی';
            break;
        case '50000':
            result = 'شارژ 50000 ریالی';
            break;
        case '100000':
            result = 'شارژ 100000 ریالی';
            break;
        case '200000':
            result = 'شارژ 200000 ریالی';
            break;
        case '500000':
            result = 'شارژ 500000 ریالی';
            break;

        /******************** Internet types static text ******************/
        case '1gig1day':
            result = 'بسته هدیه 1 گیگابایت  1 روزه ویژه ستاره اول';
            break;
        case '2gig1day':
            result = 'بسته هدیه 2 گیگابایت  1 روزه ویژه ستاره اول';
            break;
        case '3gig1day':
            result = 'بسته هدیه 3 گیگابایت  1 روزه ویژه ستاره اول';
            break;
        case '1500meg7day':
            result = 'بسته هدیه 1.5 گیگابایت  7 روزه ویژه ستاره اول';
            break;
        case '750meg7day':
            result = 'بسته هدیه 750 مگابایت  7 روزه ویژه ستاره اول';
            break;
        case '500meg1day':
            result = 'بسته هدیه 500 مگابایت  1 روزه ویژه ستاره اول';
            break;

        /******************** Chance types static text ******************/
        case '206':
            result = 'قرعه کشی 206';
            break;
        case 'robesekke':
            result = '3 عدد ربع سکه';
            break;
    
        default:
            result = 'مشخص نشده است'
            
    }

    return result;
}

export default GetPersianText;