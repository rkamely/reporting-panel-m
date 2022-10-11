import React from 'react';

const ReportBank = (type) => {

    let bankType;
    let bankLogo;

    switch (type){
        case 'mellat':
            bankType = 'ملت';
            bankLogo = <img src={require('../../assets/images/banks/mellat.jpg')} alt='بانک ملت' />
            break;
        case 'melli':
            bankType = 'ملی';
            bankLogo = <img src={require('../../assets/images/banks/melli.jpg')} alt='بانک ملی' />
            break;
        case 'keshavarzi':
            bankType = 'کشاورزی';
            bankLogo = <img src={require('../../assets/images/banks/keshavarzi.jpg')} alt='بانک ملی' />
            break;
        case 'saderat':
            bankType = 'صادرات';
            bankLogo = <img src={require('../../assets/images/banks/saderat.jpg')} alt='بانک ملی' />
            break;
        case 'parsian':
            bankType = 'پارسیان';
            bankLogo = <img src={require('../../assets/images/banks/parsian.jpg')} alt='بانک ملی' />
            break;
        case 'sepah':
            bankType = 'سپه';
            bankLogo = <img src={require('../../assets/images/banks/sepah.jpg')} alt='بانک ملی' />
            break;
        case 'pasargad':
            bankType = 'پاسارگاد';
            bankLogo = <img src={require('../../assets/images/banks/pasargad.jpg')} alt='بانک ملی' />
            break;
        case 'ayande':
            bankType = 'آینده';
            bankLogo = <img src={require('../../assets/images/banks/ayande.jpg')} alt='بانک ملی' />
            break;
        case 'maskan':
            bankType = 'مسکن';
            bankLogo = <img src={require('../../assets/images/banks/maskan.jpg')} alt='بانک ملی' />
            break;
        case 'novin':
            bankType = 'اقتصاد نوین';
            bankLogo = <img src={require('../../assets/images/banks/ayande.jpg')} alt='بانک ملی' />
            break;
        case 'shahr':
            bankType = 'شهر';
            bankLogo = <img src={require('../../assets/images/banks/shahr.jpg')} alt='بانک ملی' />
            break;
        case 'mehr':
            bankType = 'مهر ایران';
            bankLogo = <img src={require('../../assets/images/banks/mehr.jpg')} alt='بانک ملی' />
            break;
        case 'sina':
            bankType = 'سینا';
            bankLogo = <img src={require('../../assets/images/banks/sina.jpg')} alt='بانک ملی' />
            break;
        default:
            bankType = 'ناشناخته';
            bankLogo = 'ناشناخته'
    }
    return(
        <>
            <span className='bankLogoSmallFrame'>{bankLogo}</span>
        </>
    );
}

export default ReportBank;