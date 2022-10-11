import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {AiOutlineLineChart, IoIosArrowDown, AiOutlineCalendar} from "react-icons/all";
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
import InputWithIcon from '../../../../Container/InputWithLabel';
import { useSnackbar } from 'notistack';
import FormatDate from '../../../../Container/Date/FormatDate';
import FaStatic from '../../../../Constants/Fa/FaStatic';
import FormValidation from './FormValidation';



const MTNMultiplication = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [reportList, setReportList] = useState([]);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [scoreValue, setScoreValue] = useState('');
    const [errors, setErrors] = useState({});

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        window.scrollTo(0, 0);
        setLoadingData(false)
    }, []);

    /********************* Control Collapse Detail Of List *********************/
    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false);
    };

    const getReportData = (variant) => {
        setLoadingData(true);
        setTimeout(() => {
            setReportList([]);
            setLoadingData(false);
            enqueueSnackbar(FaStaticTexts.snackSuccessReceiveListText , { variant });
        }, 2000);
        
    }
    
    const handleChangeInput = (e, type) => {
        switch(type){
            case 'price':
                errors.priceValue = '';
                setPriceValue(e.target.value);
                break;
            case 'scoreValue':
                errors.scoreValue = '';
                setScoreValue(e.target.value);
                break;  
            case 'serviceType':
                errors.serviceType = '';
                setServiceType(e.target.value);
                break;      
            case 'fromDate':
                setCalendarType('fromDate');
                errors.fromDate = '';
                setCalendarDialog(true);
                break;
            case 'toDate':
                setCalendarType('toDate');
                errors.toDate = '';
                setCalendarDialog(true);
                break;
        }
    } 

    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        if (calenderType === 'fromDate') {
            setFromDate(finalDate);
        } else {
            setToDate(finalDate)
        }
        setCalendarDialog(false);
    }

    const setErrorSnack = (variant) => {
        enqueueSnackbar('لطفا موارد خواسته شده را وارد نمایید', { variant });
    }

    
    const handleSubmitForm = () => {
        FormValidation(priceValue, scoreValue, fromDate, toDate, serviceType)
        .then(() => getReportData('success'))
        .catch((err) => {
            setErrorSnack('error');
            setErrors(err)
        })
    };

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                    formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnMultiplicationColorSectionTitle}
                icon={<AiOutlineLineChart/>} color='purpleGradiantBox'
                message={FaStaticTexts.mtnMultiplicationColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <InputWithIcon title='مبلغ (تومان)' inputType='text' errors={errors.priceValue} value={priceValue}
                                handleChange={(e) => handleChangeInput(e, 'price')} isPrice={true} /> 

                            <InputWithIcon title='میزان امتیاز' inputType='text' handleChange={(e) => handleChangeInput(e, 'scoreValue')}
                                errors={errors.scoreValue} value={scoreValue} /> 
                        </div>
                        <div className='dashboardSectionInputsInRow'>
                            <div className='datepickerInputFrame'>
                                <AiOutlineCalendar className='inputIcon' />
                                <input type='text' placeholder=' از تاریخ' className='datepickerInputStyle'
                                    value={fromDate} onClick={(e) => handleChangeInput(e, 'fromDate')}/>
                                <span className="errorText"> {errors ? errors.fromDate : null} </span>
                            </div> 
                            <div className='datepickerInputFrame'>
                                <AiOutlineCalendar className='inputIcon' />
                                <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                                    value={toDate} onClick={(e) => handleChangeInput(e, 'toDate')}/>
                                <span className="errorText"> {errors ? errors.toDate : null} </span>
                            </div> 
                            <FormControl className='customSelectOptionInRow'>
                                <span className='inputLabel'>{serviceType === ''? 'انتخاب سرویس': serviceType}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={serviceType}
                                    onChange={(e) => handleChangeInput(e, 'serviceType')}>
                                    <MenuItem value='شارژ'>شارژ</MenuItem>
                                    <MenuItem value='بسته اینترنت'>بسته اینترنت</MenuItem>
                                    <MenuItem value='قبض'>قبض</MenuItem>
                                </Select>
                                <span className="errorText"> {errors ? errors.serviceType : null} </span>
                            </FormControl>
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        جستجو
                    </Button>
                </div>
                {
                    reportList.length > 0?
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
                        </Hidden>:null
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


export default MTNMultiplication;
