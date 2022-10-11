import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeActionChargeAmount, setActionChargeAmount } from '../../../../../../../Redux/Actions/CampaignActions';
import CheckItemIcon from '../../../../../../../Container/CheckItemIcon/CheckItemIcon';
import Grow from "@material-ui/core/Grow";
import PriceFormat from '../../../../../../../PriceFormat';



const EachChargeAmountComponent = (props) => {
    
    const campaignState = useSelector(state => state.CampaignReducer);
    const dispatch = useDispatch();


    useEffect(() => {
    },[campaignState]);


    const checkChargeAmount = (type) => {
        
        let amountArray = campaignState.actionChargePrice;
        var result = false;
        if(amountArray.length > 0){
            result = amountArray.find(item => item === type);
        }
        return result;
    }
    const handleClickChargeItem = (type) => {
        if(checkChargeAmount(type)){
            dispatch(removeActionChargeAmount(type))
        }
        else{
            dispatch(setActionChargeAmount(type))
        }
    }

    return(
        <div className='selectChargeTypeStyle' 
            onClick={() => handleClickChargeItem(props.item.value)}>
                {
                    checkChargeAmount(props.item.value)?
                        <CheckItemIcon appear={checkChargeAmount(props.item.value)} />:
                        <Grow in={true}>
                            
                            {
                                campaignState.actionServiceType.includes('mci')?
                                    <img src={require('../../../../../../../assets/images/mciLogo.png')}
                                        className='icon' />:
                                        campaignState.actionServiceType.includes('mtn')?
                                    <img src={require('../../../../../../../assets/images/mtnLogo.png')} 
                                        className='icon'/>:
                                        campaignState.actionServiceType.includes('rightel')?
                                    <img src={require('../../../../../../../assets/images/rightelLogo.png')}
                                        className='icon' />: null
                            }
                        </Grow>
                }
            <label>{PriceFormat(props.item.title)}</label>
        </div>
    )
}

export default EachChargeAmountComponent;