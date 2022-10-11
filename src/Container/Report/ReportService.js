
const ReportService = (type) => {

    let serviceType;
    switch (type){
        case 'charge':
            serviceType = 'شارژ';
            break;
        case 'internet':
            serviceType = 'اینترنت';
            break;
        case 'package':
            serviceType = 'بسته';
            break;
        case 'bill':
            serviceType = 'قبض';
            break;
        default:
            return;
    }
    return serviceType;
}

export default ReportService;