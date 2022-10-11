import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {AiOutlineUser, IoIosArrowDown, AiOutlineCalendar} from "react-icons/all";
import Hidden from "@material-ui/core/Hidden";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import PriceFormat from "../../../../PriceFormat";
import ReportService from "../../../../Container/Report/ReportService";
import ReportBank from "../../../../Container/Report/ReportBank";
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputWithIcon from "../../../../Container/InputWithLabel";
import CustomTimePicker from '../../../../Container/TimePicker/CustomTimePicker';
import FormatDate from '../../../../Container/Date/FormatDate';
import {useSnackbar} from 'notistack';
import SubscriberFormValidation from './SubscriberFormValidation';


const MTNSubscriberReport = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [reportList, setReportList] = useState([]);
    const [serviceType, setServiceType] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedFromTime, setSelectedFromTime] = useState('');
    const [selectedToTime, setSelectedToTime] = useState('');
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [selectedToDate, setSelectedToDate] = useState('');
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calendarType, setCalendarType] = useState('');

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoadingData(false)
    }, []);

    /********************* Control Collapse Detail Of List *********************/
    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false);
    };

    const getReportData = () => {
        const variant = 'success';
        setLoadingData(true);
        setTimeout(() => {
            setReportList([
                {
                    id: 0,
                    code: '*10*411#',
                    fromDate: '98/04/12',
                    fromTime: '01:10',
                    price: 5000,
                    service: 'charge',
                    response: '1.یک روزه 2.یکهفته 3.یکماهه 4.سه ماهه 5.شش ماهه 6.یکساله',
                    bank: 'mellat'
                },
                {
                    id: 1,
                    code: '*10*381#',
                    fromDate: '98/04/12',
                    fromTime: '16:32',
                    price: 280000,
                    service: 'package',
                    response: 'شماره دیگری واردکنید 1.خودم',
                    bank: 'saman'
                },
                {
                    id: 2,
                    code: '*100*0#',
                    fromDate: '98/04/12',
                    fromTime: '12:21',
                    price: 10000,
                    service: 'internet',
                    response: '2.بسته آلفا +(سرعت بدون مرز)',
                    bank: 'saderat'
                },
                {
                    id: 3,
                    code: '*100*0#',
                    fromDate: '98/04/12',
                    fromTime: '21:39',
                    price: 20000,
                    service: 'bill',
                    response: 'خریدبسته اینترنت آلفا+ سی روزه 2گیگ + 200 مگ هدیه بعلاوه9%مالیات 1.تایید',
                    bank: 'melli'
                },
                {
                    id: 4,
                    code: '*100*24#',
                    fromDate: '98/04/12',
                    fromTime: '19:12',
                    price: 50000,
                    service: 'package',
                    response: 'بسته 7 روز100MB+100MB، هدیه شب، 2500ت بعلاوه 9% مالیات و عوارض 1.تایید',
                    bank: 'pasargad'
                },
                {
                    id: 5,
                    code: '*1#*5\t',
                    fromDate: '98/04/12',
                    fromTime: '23:25',
                    price: 124000,
                    service: 'charge',
                    response: 'مشترک گرامی نتیجه فعال سازی بسته از طریق پیامک ارسال خواهد شد',
                    bank: 'parsian'
                }
            ]);
            setLoadingData(false);
            enqueueSnackbar(' اطلاعات با موفقیت دریافت شد', {variant});
        }, 2000);

    }
    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        if (calendarType === 'fromDate') {
            setSelectedFromDate(finalDate);
        } else {
            setSelectedToDate(finalDate)
        }
        setCalendarDialog(false);
    }

    const handlechangeInput = (e, type) => {
        switch (type) {
            case 'mobileNumber':
                errors.mobileNumber = '';
                setMobileNumber(e.target.value);
                break;
            case 'serviceType':
                errors.serviceType = '';
                setServiceType(e.target.value);
                break;
        }
    }

    const handleTimeChangeFunc = async (type, e) => {
        let time = e.getHours() + ":" + e.getMinutes();
        if (type === 'fromTime') {
            errors.fromTime = '';
            await setSelectedFromTime(time);
        } else if (type === 'toTime') {
            errors.toTime = '';
            await setSelectedToTime(time);
        }
    }

    const setErrorSnack = (variant) => {
        enqueueSnackbar('لطفا موارد خواسته شده را وارد نمایید', {variant});
    }

    const handleSubmitForm = () => {
        SubscriberFormValidation(mobileNumber, serviceType, selectedFromTime, selectedToTime,
            selectedFromDate, selectedToDate)
            .then(() => getReportData())
            .catch((err) => {
                setErrors(err);
                setErrorSnack('error')
            });
    }

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnSubscriberReportColorSectionTitle}
                                    icon={<AiOutlineUser/>} color='greenGradiantBox'
                                    message={FaStaticTexts.mtnSubscriberReportColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <InputWithIcon
                                title='تلفن همراه' inputType='text'
                                handleChange={(e) => handlechangeInput(e, 'mobileNumber')}
                                errors={errors.mobileNumber} value={mobileNumber}/>
                            <FormControl className='customSelectOptionInRow'>
                                <span className='inputLabel'>{serviceType === '' ? 'انتخاب سرویس' : serviceType}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={serviceType}
                                    onChange={(e) => handlechangeInput(e, 'serviceType')}>
                                    <MenuItem value='شارژ'>شارژ</MenuItem>
                                    <MenuItem value='بسته اینترنت'>بسته اینترنت</MenuItem>
                                    <MenuItem value='قبض'>قبض</MenuItem>
                                </Select>
                                <span className="errorText"> {errors ? errors.serviceType : null} </span>
                            </FormControl>
                        </div>
                        <div className='dashboardSectionInputsInRow'>
                            <CustomTimePicker handleChange={(e) => handleTimeChangeFunc('fromTime', e)}
                                              value={selectedFromTime} label='از ساعت' error={errors.fromTime}/>
                            <CustomTimePicker handleChange={(e) => handleTimeChangeFunc('toTime', e)}
                                              value={selectedToTime} label='تا ساعت' error={errors.toTime}/>

                            <div className='datepickerInputFrame'>
                                <AiOutlineCalendar className='inputIcon'/>
                                <input type='text' placeholder='از تاریخ' className='datepickerInputStyle'
                                       value={selectedFromDate} onClick={() => {
                                    setCalendarDialog(true);
                                    setCalendarType('fromDate');
                                    errors.fromDate = '';
                                }}/>
                                <span className="errorText"> {errors ? errors.fromDate : null} </span>
                            </div>
                            <div className='datepickerInputFrame'>
                                <AiOutlineCalendar className='inputIcon'/>
                                <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                                       value={selectedToDate} onClick={() => {
                                    setCalendarDialog(true);
                                    errors.toDate = '';
                                    setCalendarType('toDate')
                                }}/>
                                <span className="errorText"> {errors ? errors.toDate : null} </span>
                            </div>
                        </div>
                    </div>

                    <Button className='applyFilterRegButton' onClick={(e) => handleSubmitForm(e)}>
                        جستجو
                    </Button>
                </div>
                {
                    reportList.length > 0 ?
                        <Hidden only={['sm', 'xs']}>
                            <div className='tableOfContentHeader'>
                                <ul>
                                    <li style={{width: '10%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderRow}</li>
                                    <li style={{width: '20%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderTime}</li>
                                    <li style={{width: '20%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderDate}</li>
                                    <li style={{width: '25%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderPrice}</li>
                                    <li style={{width: '25%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderCode}</li>
                                </ul>
                            </div>
                        </Hidden> : null
                }
                {
                    reportList.map((item, index) =>
                        <div className='tableOfContentRow' key={index}>
                            <ul>
                                <Accordion
                                    style={{width: '100%'}}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        className='tableOfContentRowHeader'
                                        expandIcon={<IoIosArrowDown
                                            style={{position: 'absolute'}}/>}>
                                        <div className='eachRowOfTableStyle'>
                                            <TableOfContentRowCell width='10%' isRtl={true}
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderRow}
                                                                   text={index + 1}/>
                                            <TableOfContentRowCell width='20%' isRtl={true}
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderTime}
                                                                   text={item.fromTime}/>
                                            <TableOfContentRowCell width='20%' isRtl={true}
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderDate}
                                                                   text={item.fromDate}/>
                                            <TableOfContentRowCell width='25%' isRtl={true}
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderPrice}
                                                                   text={`${PriceFormat(item.price)} تومان `}/>
                                            <TableOfContentRowCell width='25%' isRtl={false}
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderCode}
                                                                   text={item.code}/>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className='tableOfContentDetailFrame'>
                                        <ul className='detailFrame'>
                                            <h6>{FaStaticTexts.mtnReportRowTitleOfHeaderService}: {ReportService(item.service)}</h6>
                                            <h6>{FaStaticTexts.mtnReportRowTitleOfHeaderResponse}: {item.response}</h6>
                                            <span className='inRowFlexItems'>پرداخت از:{ReportBank(item.bank)}</span>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MTNSubscriberReport;
