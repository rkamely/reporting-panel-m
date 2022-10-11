import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FaStaticTexts from "../../../../../Constants/Fa/FaStatic";
import { FiLayers} from "react-icons/all";
import Collapse  from '@material-ui/core/Collapse';
import { Button } from '@material-ui/core';
import '../../../Dashboard.scss';
import DashboardSectionHeader from "../../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import ErrorDialog from "../../../../../Container/Dialog/ErrorDialog";
import {resetCampaign, setCampaignNameFunc} from '../../../../../Redux/Actions/CampaignActions';
import InputWithIcon from "../../../../../Container/InputWithLabel";
import SelectServiceType from './SelectServiceType';
import SelectChargeType from './Charge/SelectChargeType';
import SelectChargeAmount from './Charge/SelectChargeAmount';
import SelectInternetType from './Internet/SelectInternetType';
import SelectChanceType from './Chance/SelectChanceType';
import SelectChanceAmount from './Chance/SelectChanceAmount';
import SelectScoreType from './Score/SelectScoreType';
import ReceiverType from './Receiver/ReceiverType';
import UploadFile from './Receiver/UploadFile';
import SelectTime from './Date&Time/SelectTime';
import SMSTextArea from './SMS/SMSTextArea';
import TitleDevider from '../../../../../Container/TitleDevider/TitleDevider';
import CampaignConditionServiceType from './Condition/CampaignConditionServiceType';
import SelectActionChargeType from './CampaignActions/Charge/SelectActionChargeType';
import SelectActionChargeAmount from './CampaignActions/Charge/SelectActionChargeAmount';



const MTNNewCampaign = () => {

    const campaignState = useSelector(state => state.CampaignReducer);
    const dispatch = useDispatch();

    const [campaignName, setCampaignName] = useState('');
    const [selectedCampaignType, setSelectedCampaignType] = useState('');
    const [errorDialog, setErrorDialog] = useState(false);
    const [ errors, setErrors ] = useState({});
    const [actionReg, setActionReg] = useState(false);
    


    const changeInputFunc = (e) => {
        setCampaignName(e.target.value);
    }
    

    const InitialCampaignReg = () => {
        setActionReg(!actionReg);
        dispatch(setCampaignNameFunc(campaignName));
    }

    
    useEffect(() => {
        window.onbeforeunload = function() {
            dispatch(resetCampaign());
        };
        return () => {
            dispatch(resetCampaign())
        };
    }, []);

    return (
        <div className='mainPageContentFrame'>
            
            { errorDialog?
                <ErrorDialog openDialog={errorDialog} closeDialog={() => setErrorDialog(false)}
                    dialogMessage='نوع کمپین را انتخاب نکرده اید' />: null}
            <DashboardSectionHeader title={FaStaticTexts.mtnNewCampaignSectionTitle} icon={<FiLayers/>}
                                    color='purpleGradiantBox'
                                    message={FaStaticTexts.mtnNewCampaignSectionMessage}/>
            <div className='dashboardFrameColumnDirection'>
                <Collapse in={!actionReg} className='inRowfFlexItemsColumnDirection'>
                    <div className='dashboardSectionInputsInRow'>
                        <InputWithIcon title='نام کمپین' inputType='text' handleChange={(text) => changeInputFunc(text)}
                                    errors={errors.campaignName} />
                    </div>
                    <div className='dashboardSectionInputsInRow'>
                        <SelectServiceType />
                        {
                            campaignState.serviceType !== null?
                                campaignState.serviceType === 'charge'?
                                <SelectChargeType />:
                                campaignState.serviceType === 'internet'?
                                <SelectInternetType />:
                                campaignState.serviceType === 'chance'?
                                <SelectChanceType />:
                                campaignState.serviceType === 'score'?
                                <SelectScoreType />: null: null
                        }
                        {
                            campaignState.serviceType === 'charge' && campaignState.chargeType !== null?
                            <SelectChargeAmount />: null
                        }
                        {
                            campaignState.serviceType === 'chance' && campaignState.chanceType !== null?
                            <SelectChanceAmount />: null
                        }
                        
                    </div>
                    <div className='dashboardSectionInputsInRowNoWrap'>
                        <SelectTime />
                    </div>
                    <div className='dashboardSectionInputsInRowNoWrap'>
                        <ReceiverType />
                        <UploadFile />
                    </div>
                    <div className='dashboardSectionInputsInRowNoWrap'>
                        <SMSTextArea />
                    </div>
                </Collapse>
                {
                    actionReg?
                    <Button className='simpleOrangeButton' onClick={() => setActionReg(false)}>مشخصات کمپین</Button>:
                    <Button className='simpleOrangeButton' onClick={InitialCampaignReg}>شرایط کمپین</Button>
                }
                
                <Collapse in={actionReg} className='inRowfFlexItemsColumnDirection'>
                    <div className='dashboardSectionInputsInRow fullWidth'>
                        <TitleDevider title='تعریف شرایط کمپین' />
                        <CampaignConditionServiceType />                    
                    </div>
                    <div className='dashboardSectionInputsInRow'>
                        {/* Show Charge Selection Area */}
                        <Collapse in={ campaignState.actionServiceType.length === 1 &&
                            !(campaignState.actionServiceType.includes('mokaleme')) }>
                            <div className='dashboardSectionInputsInRow alignStart'>
                                <SelectActionChargeType type={campaignState.actionServiceType.includes('mci')? 'mci': 
                                    campaignState.actionServiceType.includes('mtn')? 'mtn':
                                    campaignState.actionServiceType.includes('rightel')? 'rightel':
                                    campaignState.actionServiceType.includes('bill')? 'bill':
                                    campaignState.actionServiceType.includes('internet')? 'internet':
                                    null} />
                                {
                                    campaignState.actionChargeType.length > 0 &&
                                        (campaignState.actionServiceType.includes('mci') || 
                                            campaignState.actionServiceType.includes('mtn') || 
                                            campaignState.actionServiceType.includes('rightel'))?
                                        <SelectActionChargeAmount />:null
                                }
                            </div>
                        </Collapse>
                    </div>
                </Collapse>
                
            </div>
        </div>
    )
}

export default MTNNewCampaign;