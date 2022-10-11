import React, { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../../../../../../Dashboard/Dashboard.scss';
import '../../../../../Dashboard.scss';
import Collapse  from '@material-ui/core/Collapse';
import TitleWithArrowDown from '../../../../../../../Container/TitleDevider/TitleWithArrowDown';
import { setCampaignChargeAmount } from '../../../../../../../Redux/Actions/CampaignActions';
import {MCIDirectChargeTypes, MCIExcludeChargeTypes, MCILoyalChargeTypes,
     MTNAmazingChargeTypes, MCIYoungsChargeTypes} from '../ActionChargeTypes';
import EachChargeAmountComponent from './EachChargeAmountComponent';



const SelectActionChargeAmount = () => {

    const [chargeAmount, setChargeAmount] = useState('');
    const [chargeSelectFrame, setChargeSelectFrame] = useState(false);

    const state = useSelector(state => state.CampaignReducer);
    const dispatch = useDispatch();
    const selectedChargesArray = [];
    
    const handleChangeChargeAmount = (e) => {
        setChargeAmount(e.target.value);
        dispatch(setCampaignChargeAmount(e.target.value));
    }

    useEffect(() => {
        checkChargeAmount();
    }, [state.actionChargeType]);

    const checkChargeAmount = () => {
        // console.log(state.actionChargeType)
    }

    if(state.actionChargeType.length > 0){

        if(state.actionChargeType.some(item => item === 'direct')){
            selectedChargesArray.push(...MCIDirectChargeTypes);
        }
        else{
            selectedChargesArray.filter(item => item.type === 'directCharge');
        }
        if(state.actionChargeType.some(item => item === 'exclude')){
            selectedChargesArray.push(...MCIExcludeChargeTypes);
        }
        else{
            selectedChargesArray.filter(item => item.type === 'excludeCharge');
        }
        if(state.actionChargeType.some(item => item === 'youngs')){
            selectedChargesArray.push(...MCIYoungsChargeTypes);
        }
        else{
            selectedChargesArray.filter(item => item.type === 'youngsCharge')
        }
        if(state.actionChargeType.some(item => item === 'women')){
            selectedChargesArray.push(...MCIYoungsChargeTypes);
        }
        else{
            selectedChargesArray.filter(item => item.type === 'womenCharge')
        }
        if(state.actionChargeType.some(item => item === 'loyal')){
            selectedChargesArray.push(...MCILoyalChargeTypes);
        }
        else{
            selectedChargesArray.filter(item => item.type === 'loyalCharge')
        }

        if(state.actionChargeType.some(item => item === 'amazing')){
            selectedChargesArray.push(...MTNAmazingChargeTypes);
        }
        else{
            selectedChargesArray.filter(item => item.type === 'loyalCharge')
        }
        
    }

    return (
        <div className='customSelectOptionMainFrame'>
            <TitleWithArrowDown onClick={() => setChargeSelectFrame(!chargeSelectFrame)}
                arrowDirection={chargeSelectFrame} title='مبلغ شارژ' />
            <Collapse in={chargeSelectFrame}>
                <div className='customSelectOptionsFrameWithScroll'>
                    {
                        selectedChargesArray.length > 0?
                            selectedChargesArray.map((item, index) => 
                            <EachChargeAmountComponent item={item} key={index} />
                        ): null
                    }
                </div>
            </Collapse>
        </div>
    )
}

export default SelectActionChargeAmount;