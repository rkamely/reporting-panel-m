
const GetPurchaseType = (type) => {

    let result;

    switch (type) {
        case 1:
            result = 'شارژ عادی';
            break;
        case 2:
            result = 'شارژ شگفت انگیز';
            break;
        case 3:
            result = 'شارژ مستقیم';
            break;
        case 4:
            result = 'شارژ فوق العاده';
            break;
        case 5:
            result = 'شارژ دلخواه';
            break;
        case 11:
            result = 'اینترنت ایرانسل';
            break;
        case 12:
            result = 'اینترنت همراه اول';
            break;
        case 17:
            result = 'قبض ایرانسل';
            break;
        case 21:
            result = 'قبض خدماتی';
            break;
        case 101:
            result = 'کمپین 1000';
            break;
        case 8877:
            result = 'همدلی';
            break;
        case 4411:
            result = 'استقلال';
            break;
        case 6611:
            result = 'پرسپولیس';
            break;
        case 1710:
            result = 'کمیته امداد';
            break;
        case 1721:
            result = 'کمک های مردمی کهریزک';
            break;
        case 1730:
            result = 'محک';
            break;
        case 1750:
            result = 'محبین امیرالمومنین';
            break;
        case 1741:
            result = 'بهزیستی خ رضوی';
            break;
        case 17001:
            result = 'بچه های آسمان';
            break;
        case 17002:
            result = 'بنیاد کودک';
            break;
        case 17003:
            result = 'سازمان زندان ها';
            break;
        case 17004:
            result = 'انصارالانصار';
            break;
        case 17005:
            result = 'عتبات عالیات';
            break;
        case 17006:
            result = 'مسجد شهدا';
            break;
        case 17007:
            result = 'گروه نورالرضا';
            break;
        case 17008:
            result = 'موکب فرهنگی فجر';
            break;
        case 17009:
            result = 'بانوی آسمان';
            break;
        case 17221:
            result = 'فطریه عام کهریزک';
            break;
        case 17222:
            result = 'فطریه سادات کهریزک';
            break;
        case 17223:
            result = 'کفاره کهریزک';
            break;
        case 17421:
            result = 'فطریه عام بهزیستی';
            break;
        case 17422:
            result = 'فطریه سادات بهزیستی';
            break;
        case 17423:
            result = 'کفاره بهزیستی';
            break;

        default:
            result = 'مشخص نشده است'
            
    }

    return result;
}

export default GetPurchaseType;