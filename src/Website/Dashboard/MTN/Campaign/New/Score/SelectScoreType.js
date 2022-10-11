import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import InputWithIcon from "../../../../../../Container/InputWithLabel";
import { setCampaignScoreAmount } from '../../../../../../Redux/Actions/CampaignActions'


const SelectScoreType = () => {

    const [errors, setErrors] = useState({});
    
    const dispatch = useDispatch();

    const changeInputFunc = (e) => {
        dispatch(setCampaignScoreAmount(e.target.value));
    }

    return <InputWithIcon title='تعداد امتیاز' inputType='text' handleChange={(text) => changeInputFunc(text)}
    errors={errors.scoreAmount} />
}

export default SelectScoreType;