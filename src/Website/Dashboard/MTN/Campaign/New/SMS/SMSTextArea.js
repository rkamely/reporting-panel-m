import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import {TextareaAutosize} from '@material-ui/core';
import { setSMSTextFunc } from '../../../../../../Redux/Actions/CampaignActions'


const SMSTextArea = () => {

    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleChangeSMSText = (e) => {
        setText(e.target.value);
        dispatch(setSMSTextFunc(e.target.value));
    }

    return (
        <TextareaAutosize placeholder="متن پیامک ارسالی" className="sendSMSTextArea" 
            onChange={handleChangeSMSText}
        />
    )
}

export default SMSTextArea;