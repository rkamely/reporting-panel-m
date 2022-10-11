import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {AiOutlineGift, BiX, FiCheck, IoIosArrowDown} from "react-icons/all";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import Hidden from "@material-ui/core/Hidden";
import { useSnackbar } from 'notistack';
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {Accordion, AccordionSummary, AccordionDetails} from "@material-ui/core";
import moment from 'jalali-moment';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { AiOutlineCalendar } from "react-icons/all";
import Button from "@material-ui/core/Button";
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import FormatDate from '../../../../Container/Date/FormatDate';
import FormValidation from './FormValidation';
import APIRequest from '../../../../APIRequest'


const MTNGiftList = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);
    const [giftList, setGiftList] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [calendarType, setCalendarType] = useState('fromDate');
    const [giftStatus, setGiftStatus] = useState('');
    const [errors, setErrors] = useState({});
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [noDataToShow, setNoDataToShow] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);


    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        window.scrollTo(0, 0);
        // getGiftListFromAPI();
    }, []);
    
    const pushSuccessSnack = (variant) => {
        enqueueSnackbar('لیست اطلاعات دریافت شد', { variant });
    }
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getGiftListFromAPI = async() => {
        setLoadingData(true);
        setNoDataToShow(false);
        await APIRequest('GET_GIFT_FROM_API', 'POST', 'MtnReport/prize', fromDate, toDate, 
            giftStatus === ''? 2: giftStatus, null)
        .then((res) => {
            if(res.data.length > 0){
                setGiftList(res.data);
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
            case 'giftStatus':
                errors.giftStatus = '';
                setGiftStatus(e.target.value);
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
    

    const handleSubmitForm = () => {
        getGiftListFromAPI()
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
            <DashboardSectionHeader title={FaStaticTexts.giftColorSectionTitle} icon={<AiOutlineGift />}
                 color='redGradiantBox' message={FaStaticTexts.giftColorSectionMessage} />
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
                                <span className='inputLabel'>{giftStatus === ''? 'وضعیت جایزه':
                                    giftStatus === 0? 'غیرفعال': giftStatus === 1? 'فعال': 'همه موارد'}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={giftStatus}
                                    onChange={(e) => handleChangeInput(e, 'giftStatus')}>
                                    <MenuItem value={0}>غیرفعال</MenuItem>
                                    <MenuItem value={1}>فعال</MenuItem>
                                    <MenuItem value={2}>همه موارد</MenuItem>
                                </Select>
                                <span className="errorText"> {errors ? errors.giftStatus : null} </span>
                            </FormControl>
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        جستجو
                    </Button>
                    
                </div>
                {
                    !noDataToShow && giftList.length > 0 ?
                    <Hidden only={['sm', 'xs']}>
                        <div className='tableOfContentHeader'>
                            <ul>
                                <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                                <li style={{width: '30%'}}>{FaStaticTexts.giftTitleOfHeader}</li>
                                <li style={{width: '15%'}}>{FaStaticTexts.itemStartDate}</li>
                                <li style={{width: '15%'}}>{FaStaticTexts.itemEndDate}</li>
                                <li style={{width: '15%'}}>{FaStaticTexts.itemValue}</li>
                                <li style={{width: '15%'}}>{FaStaticTexts.itemStatus}</li>
                            </ul>
                        </div>
                    </Hidden>: null
                }
                {
                    !noDataToShow?
                    giftList.map((item, index) =>
                        <div className='tableOfContentRow' key={index}>
                            <ul>
                                <Accordion
                                    style={{width: '100%'}}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)} >
                                    <AccordionSummary className='tableOfContentRowHeader' expandIcon={<IoIosArrowDown
                                        style={{position: 'absolute'}}/>}>
                                        <div className='eachRowOfTableStyle'>
                                            <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} text={index+1} />
                                            <TableOfContentRowCell width='30%' title={FaStaticTexts.messageTitleOfHeader}
                                                text={item.title} />
                                            <TableOfContentRowCell width='15%' title={FaStaticTexts.itemStartDate}
                                                text={moment(item.starttmst.substr(0,11), 'YYYY/MM/DD')
                                                .locale('fa').format('YYYY/MM/DD')} />
                                            <TableOfContentRowCell width='15%' title={FaStaticTexts.itemEndDate}
                                                text={moment(item.endtmst.substr(0,11), 'YYYY/MM/DD')
                                                .locale('fa').format('YYYY/MM/DD')} />
                                            <TableOfContentRowCell width='15%' title={FaStaticTexts.itemValue} 
                                            text={item.cost} />
                                            <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnReportEndCampaignStatus} 
                                            text={item.enabled === 1 ? <FiCheck className='successIcon' />: <BiX className='failedIcon' />} />
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className='tableOfContentDetailFrame'>  
                                        <ul className='detailFrame'>
                                            <li className="inRowFlexItems">
                                                <h5>ساعت شروع:</h5>
                                                <h6>{item.starttmst.substr(11,8)}</h6>
                                            </li>
                                            <li className="inRowFlexItems">
                                                    <h5>ساعت پایان:</h5>
                                                    <h6>{item.endtmst.substr(11,8
                                                        )}</h6>
                                                </li>
                                            <li className="inRowFlexItems">
                                                <h5>Prize ID:</h5>
                                                <h6>{item.prizeid}</h6>
                                            </li>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </ul>
                        </div>
                    ):
                    <div className="columnDirectionCenterAlign">
                        <img src={require('../../../../assets/images/icon/no_result_found.png')} alt="موردی یافت نشد" />
                        <h2 className="notFoundTitle">هیچ موردی یافت نشد!</h2>
                    </div>
                    
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoginPending: state.AppReducer.isLoginPending,
        profileStatus: state.AppReducer.userInfo.status
    }
};

export default connect(mapStateToProps)(MTNGiftList);
