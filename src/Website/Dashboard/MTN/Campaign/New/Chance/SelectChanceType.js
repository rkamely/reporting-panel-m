import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetPersianText from '../../../../../Modules/GetPersianText';
import { setCampaignChanceType } from '../../../../../../Redux/Actions/CampaignActions'


const SelectChanceType = () => {

    const [chanceType, setChanceType] = useState('');
    const dispatch = useDispatch();

    const handleChangeChanceType = (e) => {
        setChanceType(e.target.value);
        dispatch(setCampaignChanceType(e.target.value));
    }

    return (
        <FormControl className='customSelectOptionInRow'>
            <span className='inputLabel'>{chanceType === ''? 'قرعه کشی را انتحاب کنید':
                GetPersianText(chanceType)}</span>
            <Select
                value={chanceType}
                onChange={handleChangeChanceType} >
                    <MenuItem value='206'>قرعه کشی 206</MenuItem>
                    <MenuItem value='robesekke'>3 عدد ربع سکه</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectChanceType;