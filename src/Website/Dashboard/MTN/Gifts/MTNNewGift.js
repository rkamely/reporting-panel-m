import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {AiOutlineGift} from "react-icons/all";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import { useSnackbar } from 'notistack';
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import CustomTimePicker from '../../../../Container/TimePicker/CustomTimePicker';
import { AiOutlineCalendar } from "react-icons/all";
import Button from "@material-ui/core/Button";
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import FormatDate from '../../../../Container/Date/FormatDate';
import FormValidation from './FormValidation';
import { addNewGiftAPI, APIRequest } from '../../../../APIRequest';
import InputWithIcon from '../../../../Container/InputWithLabel';
import ConfirmActionDialog from '../../../../Container/Dialog/ConfirmActionDialog';


const MTNNewGift = () => {

    const [giftList, setGiftList] = useState([]);
    const [ giftName, setGiftName] = useState('');
    const [ cost, setCost] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [calendarType, setCalendarType] = useState('');
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [ selectedFromTime, setSelectedFromTime] = useState('');
    const [ selectedToTime, setSelectedToTime] = useState('');
    const [errors, setErrors] = useState({});
    const [ maxPrizeId, setMaxPrizeId] = useState(null);
    const [confirmAddGiftDialog, setConfirmAddGiftDialog] = useState(false);
    const [ giftLoading, setGiftLoading] = useState(false);


    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        window.scrollTo(0, 0);
        getGiftList();
    }, []);
    
    const successSnack = (variant) => {
        enqueueSnackbar('اطلاعات با موفقیت ثبت شد', { variant });
    }
    const pushValidationError = (variant) => {
        enqueueSnackbar('لطفا موارد خواسته شده را وارد کنید', { variant });
    }
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const handleTimeChangeFunc = async (type, e) => {
        let time = e.getHours()+":"+e.getMinutes();
        if (type === 'fromTime'){
            errors.fromTime = '';
            await setSelectedFromTime(time);
        }
        else if (type === 'toTime'){
            errors.toTime = '';
            await setSelectedToTime(time);
        }
    }

    const setNewGiftAPI = async() => {
        setGiftLoading(true);
        await addNewGiftAPI('SET_NEW_GIFT', 'POST', 'MtnReport/newprize', giftName, maxPrizeId+1, 
            cost, fromDate, toDate, selectedFromTime, selectedToTime)
        .then(() => {
            setGiftName('');
            setCost('');
            setFromDate('');
            setToDate('');
            setSelectedFromTime('');
            setSelectedToTime('');
            setErrors({});
            setGiftLoading(false);
            successSnack('success');
            setConfirmAddGiftDialog(false);
        })
        .catch((err) => {
            setConfirmAddGiftDialog(false);
            pushErrorSnack('error')})
    }

    const getGiftList = () => {
        APIRequest('GET_ALL_GIFT', 'POST', 'MtnReport/prize', '', '', 2)
        .then((res) => {
            setGiftList(res.data);
            const giftMaximumID = res.data.reduce((prev, current) =>
                 (prev.prizeid > current.prizeid)? prev: current)
            setMaxPrizeId(giftMaximumID.prizeid);
        
        })
        .catch(() => {
            pushErrorSnack('error');
            setGiftList([]);
        })
    }


    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        if (calendarType === 'fromDate') {
            setFromDate(finalDate);
        } else {
            setToDate(finalDate)
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
    

    const handleSubmitForm = () => {
        FormValidation(giftName, cost, fromDate, toDate)
            .then(() => setConfirmAddGiftDialog(true))
            .catch((err) => {
                pushValidationError('error');
                setErrors(err)
            })
    }


    return (
        <div className='mainPageContentFrame'>

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                formatDateFunc={(date) => formatDate(date)}/> : null
            }
            {
                confirmAddGiftDialog?
                    <ConfirmActionDialog dialogTitle='ثبت جایزه' closeDialog={() => setConfirmAddGiftDialog(false)}
                        dialogMessage='در صورت تایید، آیتم تعریف شده به لیست جوایز اضافه خواهد شد.
                                        جوایز تعریف شده قابل حذف نمی باشد. اضافه می کنید؟'   
                        approveAction={() => setNewGiftAPI()} actionPending={giftLoading}
                    />:null
            }
            <div className="commingSoonWallpaper">
                <h5 className='title'>در حال بروزرسانی</h5>
            </div>   
            <DashboardSectionHeader title={FaStaticTexts.giftDefineColorSectionTitle} icon={<AiOutlineGift />}
                 color='redGradiantBox' message={FaStaticTexts.giftDefineColorSectionMessage} />
            
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <div className='dashboardSectionInputsInRowNoWrap inRowFlexItemsFlexStart lowMarginFromTD'>
                                <InputWithIcon title='نام جایزه' inputType='text' errors={errors.giftName}
                                    handleChange={(e) => setGiftName(e.target.value)} value={giftName} maxLength={30} />
                                <InputWithIcon title='تعداد امتیاز' inputType='text' errors={errors.giftScore}
                                    handleChange={(e) => setCost(e.target.value)} value={cost} />
            
                            </div>
                            <div className='dashboardSectionInputsInRowNoWrap inRowFlexItemsFlexStart lowMarginFromTD'>
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
                            </div>
                        
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        ثبت
                    </Button>
                    
                </div>
            
            </div>
        </div>
    )
}


export default connect()(MTNNewGift);
