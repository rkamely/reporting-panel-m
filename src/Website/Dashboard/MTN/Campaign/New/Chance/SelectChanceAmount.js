import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import InputWithIcon from "../../../../../../Container/InputWithLabel";
import { setCampaignChanceAmount } from '../../../../../../Redux/Actions/CampaignActions'


const SelectChanceAmount = () => {

    const [chanceAmount, setChanceAmount] = useState('');
    const [errors, setErrors] = useState({});
    
    const dispatch = useDispatch();

    const changeInputFunc = (e) => {
        setChanceAmount(e.target.value);
        dispatch(setCampaignChanceAmount(e.target.value));
    }

    return <InputWithIcon title='تعداد شانس' inputType='text' handleChange={(text) => changeInputFunc(text)}
    errors={errors.scoreAmount} />
}

export default SelectChanceAmount;