import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import Hidden from "@material-ui/core/Hidden";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {Accordion, AccordionSummary} from "@material-ui/core";
import InputWithIcon from '../../../../Container/InputWithLabel';
import APIRequest from '../../../../APIRequest';
import {AiOutlineCalendar, IoMdMedal, IoIosArrowDown} from "react-icons/all";
import Button from "@material-ui/core/Button";
import FormatDate from '../../../../Container/Date/FormatDate';
import { useSnackbar } from 'notistack';
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import LoadMore from '../../../../Container/Button/LoadMore';
import GetPurchaseType from '../../../Modules/GetPurchaseType';
import PriceFormat from '../../../../PriceFormat';
import moment from 'jalali-moment';

const MTNScoresList = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [mobileNumber, setMobileNumber] = useState('');
    const [expanded, setExpanded] = useState(null);
    const [scoreList, setScoreList] = useState([]);
    const [scoreDetail, setScoreDetail] = useState({});
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [errors, setErrors] = useState({});

    const { enqueueSnackbar } = useSnackbar();

    const pushSuccessSnack = (variant) => {
        enqueueSnackbar('لیست اطلاعات دریافت شد', { variant });
    }
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getScoresListFromAPI = async (type) => {

        await APIRequest('GET_SUBSCRIBER_SCORE_LIST', 'POST', 'MtnReport/score', fromDate, toDate, null, pageNumber,
            mobileNumber, null)
        .then(response => {
            setScoreDetail(response.data);
            if(type === 'loadMore'){
                setScoreList([...scoreList, ...response.data.content]);
            }
            else{
                setScoreList(response.data.content);
            }
            
            setLoadingData(false);
            setLoadMoreLoading(false);
            pushSuccessSnack('success');
        })
        .catch(() => pushErrorSnack('error'))
    }

    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded? panel: false);
    };

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
            case 'mobileNumber':
                errors.mobileNumber = '';
                setMobileNumber(e.target.value);
                break;
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
        }
    }


    const handleSubmitForm = (e) => {
        // FormValidation(mobileNumber, fromDate, toDate)
        //     .then(() => {
        //         setLoadingData(true);
        //         getScoresListFromAPI();
        //     })
        //     .catch((err) => {
        //         pushErrorSnack('error');
        //         setErrors(err)
        //     })
        setLoadingData(true);
        getScoresListFromAPI('loadData');
    }

    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        getScoresListFromAPI('loadMore');
        setLoadMoreLoading(true);
    }

    return (
        <div className='mainPageContentFrame'>
            { loadingData? <LoadingBackDrop />: null }

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnSubscriberScoreTableColorSectionTitle} icon={<IoMdMedal />}
                 color='greenGradiantBox' message={FaStaticTexts.mtnSubscriberScoreTableColorSectionMessage} />
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <>
                                <InputWithIcon title='تلفن همراه' inputType='text' handleChange={(e) => 
                                    handleChangeInput(e, 'mobileNumber')}
                                    errors={errors.mobileNumber} value={mobileNumber} maxLength={11} /> 
                                <div className='datepickerInputFrame margin10'>
                                    <AiOutlineCalendar className='inputIcon' />
                                    <input type='text' placeholder='از تاریخ' className='datepickerInputStyle'
                                            value={fromDate} onClick={(e) => handleChangeInput(e, 'fromDate')}
                                            onChange={() => {}} />
                                    <span className="errorText"> {errors ? errors.fromDate : null} </span>
                                </div>
                                <div className='datepickerInputFrame margin10'>
                                    <AiOutlineCalendar className='inputIcon' />
                                    <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                                            value={toDate} onClick={(e) => handleChangeInput(e, 'toDate')}
                                            onChange={() => {}} />
                                    <span className="errorText"> {errors ? errors.toDate : null} </span>
                                </div>
                            </>
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={(e) => handleSubmitForm(e)}>
                        جستجو
                    </Button>
                </div>
                {
                    scoreList.length !== 0 ?
                    <Hidden only={['sm', 'xs']}>
                        <div className='tableOfContentHeader'>
                            <ul>
                                <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                                <li style={{width: '20%'}}>{FaStaticTexts.mtnSubscriberScoreMobileTitle}</li>
                                <li style={{width: '15%'}}>{FaStaticTexts.date}</li>
                                <li style={{width: '20%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderScore}</li>
                                <li style={{width: '15%'}}>{FaStaticTexts.itemValue}</li>
                                <li style={{width: '20%'}}>{FaStaticTexts.itemPurchase}</li>
                            </ul>
                        </div>
                    </Hidden>: null
                }
                {
                    scoreList.map((item, index) =>
                        <div className='tableOfContentRow' key={index}>
                            <ul>
                                <Accordion
                                    style={{width: '100%'}}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                    >
                                    <AccordionSummary className='tableOfContentRowHeader' 
                                        expandIcon={<IoIosArrowDown
                                            style={{position: 'absolute'}}/>}>
                                        <div className='eachRowOfTableStyle'>
                                            <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} 
                                            text={index+1} />
                                            <TableOfContentRowCell width='20%' title={FaStaticTexts.mtnSubscriberScoreMobileTitle}
                                                text={item.phone} />
                                            <TableOfContentRowCell width='15%' title={FaStaticTexts.date}
                                                text={item.starttmst!==null?
                                                    moment(item.starttmst.substr(0,11), 'YYYY/MM/DD')
                                                    .locale('fa').format('YYYY/MM/DD'):
                                                    'تاریخ ثبت نشده است'} />
                                            <TableOfContentRowCell width='20%' title={FaStaticTexts.mtnReportRowTitleOfHeaderScore}
                                                text={item.score} />
                                            <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnSubscriberScoreAmountTitle}
                                                text={`${PriceFormat(item.amount)} ریال`} isRtl={true} />
                                    
                                            <TableOfContentRowCell width='20%' title={FaStaticTexts.itemPurchase}
                                                text={GetPurchaseType(item.type)} />   
                                            </div>
                                    </AccordionSummary>
                                </Accordion>
                            </ul>
                        </div>
                    )
                }
        
                {
                    !scoreDetail.last && scoreList.length > 0?
                    <LoadMore title='موارد بیشتر' loading={loadMoreLoading}
                        loadMore={() => handleLoadMore()} />: null
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

export default connect(mapStateToProps)(MTNScoresList);
