import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {AiOutlineCalendar, AiOutlineFileText, IoIosArrowDown} from "react-icons/all";
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
import { useSnackbar } from 'notistack';
import FormatDate from '../../../../Container/Date/FormatDate';
import InputWithIcon from '../../../../Container/InputWithLabel';
import TransactionsValidation from './TransactionsValidation';


const MTNMainTransactionsReport = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [reportList, setReportList] = useState([]);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [justDate, setJustDate] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [durationType, setDurationType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errors, setErrors] = useState({});

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        setLoadingData(false);
    }, []);

    /********************* Control Collapse Detail Of List *********************/
    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false);
    };

    const getReportData = (variant) => {
        setLoadingData(true);
        setTimeout(() => {
            setReportList([
                {
                    id: 0,
                    mobile: '09192579984',
                    fromDate: '98/04/12',
                    toDate: '99/10/22',
                    fromTime: '01:10',
                    toTime: '23:59',
                    price: 5000,
                    service: 'charge',
                    bank: 'mellat'
                },
                {
                    id: 1,
                    mobile: '09125478896',
                    fromDate: '98/04/12',
                    toDate: '99/10/22',
                    fromTime: '01:10',
                    toTime: '23:59',
                    price: 280000,
                    service: 'package',
                    bank: 'saman'
                },
                {
                    id: 2,
                    mobile: '09125410023',
                    fromDate: '98/04/12',
                    toDate: '99/10/22',
                    fromTime: '01:10',
                    toTime: '23:59',
                    price: 10000,
                    service: 'internet',
                    bank: 'saderat'
                },
                {
                    id: 3,
                    mobile: '09364578852',
                    fromDate: '98/04/12',
                    toDate: '99/10/22',
                    fromTime: '01:10',
                    toTime: '23:59',
                    price: 20000,
                    service: 'bill',
                    bank: 'melli'
                },
                {
                    id: 4,
                    mobile: '09126985569',
                    fromDate: '98/04/12',
                    toDate: '99/10/22',
                    fromTime: '01:10',
                    toTime: '23:59',
                    price: 50000,
                    service: 'package',
                    bank: 'pasargad'
                },
                {
                    id: 5,
                    mobile: '09192579984',
                    fromDate: '98/04/12',
                    toDate: '99/10/22',
                    fromTime: '01:10',
                    toTime: '23:59',
                    price: 124000,
                    service: 'charge',
                    bank: 'parsian'
                }
            ]);
            setLoadingData(false);
            enqueueSnackbar('لیست اطلاعات دریافت شد!', { variant });
        }, 2000);

    }
    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        if (calenderType === 'fromDate') {
            setFromDate(finalDate);
        } else if (calenderType === 'justDate') {
            setJustDate(finalDate)
        } else {
            setToDate(finalDate)
        }
        setCalendarDialog(false);
    }

    const handleChangeMobileNumber = (e) => {
        errors.mobileNumber = '';
        setMobileNumber(e.target.value);
    }
    const handleChangeSelect = (e) => {
        errors.serviceType = '';
        setServiceType(e.target.value);
    }
    const handleChangeDuration = (e) => {
        errors.durationType = '';
        setDurationType(e.target.value);
    }

    const handleChangeSelectedMonth = (e) => {
        setSelectedMonth(e.target.value)
    }


    const setErrorSnack = (variant) => {
        enqueueSnackbar('لطفا موارد خواسته شده را وارد نمایید', { variant });
    }
    const handleRequestData = () => {
        TransactionsValidation(mobileNumber, serviceType, durationType, justDate, selectedMonth, fromDate, toDate)
            .then(() => getReportData('success'))
            .catch((err) => { setErrors(err);setErrorSnack('error') })
    }
    
    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnMainTransactionsReportColorSectionTitle}
                                    icon={<AiOutlineFileText/>} color='redGradiantBox'
                                    message={FaStaticTexts.mtnMainTransactionsReportColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <InputWithIcon
                                title='تلفن همراه' inputType='text' handleChange={(e) => handleChangeMobileNumber(e)}
                                errors={errors.mobileNumber} value={mobileNumber} />
                            <FormControl className='customSelectOptionInRow'>
                                        <span
                                            className='inputLabel'>{serviceType === '' ? 'انتخاب سرویس' : serviceType}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={serviceType}
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value='شارژ'>شارژ</MenuItem>
                                    <MenuItem value='بسته اینترنت'>بسته اینترنت</MenuItem>
                                    <MenuItem value='قبض'>قبض</MenuItem>
                                </Select>
                                <span className="errorText"> {errors ? errors.serviceType : null} </span>
                            </FormControl>
                            <FormControl className='customSelectOptionInRow'>
                                        <span
                                            className='inputLabel'>{durationType === '' ? 'بر اساس مدت' : durationType}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={durationType}
                                    onChange={handleChangeDuration}
                                >
                                    <MenuItem value='روزانه'>روزانه</MenuItem>
                                    <MenuItem value='ماهیانه'>ماهیانه</MenuItem>
                                    <MenuItem value='تاریخ'>انتخاب تاریخ</MenuItem>
                                </Select>
                                <span className="errorText"> {errors ? errors.durationType : null} </span>
                            </FormControl>
                            {
                                durationType === 'تاریخ' ?
                                    <>
                                        <div className='datepickerInputFrame'>
                                            <AiOutlineCalendar className='inputIcon' />
                                            <input type='text' placeholder='از تاریخ' className='datepickerInputStyle'
                                                   value={fromDate} onClick={() => { setCalendarDialog(true);
                                                setCalendarType('fromDate'); errors.fromDate = '';
                                            }}/>
                                            <span className="errorText"> {errors ? errors.fromDate : null} </span>
                                        </div>
                                        <div className='datepickerInputFrame'>
                                            <AiOutlineCalendar className='inputIcon' />
                                            <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                                                   value={toDate} onClick={() => {setCalendarType('toDate');
                                                setCalendarDialog(true); errors.toDate = '';
                                                
                                            }}/>
                                            <span className="errorText"> {errors ? errors.toDate : null} </span>
                                        </div>
                                    </> :
                                    durationType === 'روزانه' ?
                                        <div className='datepickerInputFrame'>
                                            <AiOutlineCalendar className='inputIcon' />
                                            <input type='text' placeholder=' تاریخ' className='datepickerInputStyle'
                                                   value={justDate} onClick={() => {
                                                setCalendarDialog(true);
                                                setCalendarType('justDate')
                                            }}/>
                                            <span className="errorText"> {errors ? errors.justDate : null} </span>
                                        </div> :
                                        durationType === 'ماهیانه' ?
                                            <FormControl className='customSelectOptionInRow'>
                                                        <span
                                                            className='inputLabel'>{selectedMonth === '' ? 'انتخاب ماه' : selectedMonth}</span>
                                                <Select
                                                    id="demo-simple-select"
                                                    value={selectedMonth}
                                                    onChange={handleChangeSelectedMonth}
                                                >
                                                    <MenuItem value='فروردین'>فروردین</MenuItem>
                                                    <MenuItem value='اردیبهشت'>اردیبهشت</MenuItem>
                                                    <MenuItem value='خرداد'>خرداد</MenuItem>
                                                    <MenuItem value='تیر'>تیر</MenuItem>
                                                    <MenuItem value='مرداد'>مرداد</MenuItem>
                                                    <MenuItem value='شهریور'>شهریور</MenuItem>
                                                    <MenuItem value='مهر'>مهر</MenuItem>
                                                    <MenuItem value='آبان'>آبان</MenuItem>
                                                    <MenuItem value='آذر'>آذر</MenuItem>
                                                    <MenuItem value='دی'>دی</MenuItem>
                                                    <MenuItem value='بهمن'>بهمن</MenuItem>
                                                    <MenuItem value='اسفند'>اسفند</MenuItem>
                                                </Select>
                                                <span className="errorText"> {errors ? errors.selectedMonth : null} </span>
                                            </FormControl> : null
                            }
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={handleRequestData}>
                        جستجو
                    </Button>
                </div>
                {
                    reportList.length > 0 ?
                        <Hidden only={['sm', 'xs']}>
                            <div className='tableOfContentHeader'>
                                <ul>
                                    <li style={{width: '18%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderTel}</li>
                                    <li style={{width: '30%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderDate}</li>
                                    <li style={{width: '22%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderPrice}</li>
                                    <li style={{width: '30%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderService}</li>
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
                                            <TableOfContentRowCell width='18%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderTel}
                                                                   text={item.mobile}/>
                                            <TableOfContentRowCell width='30%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderDate}
                                                                   text={item.toDate}/>
                                            <TableOfContentRowCell width='22%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderPrice}
                                                                   text={`${PriceFormat(item.price)} تومان `}/>
                                            <TableOfContentRowCell width='30%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderService}
                                                                   text={ReportService(item.service)}/>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className='tableOfContentDetailFrame'>
                                        <ul className='detailFrame'>
                                            <h6>{FaStaticTexts.mtnReportRowTitleOfHeaderTime}: {item.fromTime}</h6>
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

export default MTNMainTransactionsReport;