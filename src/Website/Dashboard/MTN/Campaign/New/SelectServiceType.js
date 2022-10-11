import React, { useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import '../../../Dashboard.scss';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import GetPersianText from '../../../../Modules/GetPersianText';
import { setCampaignServiceType, resetCampaign } from '../../../../../Redux/Actions/CampaignActions';



const SelectServiceType = () => {

    const [serviceType, setServicetype] = useState('');
    const dispatch = useDispatch();


    const handleChangeServiceType = (e) => {
        dispatch(resetCampaign());
        setServicetype(e.target.value);
        dispatch(setCampaignServiceType(e.target.value));
    }
    
    useEffect(() => {
        return () => {
            dispatch(setCampaignServiceType(null))
        };
      }, []);

    return (
        <FormControl className='customSelectOptionInRow'>
            <span className='inputLabel'>{serviceType === ''? 'نوع سرویس':
                GetPersianText(serviceType)}</span>
            <Select value={serviceType} onChange={handleChangeServiceType} >
                <MenuItem value='service' disabled>نوع سرویس</MenuItem>
                <MenuItem value='charge'>شارژ</MenuItem>
                <MenuItem value='internet'>اینترنت</MenuItem>
                <MenuItem value='chance'>شانس</MenuItem>
                <MenuItem value='score'>امتیاز</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectServiceType;