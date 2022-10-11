import React, { useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetPersianText from '../../../../../Modules/GetPersianText';
import { setCampaignChargeAmount } from '../../../../../../Redux/Actions/CampaignActions'
import PriceFormat from '../../../../../../PriceFormat';



const SelectChargeAmount = () => {

    const [chargeAmount, setChargeAmount] = useState('');
    const dispatch = useDispatch();


    const handleChangeChargeAmount = (e) => {
        setChargeAmount(e.target.value);
        dispatch(setCampaignChargeAmount(e.target.value));
    }

    return (
        <FormControl className='customSelectOptionInRow'>
            <span className='inputLabel'>{chargeAmount === ''? 'انتخاب شارژ':
                GetPersianText(chargeAmount)}</span>
            <Select
                value={chargeAmount}
                onChange={handleChangeChargeAmount} >
                <MenuItem value='10000'>{PriceFormat(10000)} ریال</MenuItem>
                <MenuItem value='20000'>{PriceFormat(20000)} ریال</MenuItem>
                <MenuItem value='50000'>{PriceFormat(50000)} ریال</MenuItem>
                <MenuItem value='100000'>{PriceFormat(100000)} ریال</MenuItem>
                <MenuItem value='200000'>{PriceFormat(200000)} ریال</MenuItem>
                <MenuItem value='500000'>{PriceFormat(500000)} ریال</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectChargeAmount;