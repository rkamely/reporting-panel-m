import React, {useEffect, useState} from 'react';
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {IoIosArrowDown, AiOutlineCalendar} from "react-icons/all";
import Hidden from "@material-ui/core/Hidden";
import {Accordion, AccordionDetails, AccordionSummary} from "@material-ui/core";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import PriceFormat from "../../../../PriceFormat";
import ReportService from "../../../../Container/Report/ReportService";
import ReportBank from "../../../../Container/Report/ReportBank";
import PersianDatePicker from "../../../../Container/Dialog/PersianDatePicker";
import Button from "@material-ui/core/Button";
import InputWithIcon from '../../../../Container/InputWithLabel';
import { useSnackbar } from 'notistack';
import FormatDate from '../../../../Container/Date/FormatDate';
import {FiAperture} from 'react-icons/fi';
import {AiOutlineCloudUpload} from 'react-icons/ai';
import LinearProgress from '@material-ui/core/LinearProgress';
import FormValidation from './FormValidation';



const MTNNewOpportunities = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [reportList, setReportList] = useState([]);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [errors, setErrors] = useState({});
    const [selectedFileName, setSelectedFileName] = useState('');
    const [ hasUploadedFile, setHasUploadedFile ] = useState(false);
    const [ isUploading, setIsUploading ] = useState(false);
    const [ maxChance, setMaxChance ] = useState('');
    const [ dayliMaxChance, setDayliMaxChance] = useState('');

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
            enqueueSnackbar(FaStaticTexts.snackUpdateFormText , { variant });
        }, 2000);
        
    }
    
    const handleChangeInput = (e, type) => {
        switch(type){
            case 'maxChance':
                errors.maxChance = '';
                setMaxChance(e.target.value);
                break;
            case 'dayliMaxChance':
                errors.dayliMaxChance = '';
                setDayliMaxChance(e.target.value);
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
        enqueueSnackbar('ثبت تغییرات انجام نشد!', { variant });
    }

    
    const handleSubmitForm = () => {
        FormValidation(maxChance, dayliMaxChance, fromDate, toDate)
        .then(() => getReportData('success'))
        .catch((err) => {
            console.log(err);
            setErrorSnack('error');
            setErrors(err)
        })
    };
    
    const selectFileFunc = (e) => {
        setSelectedFileName(e.target.files[0].name);
    }
    const uploadExcelFile = (variant) => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            enqueueSnackbar('فایل با موفقیت  بارگذاری شد' , { variant });
        }, 3000);
    }

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                    formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnOpportunityColorSectionTitle}
                icon={<FiAperture/>} color='blueGradiantBox'
                message={FaStaticTexts.mtnOpportunityColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionDevider'>
                            <span>فرصت های بارگذاری شده</span>
                        </div>
                        <section className="dataTableFrame">
                            <ul className="dataTableFrameHeader">
                                <li style={{ width: '50%'}}>نام</li>
                                <li style={{ width: '40%'}}>تاریخ بارگذاری</li>
                            </ul>
                        </section>
                        <div className='dashboardSectionInputsInRow'>
                            {
                                hasUploadedFile?
                                <div className='inRowFlexItemsSpaceBetween'>
                                    <h5 className='simpleTextOnWhite'>فایل اکسل را قبلا بارگذاری کرده اید. برای مشاهده روی آیکون کلیک کنید</h5>
                                    <img src={require('../../../../assets/images/icon/excelFileIcon.png')} />
                                </div>:
                                <div className='inRowFlexItemsSpaceBetween'>
                                    <h5 className='simpleTextOnWhite'>
                                        برای ایجاد فرصت فایل اکسل را بارگذاری کنید
                                    </h5>
                                    <div>
                                        <span>
                                            <input type='file' id='uploadFileInput' onChange={selectFileFunc} className='hiddenInputFileStyle' />
                                            <label htmlFor='uploadFileInput' className='inputFileLabelStyle'>
                                                {selectedFileName !== ''? selectedFileName: 'انتخاب فایل'}
                                            </label>
                                        </span>
                                        {
                                            isUploading?
                                            <LinearProgress color="secondary" />:
                                            null
                                        }
                                        <Button className='uploadFileButton' onClick={() => uploadExcelFile('success')}>
                                            آپلود فایل
                                            <AiOutlineCloudUpload className='icon' />
                                        </Button>
                                    </div>
                                </div>
                            }
                        </div>
                    
                    </div>
                    {/* <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        ثبت تغییرات
                    </Button> */}
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


export default MTNNewOpportunities;
