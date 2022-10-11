import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {AiOutlineCalendar, FiCast, IoIosArrowDown} from "react-icons/all";
import Hidden from "@material-ui/core/Hidden";
import {Accordion, AccordionDetails, AccordionSummary, TextField} from "@material-ui/core";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import PriceFormat from "../../../../PriceFormat";
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CustomTimePicker from '../../../../Container/TimePicker/CustomTimePicker';
import { useSnackbar } from 'notistack';
import FormatDate from '../../../../Container/Date/FormatDate';
import EncodeUsername from '../../../../EncodeUsername';
import BaseURL from '../../../../BaseURL';
import moment from 'jalali-moment';
import {BiX, FiCheck} from "react-icons/all";
import LoadMore from '../../../../Container/Button/LoadMore';
import InputWithIcon from '../../../../Container/InputWithLabel';
import GetPurchaseType from '../../../Modules/GetPurchaseType';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from '@material-ui/core/Tooltip';

var qs = require('qs');

const MtnMomentLottaryCampaign = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [selectedCampaignStatusText, setSelectedCampaignStatusText] = useState('');
    const [selectedCampaignStatus, setSelectedCampaignStatus] = useState('');
    const [noDataToShow, setNoDataToShow] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [campaignName, setCampaignName] = useState('');
    const [dayliRestriction, setDayliRestriction] = useState('');
    const [fileRestriction, setFileRestriction] = useState('');
    const [ selectedAssignedChance, setSelectedAssignedChance] = useState('');
    const [ receivedChance, setReceivedChance] = useState('');
    const [ assignedChance, setassignedChance] = useState('');
    const [reportList, setReportList] = useState([]);
    const [finishedData, setFinishedData] = useState({});
    const [ pageNumber, setPageNumber] = useState(0);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [selectedFromTime, setSelectedFromTime] = useState('');
    const [selectedToTime, setSelectedToTime] = useState('');
    const [hasRequestData, setHasRequestData] = useState(false);
    const [errors, setErrors] = useState({});

    const [chargeTransaction, setChargeTransaction] = useState(false);
    const [internetTransaction, setInternetTransaction] = useState(false);
    const [billTransaction, setBillTransaction] = useState(false);
    const [dialogTransaction, setDialogTransaction] = useState(false);

    
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

    // const getReportFromAPI = async (type) => {

    //     let encodedUserPass = await EncodeUsername();
    //     let baseURL = BaseURL();
    //     console.log(typeof(amount));
    //     await axios({
    //         method: 'POST',
    //         url: `${baseURL}MtnReport/Report`,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic '+ encodedUserPass
    //         },
    //         data: qs.stringify({
    //             'stdate': fromDate,
    //             'enddate': toDate,
    //             'sttime': selectedFromTime,
    //             'endtime': selectedToTime,
    //             'campaignName': campaignName,
    //             'amount': amount,
    //             'page': pageNumber,
    //         })
    //     })
    //     .then(response => {
    //         setNoDataToShow(false);
    //         setHasRequestData(true);
    //         setLoadingData(false);
    //         setFinishedData(response.data.last);

    //         if(response.data.content.length === 0 && reportList.length > 0){
    //             setNoDataToShow(true)
    //         }
    //         if( type === 'loadMore'){
    //             setReportList([...reportList, ...response.data.content]);
    //         }
    //         else{
    //             setReportList(response.data.content);
    //         }
    //         setLoadMoreLoading(false);
    //         pushSuccessSnack('success');
    //     })
    //     .catch((err) => {
    //         pushErrorSnack('error')
    //         console.log(err)}) }

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
            case 'selectedCampaignStatus':
                errors.selectedStatus = '';
                setSelectedCampaignStatus(e.target.value);
                if(e.target.value === 0){
                    setSelectedCampaignStatusText('غیرفعال');
                }
                else{
                    setSelectedCampaignStatusText('فعال');
                }
                break;
            case 'selectedAssignedChance':
                errors.selectedAssignedChance = '';
                if(e.target.value === 0){
                    setSelectedAssignedChance('براساس مبلغ خرید');
                }
                else{
                    setSelectedAssignedChance('بر اساس تراکنش');
                }
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
        // console.log(selectedTransactions);
        // FormValidation(fromDate, toDate, selectedFromTime, selectedFromTime)
        //     .then(() => {
        //         setLoadingData(true);
        //         getReportFromAPI()
        //     })
        //     .catch((err) => {
        //         pushErrorSnack('error')
        //         setErrors(err)
        //     })
        // setLoadingData(true);
        // getReportFromAPI('loadData')
    }
    
    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        setLoadMoreLoading(true);
        // getReportFromAPI('loadMore');
    }

    const handleToggleTransaction = (type) => {
        switch(type){
            case 'charge':
                setChargeTransaction(!chargeTransaction);
                break;
            case 'internet':
                setInternetTransaction(!internetTransaction);
                break;
            case 'bill':
                setBillTransaction(!billTransaction);
                break;
            case 'dialog':
                setDialogTransaction(!dialogTransaction);
                break;
            default:
                return;
        }
    }
    

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnMomentLottaryCampaignColorSectionTitle}
                                    icon={<FiCast />} color='blueGradiantBox'
                                    message={FaStaticTexts.mtnMomentLottaryCampaignColorSectionMessage}/>
            <div className="commingSoonWallpaper">
                <h5 className='title'>در حال بروزرسانی</h5>
            </div> 
            <div className='tableOfContentStyle'>
                
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <div className='dashboardSectionInputsInRowNoWrap inRowFlexItemsFlexStart noMargin'>
                                <InputWithIcon title='نام کمپین' inputType='text' handleChange={(e) => 
                                    setCampaignName(e.target.value)} value={campaignName} maxLength={100} />
                                <FormControl className='customSelectOptionInRow'>
                                    <span className='inputLabel'>{selectedCampaignStatusText === ''? 'وضعیت':
                                     `${selectedCampaignStatusText}`}</span>
                                    <Select
                                        id="demo-simple-select"
                                        value={selectedCampaignStatus}
                                        onChange={(e) => handleChangeInput(e, 'selectedCampaignStatus')}>
                                            <MenuItem value={0}>غیرفعال</MenuItem>
                                            <MenuItem value={1}>فعال</MenuItem>
                                    </Select>
                                    <span className="errorText"> {errors? errors.selectedCampaignStatus: null} </span>
                                </FormControl>
                                <Tooltip title="تعداد محدودیت روزانه شرکت در قرعه کشی" placement="top" arrow>
                                    <span>
                                        <InputWithIcon title='محدودیت روزانه' inputType='text'
                                            handleChange={(e) => 
                                            setDayliRestriction(e.target.value)} value={dayliRestriction} maxLength={100} />
                                    </span>
                                </Tooltip>
                                <Tooltip title="تعداد محدودیت تعداد شانس قابل ذخیره شرکت در قرعه کشی" 
                                    placement="top" arrow>
                                    <span>
                                        <InputWithIcon title='شانس قابل ذخیره' 
                                            inputType='text' handleChange={(e) => 
                                            setFileRestriction(e.target.value)} value={fileRestriction} maxLength={100} 
                                            />
                                    </span>
                                </Tooltip>
                            </div>
                            <div className='inRowFlexItemsSpaceBetween'>
                                <CustomTimePicker handleChange={(e) => handleTimeChangeFunc('fromTime', e)}
                                                value={selectedFromTime} label='ساعت شروع' error={errors.fromTime} />
                                <CustomTimePicker handleChange={(e) => handleTimeChangeFunc('toTime', e)}
                                                value={selectedToTime} label='ساعت پایان' error={errors.toTime}/>
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
                            
                            <div className='dashboardSectionInputsInRowNoWrap inRowFlexItemsFlexStart noMargin'>
                                <Tooltip title="نوع تخصیص فرصت شرکت در قرعه کشی" placement="top" arrow>
                                    <FormControl className='customSelectOptionInRow'>
                                        <span className='inputLabel'>{selectedAssignedChance === ''?
                                             'تخصیص فرصت قرعه کشی':
                                        `${selectedAssignedChance}`}</span>
                                        <Select
                                            id="demo-simple-select"
                                            value={selectedAssignedChance}
                                            onChange={(e) => handleChangeInput(e, 'selectedAssignedChance')}>
                                                <MenuItem value={0}>بر اساس مبلغ خرید</MenuItem>
                                                <MenuItem value={1}>بر اساس تراکنش</MenuItem>
                                        </Select>
                                        <span className="errorText"> {errors? errors.selectedCampaignStatus: null} </span>
                                    </FormControl>
                                </Tooltip>
                                <Tooltip title="مبلغ خرید برای دریافت یک فرصت" placement="top" arrow>
                                    <div className="justRelativePosition">
                                        {
                                            selectedAssignedChance === 'براساس مبلغ خرید'?
                                                <div className='disableInputStyle' />: null
                                        }
                                        <InputWithIcon title='مبلغ خرید برای دریافت یک فرصت' inputType='text'
                                            handleChange={(e) =>  setassignedChance(e.target.value)} 
                                            value={assignedChance} maxLength={100} />
                                    </div>
                                </Tooltip>
                                <Tooltip title="تعداد فرصت دریافتی در ازای یک تراکنش" placement="top" arrow>
                                    <div className="justRelativePosition">
                                        {
                                            selectedAssignedChance === 'بر اساس تراکنش'?
                                                <div className='disableInputStyle' />: null
                                        }
                                        <InputWithIcon title='تعداد فرصت دریافتی در ازای یک تراکنش' inputType='text' 
                                            handleChange={(e) => setReceivedChance(e.target.value)} 
                                            value={receivedChance} maxLength={100} />
                                    </div>
                                </Tooltip>
                            </div>

                            <div className='selectMultipleItemFrame'>
                                <h4>نوع تراکنش: </h4>
                                <div className="selectServiceFrame">
                                    <Button className={chargeTransaction? 'radioItemStyle': 'unCheckedRadioItemStyle'}
                                         onClick={()=>handleToggleTransaction('charge')}>
                                        شارژ
                                    </Button>
                                    <Button className={internetTransaction? 'radioItemStyle': 'unCheckedRadioItemStyle'}
                                         onClick={()=>handleToggleTransaction('internet')}>
                                        اینترنت
                                    </Button>
                                    <Button className={billTransaction? 'radioItemStyle': 'unCheckedRadioItemStyle'}
                                        onClick={()=>handleToggleTransaction('bill')}>
                                        قبض
                                    </Button>
                                    <Button className={dialogTransaction? 'radioItemStyle': 'unCheckedRadioItemStyle'}
                                        onClick={()=>handleToggleTransaction('dialog')}>
                                        مکالمه همراهی
                                    </Button>
                                
                                </div>
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
                                                                   text={item.phone}/>
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
                                                                   <BiX className='failedIcon' />} />
                                            <TableOfContentRowCell width='15%'
                                                                   title={FaStaticTexts.mtnReportRowTitleOfHeaderBankResponse}
                                                                   text={item.bres === '0'? <FiCheck className='successIcon' />: 
                                                                   <BiX className='failedIcon' />}/>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className='tableOfContentDetailFrame'>
                                            
                                        <ul className='detailFrame'>
                                            {
                                                item.phone !== item.destphone?
                                                <li className="inRowFlexItems">
                                                    <h5>شناسه:</h5>
                                                    <h6>{item.pin}</h6>
                                                </li>: null
                                            }
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
                        <img src={require('../../../../assets/images/icon/no_result_found.png')} 
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

export default MtnMomentLottaryCampaign;