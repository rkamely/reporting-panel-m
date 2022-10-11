import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActionChargeType, removeActionChargeType } from '../../../../../../../Redux/Actions/CampaignActions';
import CheckItemIcon from '../../../../../../../Container/CheckItemIcon/CheckItemIcon';
import Grow from "@material-ui/core/Grow";
import PriceFormat from '../../../../../../../PriceFormat';



const EachChargeComponent = (props) => {
    
    const state = useSelector(state => state.CampaignReducer);
    const dispatch = useDispatch();
    useEffect(() => {
    },[state.CampaignReducer]);


    const checkChargeType = (type) => {
        
        let chargeArray = state.actionChargeType;
        var result = false;
        if(chargeArray.length > 0){
            result = chargeArray.some(item => item === type);
        }
        return result;
    }
    const handleClickChargeItem = (type) => {

        if(checkChargeType(type)){
            dispatch(removeActionChargeType(type))
        }
        else{
            dispatch(setActionChargeType(type))
        }
    }

    return(
        <div className='selectChargeTypeStyle' 
            onClick={() => handleClickChargeItem(props.item.value)}>
                {
                    checkChargeType(props.item.value)?
                        <CheckItemIcon appear={checkChargeType(props.item.value)} />:
                        <Grow in={true}>
                            {
                                state.actionServiceType.includes('mci')?
                                <img src={require('../../../../../../../assets/images/mciLogo.png')}
                                     className='icon' />:
                                    state.actionServiceType.includes('mtn')?
                                        <img src={require('../../../../../../../assets/images/mtnLogo.png')} 
                                        className='icon' />:
                                    state.actionServiceType.includes('rightel')?
                                        <img src={require('../../../../../../../assets/images/rightelLogo.png')} 
                                        className='icon' />:
                                    state.actionServiceType.includes('bill')?
                                        <img src={require('../../../../../../../assets/images/ghabz.jpg')} 
                                        className='icon' />:
                                    state.actionServiceType.includes('internet')?
                                        <img src={require('../../../../../../../assets/images/internetPackages.jpg')} 
                                        className='icon' />:null
                            }
                        </Grow>
                }
            <label>{PriceFormat(props.item.title)}</label>
        </div>
    )
}

export default EachChargeComponent;