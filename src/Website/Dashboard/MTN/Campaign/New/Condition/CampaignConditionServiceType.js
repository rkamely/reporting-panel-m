import React, { useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import '../../../../Dashboard.scss';
import CheckItemIcon from './CheckItemIcon';
import { setServiceOfActionCampaign, removeServiceOfActionCampaign, resetActionChargeType } from
    '../../../../../../Redux/Actions/CampaignActions';


const CampaignConditionServiceType = () => {

    const [mci, setMci] = useState(false);
    const [mtn, setMtn] = useState(false);
    const [rightel, setRightel] = useState(false);
    const [internet, setInternet] = useState(false);
    const [mokaleme, setMokaleme] = useState(false);
    const [bill, setBill] = useState(false);

    const state = useSelector(state => state.CampaignReducer);
    const dispatch = useDispatch();

    const checkService = (type) => {
        let servicesArray = state.actionServiceType;
        var result = false;
        if(servicesArray.length > 0){
            result = servicesArray.find(item => item === type);
        }
        return result;
    }
    const handleToggleTransaction = (type) => {
        dispatch(resetActionChargeType());
        switch(type){
            case 'mci':
                setMci(!mci);
                if(checkService('mci')){
                    dispatch(removeServiceOfActionCampaign('mci'))
                }
                else{
                    dispatch(setServiceOfActionCampaign('mci'))
                }
                break;
            case 'mtn':
                setMtn(!mtn);
                if(checkService('mtn')){
                    dispatch(removeServiceOfActionCampaign('mtn'))
                }
                else{
                    dispatch(setServiceOfActionCampaign('mtn'))
                }
                break;
            case 'rightel':
                setRightel(!rightel);
                if(checkService('rightel')){
                    dispatch(removeServiceOfActionCampaign('rightel'))
                }
                else{
                    dispatch(setServiceOfActionCampaign('rightel'))
                }
                break;
            case 'internet':
                setInternet(!internet);
                if(checkService('internet')){
                    dispatch(removeServiceOfActionCampaign('internet'))
                }
                else{
                    dispatch(setServiceOfActionCampaign('internet'))
                }
                break;
            case 'mokaleme':
                setMokaleme(!mokaleme);
                if(checkService('mokaleme')){
                    dispatch(removeServiceOfActionCampaign('mokaleme'))
                }
                else{
                    dispatch(setServiceOfActionCampaign('mokaleme'))
                }
                break;
            case 'bill':
                setBill(!bill);
                if(checkService('bill')){
                    dispatch(removeServiceOfActionCampaign('bill'))
                }
                else{
                    dispatch(setServiceOfActionCampaign('bill'))
                }
                break;
            default:
                return;
        }
    }
    

    return (
        <div className='selectMultipleServicesFrame'>
            <h4>نوع تراکنش: </h4>
            <div className='selectServiceFrame'>
                <div className={mci? 'radioItemStyle': 'unCheckedRadioItemStyle'} 
                    onClick={() => handleToggleTransaction('mci')}>
                        {
                            mci? <CheckItemIcon appear={mci} />:
                            <img src={require('../../../../../../assets/images/mciLogo.png')} 
                                className='selectServicePackIcon' />
                        }
                    شارژ همراه اول
                </div>
                <div className={mtn? 'radioItemStyle': 'unCheckedRadioItemStyle'} 
                    onClick={() => handleToggleTransaction('mtn')}>
                        {
                            mtn? <CheckItemIcon appear={mtn} />:
                            <img src={require('../../../../../../assets/images/mtnLogo.png')} 
                                className='selectServicePackIcon' />
                        }
                    شارژ ایرانسل
                </div>
                <div className={rightel? 'radioItemStyle': 'unCheckedRadioItemStyle'} 
                    onClick={() => handleToggleTransaction('rightel')}>
                        {
                            rightel? <CheckItemIcon appear={rightel} />:
                                <img src={require('../../../../../../assets/images/rightelLogo.png')} 
                                    className='selectServicePackIcon' />
                        }
                    شارژ رایتل
                </div>
                <div className={bill? 'radioItemStyle': 'unCheckedRadioItemStyle'} 
                    onClick={() => handleToggleTransaction('bill')}>
                        {
                            bill? <CheckItemIcon appear={bill} />: 
                            <img src={require('../../../../../../assets/images/ghabz.jpg')} 
                            className='selectServicePackIcon' />
                        }
                    پرداخت قبوض
                </div>
                <div className={mokaleme? 'radioItemStyle': 'unCheckedRadioItemStyle'} 
                    onClick={() => handleToggleTransaction('mokaleme')}>
                        {
                            mokaleme? <CheckItemIcon appear={mokaleme} />:
                                <img src={require('../../../../../../assets/images/hamrahiMokaleme.jpg')} 
                                    className='selectServicePackIcon' />
                        }
                    مکالمه همراهی
                </div>
                <div className={internet? 'radioItemStyle': 'unCheckedRadioItemStyle'} 
                    onClick={() => handleToggleTransaction('internet')}>
                        {
                            internet? <CheckItemIcon appear={internet} />:
                                <img src={require('../../../../../../assets/images/internetPackages.jpg')} 
                                    className='selectServicePackIcon' />
                        }
                    بسته های اینترنت
                </div>
            </div>
        </div>
    )
}

export default CampaignConditionServiceType;