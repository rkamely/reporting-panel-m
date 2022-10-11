import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import Hidden from "@material-ui/core/Hidden";
import {Button} from "@material-ui/core";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import moment from "jalali-moment";
import FormatDate from '../../../../Container/Date/FormatDate';
import { useSnackbar } from 'notistack';
import LoadMore from '../../../../Container/Button/LoadMore';
import APIRequest from '../../../../APIRequest';
import InputWithIcon from '../../../../Container/InputWithLabel';
import {FiAperture} from "react-icons/all";
import BaseURL from '../../../../BaseURL';
import EncodeUsername from '../../../../EncodeUsername';
import axios from 'axios';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";



const MTNSubscriberScore = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
     const [ selectedGift, setSelectedGift] = useState('');
    const [selectedGiftText, setSelectedGiftText] = useState('');
    const [selectedGiftCode, setSelectedGiftCode] = useState('');
    const [ pageNumber, setPageNumber] = useState(0);
    const [reportList, setReportList] = useState([]);
    const [giftList, setGiftList] = useState([]);
    const [ reportDetail, setReportDetail] = useState({});
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [prizeId, setPrizeId] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [noDataToShow, setNoDataToShow] = useState(false);



    var qs = require('qs');
    let baseURL = BaseURL();
    let encodedUserPass = EncodeUsername();
    
    useEffect(() => {
        window.scrollTo(0, 0);
        getGiftList();
    }, []);

    const { enqueueSnackbar } = useSnackbar();
    
    const handleChangeInput = (e, type) => {
        if(type === 'mobileNumber'){
            errors.mobileNumber = '';
            setMobileNumber(e.target.value);
        }
        else if (type === 'prizeId'){
            errors.prizeid = '';
            setPrizeId(e.target.value);
        }
        else if( type === 'selectedGift'){
            errors.selectedGift = '';
            setSelectedGift(e.target.value);
            setSelectedGiftText(giftList[e.target.value].title);
            setSelectedGiftCode(giftList[e.target.value].prizeid);
        }
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

    const pushSuccessSnack = (variant) => {
        enqueueSnackbar('لیست اطلاعات دریافت شد', { variant });
    }
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getChanceDataFromAPI = async (type) => {
        setNoDataToShow(false);
        axios({
            method: 'POST',
            url: `${baseURL}MtnReport/chance`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ encodedUserPass
            },
            data: qs.stringify({
                'page': pageNumber,
                'prizeid': prizeId,
                'phone': mobileNumber,
                'prizeid': selectedGiftCode,
                // 'transactionType': errorCode,
                // 'bankResponse': selectBankResponse
            })
        })
        .then((response) => {
            setReportDetail(response.data);
            if(type === 'loadMore'){
                setReportList([...reportList, ...response.data.content]);
            }
            else{
                if(response.data.content.length > 0){
                    setReportList(response.data.content);
                }
                else{
                    setNoDataToShow(true)
                }
                
            }
            pushSuccessSnack('success');
            setLoadingData(false);
            setLoadMoreLoading(false);
        })
        .catch(() => pushErrorSnack('error'))
    }

    const getGiftList = () => {
        APIRequest('GET_ALL_GIFT', 'POST', 'MtnReport/prize', '', '', 2)
        .then((res) => {
            console.log(res.data.length);
            if(parseInt(res.data.length) !== 0){
                setGiftList(res.data);
            }
            else{
                pushErrorSnack('error');  
            }
        })
        .catch(() => {
            pushErrorSnack('error');
            setGiftList([]);
        })
    }

    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        setLoadMoreLoading(true);
        getChanceDataFromAPI('loadMore');
    }

    const getPrizeName = (id) => {
        if(giftList !== undefined){
            let item = giftList.filter(item => item.prizeid === id);
            return item[0].title;
        }
    }

    const handleSubmitForm = () => {
        setLoadingData(true);
        getChanceDataFromAPI('requestData');
    }

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnSubscriberScoreColorSectionTitle}
                                    icon={<FiAperture/>} color='orangeGradiantBox'
                                    message={FaStaticTexts.mtnSubscriberScoreColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                                <InputWithIcon title='تلفن همراه' inputType='text' handleChange={(e) => handleChangeInput(e, 'mobileNumber')}
                                    errors={errors.mobileNumber} value={mobileNumber} maxLength={11} /> 
                                    
                                <FormControl className='customSelectOptionInRow'>
                                    <span className='inputLabel'>{selectedGiftText === ''? 'جایزه':
                                     `${selectedGiftText} (${selectedGiftCode})`}</span>
                                    <Select
                                        id="demo-simple-select"
                                        value={selectedGift}
                                        onChange={(e) => handleChangeInput(e, 'selectedGift')}>
                                            {
                                                giftList.length > 0?
                                                giftList.map((item, index) => 
                                                <MenuItem value={index} key={index}>
                                                    {`(${item.prizeid}) ${item.title}`}
                                                </MenuItem>): null
                                            }
                                    </Select>
                                    <span className="errorText"> {errors ? errors.selectedGift : null} </span>
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
                                    <li style={{width: '20%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderTel}</li>
                                    <li style={{width: '20%'}}>{FaStaticTexts.mtnSubscriberScoreConvertDate}</li>
                                    <li style={{width: '25%'}}>{FaStaticTexts.mtnSubscriberScoreNumber}</li>
                                    <li style={{width: '25%'}}>{FaStaticTexts.mtnSubscriberScoreGift}</li>
                                </ul>
                            </div>
                        </Hidden>:null
                }
                {
                    !noDataToShow?
                        reportList.map((item, index) =>
                            <div className='tableOfContentRow' key={index}>
                                <ul>
                                    <div className='fullWidth'>
                                        <div className='tableOfContentRowHeaderNotAccordion'>
                                            <div className='eachRowOfTableStyle'>
                                                <TableOfContentRowCell width='10%' isRtl={true}
                                                                    title={FaStaticTexts.mtnReportRowTitleOfHeaderRow}
                                                                    text={index + 1}/>
                                                <TableOfContentRowCell width='20%' isRtl={true}
                                                                    title={FaStaticTexts.mtnReportRowTitleOfHeaderTime}
                                                                    text={item.phone}/>
                                                <TableOfContentRowCell width='25%' isRtl={true}
                                                                    title={FaStaticTexts.mtnSubscriberScoreConvertDate}
                                                                    text={`${moment(item.tmst, 'YYYY/MM/DD')
                                                                    .locale('fa').format('YYYY/MM/DD')} ساعت
                                                                    ${item.tmst.substr(11,8)}`}/>
                                                <TableOfContentRowCell width='15%' isRtl={true}
                                                                    title={FaStaticTexts.mtnSubscriberScoreNumber}
                                                                    text={item.chance}/>
                                                {/* <TableOfContentRowCell width='25%' isRtl={false}
                                                                    title={FaStaticTexts.mtnReportRowTitleOfHeaderCode}
                                                                    text={item.prizeid} /> */}
                                                <TableOfContentRowCell width='30%' isRtl={false}
                                                    title={FaStaticTexts.mtnReportRowTitleOfHeaderCode}
                                                    text={giftList.length>0? `(${item.prizeid}) ${getPrizeName(item.prizeid)}`:
                                                    item.prizeid} />
                                            </div>
                                        </div>
                                    </div>
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
                    !reportDetail.last && reportList.length > 0?
                    <LoadMore title='موارد بیشتر' loading={loadMoreLoading}
                        loadMore={() => handleLoadMore()} />: null
                }
            </div>
        </div>
    )
}

export default MTNSubscriberScore;