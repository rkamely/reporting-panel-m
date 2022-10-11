import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetPersianText from '../../../../../Modules/GetPersianText';
import { setCampaignInternetType } from '../../../../../../Redux/Actions/CampaignActions'


const SelectInternetType = () => {

    const [internetType, setInternetType] = useState('');
    const dispatch = useDispatch();

    const handleChangeServiceType = (e) => {
        setInternetType(e.target.value);
        dispatch(setCampaignInternetType(e.target.value));
    }

    return (
        <FormControl className='customSelectOptionInRow'>
            <span className='inputLabel'>{internetType === ''? 'نوع  اینترنت را انتخاب کنید':
                GetPersianText(internetType)}</span>
            <Select
                value={internetType}
                onChange={handleChangeServiceType} >
                <MenuItem value='1gig1day'>بسته هدیه 1 گیگابایت  1 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='2gig1day'>بسته هدیه 2 گیگابایت  1 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='3gig1day'>بسته هدیه 3 گیگابایت  1 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='1500meg7day'>بسته هدیه 1.5 گیگابایت  7 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='750meg7day'>بسته هدیه 750 مگابایت  7 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='500meg1day'>بسته هدیه 500 مگابایت  1 روزه ویژه ستاره اول</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectInternetType;