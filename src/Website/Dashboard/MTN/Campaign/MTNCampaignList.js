import React, {useState, useEffect} from 'react';
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import LoadingBackDrop from '../../../../Container/Loading/LoadingBackdrop';
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import FormatDate from '../../../../Container/Date/FormatDate';
import {BiX, FiCheck, FiLayers, IoIosArrowDown} from "react-icons/all";
import Hidden from "@material-ui/core/Hidden";
import { useSnackbar } from 'notistack';
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FormValidation from './FormValidation';
import moment from 'jalali-moment';
import LoadMore from '../../../../Container/Button/LoadMoreBtn';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { AiOutlineCalendar } from "react-icons/all";
import Button from "@material-ui/core/Button";
import PriceFormat from '../../../../PriceFormat';
import APIRequest from '../../../../APIRequest';


const MTNCampaignList = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [expanded, setExpanded] = useState(null);
    const [campaignList, setCampaignList] = useState([]);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [calendarType, setCalendarType] = useState('fromDate');
    const [campaignStatus, setCampaignStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [noDataToShow, setNoDataToShow] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    
    const pushSuccessSnack = (variant) => {
        enqueueSnackbar('لیست اطلاعات دریافت شد', { variant });
    }
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getCampaignList = async() => {
        setLoadingData(true);
        setNoDataToShow(false);
        APIRequest('GET_CAMPAIGN_LIST', 'POST', 'MtnReport/camplist', fromDate, toDate, campaignStatus)
        .then((res) => {
            if(res.length > 0){
                setCampaignList(res);
            }
            else{
                setNoDataToShow(true)
            }
            setLoadingData(false);
            pushSuccessSnack('success')
        })
        .catch((err) => {
            console.log(err);
            pushErrorSnack('error')})
    }

    // const getGiftListFromAPI = async() => {

    //     setLoadingData(true);
    //     setNoDataToShow(false);
    //     await axios({
    //         method: 'post',
    //         url: `${baseURL}MtnReport/prize`,
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Basic '+ encodedUserPass
    //         },
    //         data: qs.stringify({
    //             'stdate': '',
    //             'enddate': '',
    //             'enable': giftStatus
    //         })
        
    //     })
    //     .then((res) => {
    //         if(res.data.length > 0){
    //             setGiftList(res.data);
    //         }
    //         else{
    //             setNoDataToShow(true)
    //         }
    //         setLoadingData(false);
    //         pushSuccessSnack('success')
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         pushErrorSnack('error')})
    
    // }
    

    /********************* Control Collapse Detail Of List *********************/
    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded ? panel : false);
    };

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
            case 'campaignStatus':
                errors.campaignStatus = '';
                setCampaignStatus(e.target.value);
                break;        
            case 'fromDate':
                errors.fromDate = '';
                setCalendarDialog(true);
                break;
            case 'toDate':
                errors.toDate = '';
                setCalendarDialog(true);
                break;
        }
    }
    

    const handleSubmitForm = (e) => {
    
        FormValidation(campaignStatus)
            .then(() => getCampaignList())
            .catch((err) => {
                pushErrorSnack('error');
                setErrors(err)
            })
    }

    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        setLoadMoreLoading(true);
    }
    
    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }
        
            <DashboardSectionHeader title={FaStaticTexts.mtnCampaignListTitle}
                                    icon={<FiLayers />} color='purpleGradiantBox'
                                    message={FaStaticTexts.mtnReportCampaignSendGiftMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <div className='datepickerInputFrame margin10'>
                                <AiOutlineCalendar className='inputIcon' />
                                <input type='text' placeholder=' از تاریخ' className='datepickerInputStyle'
                                        value={fromDate} onClick={() => {
                                        setCalendarDialog(true);setCalendarType('fromDate');errors.fromDate = '';
                                }} onChange={() => {}} />
                                <span className="errorText"> {errors ? errors.fromDate : null} </span>
                            </div> 
                            <div className='datepickerInputFrame margin10'>
                                <AiOutlineCalendar className='inputIcon' />
                                <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                                        value={toDate} onClick={() => {
                                        setCalendarDialog(true);setCalendarType('toDate');errors.toDate = '';
                                }} onChange={() => {}}/>
                                <span className="errorText"> {errors ? errors.toDate : null} </span>
                            </div> 
                            <FormControl className='customSelectOptionInRow'>
                                <span className='inputLabel'>{campaignStatus === ''? 'وضعیت کمپین':
                                    campaignStatus === 0? 'غیرفعال': campaignStatus === 1? 'فعال': 'همه موارد'}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={campaignStatus}
                                    onChange={(e) => handleChangeInput(e, 'campaignStatus')}>
                                    <MenuItem value={0}>غیرفعال</MenuItem>
                                    <MenuItem value={1}>فعال</MenuItem>
                                    <MenuItem value={2}>همه موارد</MenuItem>
                                </Select>
                                <span className="errorText"> {errors ? errors.campaignStatus : null} </span>
                            </FormControl>
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        جستجو
                    </Button>
                    
                </div>
                {
                    campaignList.length > 0?
                        <Hidden only={['sm', 'xs']}>
                            <div className='tableOfContentHeader'>
                                <ul>
                                    <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                                    <li style={{width: '30%'}}>{FaStaticTexts.mtnReportCampaignChargeAmount}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportStartCampaignDate}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportEndCampaignDate}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportCampaignType}</li>
                                    <li style={{width: '15%'}}>{FaStaticTexts.mtnReportEndCampaignStatus}</li>
                                </ul>
                            </div>
                        </Hidden>: null
                }
                {
                    !noDataToShow?
                        campaignList.map((item, index) =>
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
                                                <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} text={index+1} />
                                                <TableOfContentRowCell width='30%' title={FaStaticTexts.mtnReportCampaignChargeAmount} 
                                                    text={item.amount !== 0? `${PriceFormat(item.amount)} ریال`: 
                                                        'هر مبلغ خرید'} isRtl={true} />
                                                <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnReportStartCampaignDate}
                                                    text={moment(item.starttmst.substr(0,11), 'YYYY/MM/DD')
                                                    .locale('fa').format('YYYY/MM/DD')} />
                                                <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnReportEndCampaignDate}
                                                    text={moment(item.endtmst.substr(0,11), 'YYYY/MM/DD')
                                                    .locale('fa').format('YYYY/MM/DD')} />
                                                <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnReportCampaignType} 
                                                text={item.camptype} />
                                                <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnReportEndCampaignStatus} 
                                                text={item.enabled === 1 ? <FiCheck className='successIcon' />: 
                                                    <BiX className='failedIcon' />} />
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            className='tableOfContentDetailFrame'>
                                            <ul className='detailFrame'>
                                                <li className="inRowFlexItems">
                                                    <h5>{FaStaticTexts.mtnReportReceivedExtraGift}: </h5>
                                                    <h6>{PriceFormat(item.exteragift)} امتیاز</h6>
                                                </li>
                                            
                                            </ul>
                                        </AccordionDetails>
                                    </Accordion>
                                </ul>
                            </div>
                        ): 
                        <div className="columnDirectionCenterAlign">
                            <img src={require('../../../../assets/images/icon/no_result_found1.png')} 
                                alt="موردی یافت نشد" />
                            <h2 className="notFoundTitle">هیچ موردی یافت نشد!</h2>
                        </div>
            
                }
                {
                    campaignList.last?
                    <LoadMore title='موارد بیشتر' loading={loadMoreLoading}
                        loadMore={() => handleLoadMore()} />: null
                }
            </div>
        </div>
    )
}

export default MTNCampaignList;