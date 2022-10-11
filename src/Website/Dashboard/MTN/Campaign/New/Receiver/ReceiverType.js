import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { setCampaignReceiverType } from '../../../../../../Redux/Actions/CampaignActions'


const ReceiverType = () => {

    const [receiver, setReceiver] = useState('');
    const dispatch = useDispatch();

    const handleChangeChanceType = (e) => {
        setReceiver(e.target.value);
        dispatch(setCampaignReceiverType(e.target.value));
    }

    return (
        <FormControl className='customSelectOptionInRow'>
            <span className='inputLabel'>{receiver === ''? 'دریافت کننده را انتخاب کنید':
                receiver === 0? 'گیرنده سرویس': receiver === 1? 'تراکنش کننده': null}</span>
            <Select
                value={receiver}
                onChange={handleChangeChanceType}>
                    <MenuItem value={100} disabled={true}>دریافت کننده را انتخاب کنید</MenuItem>
                    <MenuItem value={0}>گیرنده سرویس</MenuItem>
                    <MenuItem value={1}>تراکنش کننده</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ReceiverType;