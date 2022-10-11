import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetPersianText from '../../../../../Modules/GetPersianText';
import { setCampaignChargeType } from '../../../../../../Redux/Actions/CampaignActions'


const SelectChargeType = () => {

    const [chargeType, setChargeType] = useState('');
    const dispatch = useDispatch();

    const handleChangeChargeType = (e) => {
        setChargeType(e.target.value);
        dispatch(setCampaignChargeType(e.target.value));
    }

    return (
        <FormControl className='customSelectOptionInRow'>
            <span className='inputLabel'>{chargeType === ''? 'نوع  شارژ':
                GetPersianText(chargeType)}</span>
            <Select
                value={chargeType}
                onChange={handleChangeChargeType} >
                <MenuItem value='directCharge'>شارژ مستقیم</MenuItem>
                <MenuItem value='exclusiveCharge'>شارژ فوق العاده</MenuItem>
                <MenuItem value='youngCharge'>شارژ جوانان</MenuItem>
                <MenuItem value='womenCharge'>شارژ بانوان</MenuItem>
                <MenuItem value='loyalCharge'>شارژ وفاداری</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectChargeType;