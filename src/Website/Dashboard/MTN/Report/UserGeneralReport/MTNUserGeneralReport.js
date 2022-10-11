import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../../Constants/Fa/FaStatic";
import {AiOutlineCalendar, AiOutlineFileText, IoIosArrowDown} from "react-icons/all";
import Hidden from "@material-ui/core/Hidden";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import TableOfContentRowCell from "../../../../../Container/Table/TableOfContentRowCell";
import PriceFormat from "../../../../../PriceFormat";
import PersianDatePicker from "../../../../../Container/Dialog/PersianDatePicker";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CustomTimePicker from '../../../../../Container/TimePicker/CustomTimePicker';
import { useSnackbar } from 'notistack';
import FormatDate from '../../../../../Container/Date/FormatDate';
import EncodeUsername from '../../../../../EncodeUsername';
import BaseURL from '../../../../../BaseURL';
import moment from 'jalali-moment';
import {BiX, FiCheck} from "react-icons/all";
import LoadMore from '../../../../../Container/Button/LoadMore';
import InputWithIcon from '../../../../../Container/InputWithLabel';
import GetPurchaseType from '../../../../Modules/GetPurchaseType';
import APIRequest from '../../../../../APIRequest';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from '@material-ui/core/Tooltip';


var qs = require('qs');

const MTNGeneralReport = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [hasRequestData, setHasRequestData] = useState(false);
    const [noDataToShow, setNoDataToShow] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [typesList, setTypesList] = useState([]);
    const [mobile, setMobile] = useState('');
    const [ destMobile, setDestMobile ] = useState('');
    const [amount, setAmount] = useState('');
    const [service, setService] = useState(0);
    const [ serviceText, setServiceText] = useState('');
    const [transaction, setTransaction] = useState(null);
    const [reportList, setReportList] = useState([]);
    const [finishedData, setFinishedData] = useState({});
    const [ pageNumber, setPageNumber] = useState(0);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [selectedFromTime, setSelectedFromTime] = useState('');
    const [selectedToTime, setSelectedToTime] = useState('');
    const [errors, setErrors] = useState({});

    

    useEffect(() => {
        getTypesList();
    }, []);

    const getTypesList = () => {
        APIRequest('GET_ALL_TYPES', 'POST', 'MtnReport/types', '', '', 2)
        .then((res) => {
            setTypesList(res.data);
        })
        .catch(() => pushErrorSnack('error'))
    }

    
    const { enqueueSnackbar } = useSnackbar();


    /********************* Control Collapse Detail Of List *********************/
    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false);
    };

    const pushSuccessSnack = (variant) => {
        enqueueSnackbar('لیست اطلاعات دریافت شد', { variant });
    }
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getReportFromAPI = async (type) => {


        let encodedUserPass = await EncodeUsername();
        let baseURL = BaseURL();
        await axios({
            method: 'POST',
            url: `${baseURL}MtnReport/Report`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ encodedUserPass
            },
            data: qs.stringify({
                'stdate': fromDate,
                'enddate': toDate,
                'sttime': selectedFromTime,
                'endtime': selectedToTime,
                'phone': mobile,
                'destphone': destMobile,
                'amount': amount,
                'page': pageNumber,
                'type': service,
                'transc': transaction === null? 0: transaction,
                'operator': 1,
                'bank': 1
            })
        })
        .then(response => {
            setNoDataToShow(false);
            setHasRequestData(true);
            setLoadingData(false);
            setFinishedData(response.data.last);

            if(response.data.content.length === 0 && reportList.length > 0){
                setNoDataToShow(true)
            }
            if( type === 'loadMore'){
                setReportList([...reportList, ...response.data.content]);
            }
            else{
                setReportList(response.data.content);
            }
            setLoadMoreLoading(false);
            pushSuccessSnack('success');
        })
        .catch((err) => {
            pushErrorSnack('error')
            console.log(err)}) }

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

    const handleChangeInput = (e, type) => {
        switch(type){
            case 'fromDate':
                errors.fromDate = '';
                setCalendarDialog(true);
                setCalendarType('fromDate');
                break;
            case 'toDate':
                errors.toDate = '';
                setCalendarDialog(true);
                setCalendarType('toDate');
                break;
            case 'selectedService':
                errors.service = '';
                setService(parseInt(e.target.value));
                let serviceTypeIndex = typesList.findIndex(item => e.target.value === item.type);
                setServiceText(typesList[serviceTypeIndex].desc)
                break;
            case 'selectedTransaction':
                errors.transaction = '';
                setTransaction(e.target.value);
                break;
        }
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

    const handleSubmitForm = () => {
        // FormValidation(fromDate, toDate, selectedFromTime, selectedFromTime)
        //     .then(() => {
        //         setLoadingData(true);
        //         getReportFromAPI()
        //     })
        //     .catch((err) => {
        //         pushErrorSnack('error')
        //         setErrors(err)
        //     })
        setLoadingData(true);
        getReportFromAPI('loadData');
    }
    
    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        setLoadMoreLoading(true);
        getReportFromAPI('loadMore');
    }
    

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnGeneralReportColorSectionTitle}
                                    icon={<AiOutlineFileText/>} color='blueGradiantBox'
                                    message={FaStaticTexts.mtnGeneralReportColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                    <div className='dashboardSectionInputsInRow'>
                        <InputWithIcon title='تلفن همراه مبدا' inputType='text' handleChange={(e) => 
                            setMobile(e.target.value)} value={mobile} maxLength={11} />
                        <InputWithIcon title='تلفن همراه مقصد' inputType='text' handleChange={(e) => 
                            setDestMobile(e.target.value)} value={destMobile} maxLength={11} />
                        <InputWithIcon
                            title={`خرید بالاتر از ${PriceFormat(5000)} ریال`} inputType='text' handleChange={(e) => 
                                setAmount(e.target.value)} value={amount} maxLength={15} />
    
                    </div>
                    <div className='dashboardSectionInputsInRow'>
                        <Tooltip title="نوع سرویس" placement="top" arrow>
                            <FormControl className='customSelectOptionInRow'>
                                <span className='inputLabel'>{service === 0? 'نوع سرویس': serviceText}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={service}
                                    onChange={(e) => handleChangeInput(e, 'selectedService')}>
                                        {
                                            typesList.map((item, index) => 
                                                <MenuItem value={item.type} key={index}>
                                                    {item.desc}
                                                </MenuItem>)
                                        }
                                </Select>
                                <span className="errorText"> {errors ? errors.service : null} </span>
                            </FormControl>
                        </Tooltip>
                        <FormControl className='customSelectOptionInRow'>
                            <span className='inputLabel'>{transaction === null? 'نوع تراکنش':
                                `${transaction === 1? 'ناموفق': transaction === 0? 'موفق': null}`}
                                </span>
                            <Select
                                value={transaction}
                                onChange={(e) => handleChangeInput(e, 'selectedTransaction')}>
                                    <MenuItem value={1}>ناموفق</MenuItem>
                                    <MenuItem value={0}>موفق</MenuItem>
                            </Select>
                            <span className="errorText"> {errors? errors.selectedCampaignStatus: null} </span>
                        </FormControl>
                    </div>
                    <div className='inRowFlexItemsSpaceBetween' style={{marginTop: 5}}>
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
                    <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        جستجو
                    </Button>
                </div>
                {
                    reportList.length > 0 ?
                        <Hidden only={['sm', 'xs']}>
                            <div className='tableOfContentHeader'>
                                <ul>
                                    <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderTel}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderDate}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportRowTitleOfPurchaseType}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderAmount}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderTransactionResponse}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderBankResponse}</li>
                                </ul>
                            </div>
                        </Hidden> : null
                }
                {
                    !noDataToShow?
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
                                        <TableOfContentRowCell width='10%'
                                                                   title={FaStaticTexts.rowStaticText}
                                                                   text={index+1}/>
                                            <TableOfContentRowCell width='20%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderTel}
                                                                   text={item.destphone}/>
                                            <TableOfContentRowCell width='20%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderDate}
                                                                   text={item.tmst!==null?
                                                                    moment(item.tmst.substr(0,11), 'YYYY/MM/DD')
                                                                    .locale('fa').format('YYYY/MM/DD'):
                                                                    'ثبت نشده'}/>
                                            <TableOfContentRowCell width='20%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfPurchaseType}
                                                                   text={GetPurchaseType(item.type)} isRtl={true} />
                                            <TableOfContentRowCell width='20%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderAmount}
                                                                   text={`${PriceFormat(item.amont)} ریال`} isRtl={true} />
                                            <TableOfContentRowCell width='15%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderTransactionResponse}
                                                                   text={item.tres === '0'? <FiCheck className='successIcon' />: 
                                                                   <BiX className='failedIcon' />}/>
                                            <TableOfContentRowCell width='15%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderBankResponse}
                                                                   text={item.bres === '0'? <FiCheck className='successIcon' />: 
                                                                   <BiX className='failedIcon' />}/>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className='tableOfContentDetailFrame'>
                                            
                                        <ul className='detailFrame'>
                                            <li className="inRowFlexItems">
                                                <h5>شماره مقصد:</h5>
                                                <h6>{item.destphone}</h6>
                                            </li>
                                            {
                                                item.phone !== item.destphone?
                                                <li className="inRowFlexItems">
                                                    <h5>شناسه:</h5>
                                                    <h6>{item.pin}</h6>
                                                </li>: null
                                            }
                                            <li className="inRowFlexItems">
                                                <h5>ساعت تراکنش:</h5>
                                                <h6>{item.tmst.substr(11,8)}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                <h5>توضیحات بانک:</h5>
                                                <h6>{item.bdesc}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                <h5>شناسه:</h5>
                                                <h6>{item.pin}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                <h5>کد تراکنش:</h5>
                                                <h6>{item.btracecode}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                <h5>مرچنت آیدی:</h5>
                                                <h6>{item.merchantid}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                <h5>آیدی بانک:</h5>
                                                <h6>{item.bankid}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                <h5>کیف پول:</h5>
                                                <h6>{PriceFormat(item.walet)}</h6>
                                            </li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </ul>
                        </div>
                    ):
                    <div className="columnDirectionCenterAlign">
                        <img src={require('../../../../../assets/images/icon/no_result_found.png')} 
                            alt="موردی یافت نشد" />
                        <h2 className="notFoundTitle">هیچ موردی یافت نشد!</h2>
                    </div>
                }
                {
                    !finishedData && hasRequestData?
                    <LoadMore title='موارد بیشتر' loading={loadMoreLoading}
                        loadMore={() => handleLoadMore()} />: null
                }
            </div>
        </div>
    )
}

export default MTNGeneralReport;