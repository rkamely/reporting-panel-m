import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../../Dashboard.scss';
import Collapse  from '@material-ui/core/Collapse';
import TitleWithArrowDown from '../../../../../../../Container/TitleDevider/TitleWithArrowDown';
import EachChargeComponent from './EachChargeComponent';
import { BillTypes, InternetTypes, MCIChargeTypes, MTNChargeTypes, RightelChargeTypes } from '../ActionChargeTypes';


const SelectActionChargeType = (props) => {

    const [chargeSelectFrame, setChargeSelectFrame] = useState(false);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     return () => {
    //         console.log("UN mounted")
    //     }
    // }, []);

    // 09392134143
    return (
        <div>
            <TitleWithArrowDown onClick={() => setChargeSelectFrame(!chargeSelectFrame)}
                arrowDirection={chargeSelectFrame} title={(props.type === 'mci' || props.type === 'mtn'
                || props.type === 'rightel'? 'نوع شارژ': props.type === 'internet'?
                 'نوع اینترنت': props.type === 'bill'? 'نوع قبض': null)} />
            <Collapse in={chargeSelectFrame}>
                <div className='customSelectOptionsFrame'>
                    {
                        props.type === 'mci'?
                            MCIChargeTypes.map((item,index) => 
                            <EachChargeComponent item={item} key={index} />
                        ): props.type === 'mtn'?
                            MTNChargeTypes.map((item,index) => 
                            <EachChargeComponent item={item} key={index} />
                        ):props.type === 'rightel'?
                        RightelChargeTypes.map((item,index) => 
                            <EachChargeComponent item={item} key={index} />
                        ):props.type === 'bill'?
                        BillTypes.map((item,index) => 
                            <EachChargeComponent item={item} key={index} />
                        ):props.type === 'internet'?
                        InternetTypes.map((item,index) => 
                            <EachChargeComponent item={item} key={index} />
                        ): null
                    }
                </div>
            </Collapse>
        </div>
    )
}

export default SelectActionChargeType;