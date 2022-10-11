import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import {setCampaignInternetType, setFromTime, setToTime, setFromDateFunc, setToDateFunc} from '../../../../../../Redux/Actions/CampaignActions';
import { AiOutlineCalendar } from "react-icons/all";
import PersianDatePicker from "../../../../../../Container/Dialog/PersianDatePicker";
import FormatDate from '../../../../../../Container/Date/FormatDate';
import CustomTimePicker from '../../../../../../Container/TimePicker/CustomTimePicker';


const SelectTime = () => {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [calendarType, setCalendarType] = useState('');
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [ selectedFromTime, setSelectedFromTime] = useState('');
    const [ selectedToTime, setSelectedToTime] = useState('');
    const [ errors, setErrors ] = useState({});

    const dispatch = useDispatch();


    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        if (calendarType === 'fromDate') {
            setFromDate(finalDate);
            dispatch(setFromDateFunc(finalDate));
        } else {
            setToDate(finalDate);
            dispatch(setToDateFunc(finalDate));
        }
        setCalendarDialog(false);
    }

    const handleChangeInput = (e, type) => {
        switch(type){       
            case 'fromDate':
                errors.fromDate = '';
                setCalendarType(type);
                setCalendarDialog(true);
                break;
            case 'toDate':
                errors.toDate = '';
                setCalendarType(type);
                setCalendarDialog(true);
                break;
        }
    }

    const handleTimeChangeFunc = async (type, e) => {
        let time = e.getHours()+":"+e.getMinutes();
        if (type === 'fromTime'){
            errors.fromTime = '';
            await setSelectedFromTime(time);
            dispatch(setFromTime(time))
        }
        else if (type === 'toTime'){
            errors.toTime = '';
            await setSelectedToTime(time);
            dispatch(setToTime(time))
        }
    }

    return (
        <>
            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                formatDateFunc={(date) => formatDate(date)}/> : null
            }
            <CustomTimePicker handleChange={(e) => handleTimeChangeFunc('fromTime', e)}
                value={selectedFromTime} label='از ساعت' error={errors.fromTime} />
            <CustomTimePicker handleChange={(e) => handleTimeChangeFunc('toTime', e)}
                value={selectedToTime} label='تا ساعت' error={errors.toTime}/>
            <div className='datepickerInputFrame'>
                <AiOutlineCalendar className='inputIcon' />
                <input type='text' placeholder='از تاریخ' className='datepickerInputStyle'
                        value={fromDate} onClick={(e) => handleChangeInput(e, 'fromDate')}
                        onChange={() => {}} />
                <span className="errorText"> {errors ? errors.fromDate : null} </span>
            </div>
            <div className='datepickerInputFrame'>
                <AiOutlineCalendar className='inputIcon' />
                <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                        value={toDate} onClick={(e) => handleChangeInput(e, 'toDate')}
                        onChange={() => {}} />
                <span className="errorText"> {errors ? errors.toDate : null} </span>
            </div>
        </>
    )
}

export default SelectTime;