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
import InputWithIcon from '../../../../Container/InputWithLabel';
import { useSnackbar } from 'notistack';
import {FiAperture} from 'react-icons/fi';
import FormatDate from '../../../../Container/Date/FormatDate';
import FormValidation from './FormValidation';


const MTNOpportunitiesList = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [reportList, setReportList] = useState([]);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [calenderType, setCalendarType] = useState('fromDate');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [justDate, setJustDate] = useState('');
    const [errors, setErrors] = useState({});
    const [ maxChance, setMaxChance ] = useState('');
    const [ dayliMaxChance, setDayliMaxChance] = useState('');

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
                    chanceName: '???????? ?????? ??????????????',
                    fromDate: '98/04/12',
                    toDate: '99/04/12',
                    fromTime: '00:00',
                    toTime: '23:59',
                    maxChance: 5000,
                    maxDayliChance: 5
                },
                {
                    chanceName: '?????? ????????????????',
                    fromDate: '98/01/01',
                    toDate: '98/12/30',
                    fromTime: '00:00',
                    toTime: '23:59',
                    maxChance: 2000000,
                    maxDayliChance: 3
                },
                {
                    chanceName: '10 ???????????? ?????? ??????????',
                    fromDate: '99/01/01',
                    toDate: '99/01/13',
                    fromTime: '00:00',
                    toTime: '23:59',
                    maxChance: 5000000,
                    maxDayliChance: 5
                }
            ]);
            setLoadingData(false);
            enqueueSnackbar('???????? ?????????????? ???????????? ????!', { variant });
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

    const setErrorSnack = (variant) => {
        enqueueSnackbar('???????? ?????????? ???????????? ?????? ???? ???????? ????????????', { variant });
    }

    const handleSubmitForm = (e) => {
        FormValidation('maxChance', 'dayliMaxChance', fromDate, toDate)
            .then(() => getReportData('success'))
            .catch((err) => {
                setErrorSnack('error');
                setErrors(err)
            })
    }
    

    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

            {/***************** Open Calendar to Select Date *******************/}
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }

            <DashboardSectionHeader title={FaStaticTexts.mtnOpportunityListColorSectionTitle}
                                    icon={<FiAperture/>} color='blueGradiantBox'
                                    message={FaStaticTexts.mtnOpportunityListColorSectionMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRowNoWrap inRowFlexItemsSpaceBetween'>
                            <InputWithIcon
                                title='???????????? ?????????? ????????' inputType='text' handleChange={(e) => handleChangeInput(e, 'maxChance')}
                                errors={errors.maxChance} value={maxChance} />
                            <InputWithIcon
                                title='???????????? ????????????' inputType='text' handleChange={(e) => handleChangeInput(e, 'dayliMaxChance')}
                                errors={errors.dayliMaxChance} value={dayliMaxChance} />
                            <div className='datepickerInputFrame'>
                                <AiOutlineCalendar className='inputIcon' />
                                <input type='text' placeholder=' ???? ??????????' className='datepickerInputStyle'
                                    value={fromDate} onClick={(e) => handleChangeInput(e, 'fromDate')}/>
                                <span className="errorText"> {errors ? errors.fromDate : null} </span>
                            </div> 
                            <div className='datepickerInputFrame'>
                                <AiOutlineCalendar className='inputIcon' />
                                <input type='text' placeholder='???? ??????????' className='datepickerInputStyle'
                                    value={toDate} onClick={(e) => handleChangeInput(e, 'toDate')}/>
                                <span className="errorText"> {errors ? errors.toDate : null} </span>
                            </div> 
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={(e) => handleSubmitForm(e)}>
                        ??????????
                    </Button>
                </div>
                {
                    reportList.length > 0 ?
                        <Hidden only={['sm', 'xs']}>
                            <div className='tableOfContentHeader'>
                                <ul>
                                    <li style={{width: '50%'}}>????????</li>
                                    <li style={{width: '25%'}}>???? ??????????</li>
                                    <li style={{width: '25%'}}>???? ??????????</li>
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
                                            <TableOfContentRowCell width='50%'
                                                                   title='????????'
                                                                   text={item.chanceName}/>
                                            <TableOfContentRowCell width='25%'
                                                                   title='???? ??????????'
                                                                   text={item.fromDate}/>
                                            <TableOfContentRowCell width='25%'
                                                                   title='???? ??????????'
                                                                   text={item.toDate}/>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className='tableOfContentDetailFrame'>
                                        <ul className='detailFrame'>
                                            {/* <h6>{FaStaticTexts.mtnReportRowTitleOfHeaderTime}: {item.fromTime}</h6>
                                            <span className='inRowFlexItems'>???????????? ????:{ReportBank(item.bank)}</span> */}
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

export default MTNOpportunitiesList;