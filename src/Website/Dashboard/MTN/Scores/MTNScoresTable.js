import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { BiX, FiCheck, IoMdMedal, HiPencil} from "react-icons/all";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import Hidden from "@material-ui/core/Hidden";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import moment from 'jalali-moment';
import APIRequest from '../../../../APIRequest';
import { useSnackbar } from 'notistack';
import LoadMore from '../../../../Container/Button/LoadMore';
import EditDialog from './EditDialog';
import axios from 'axios';
import EncodeUsername from '../../../../EncodeUsername';
import BaseURL from '../../../../BaseURL';


const MTNScoresList = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [editScoreDialog, setEditScoreDialog] = useState(false);
    const [scoreList, setScoreList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedRowScoreValue, setSelectedRowScoreValue] = useState(null);
    const [selectedRowScoreType, setSelectedRowScoreType] = useState(null);
    const [ editLoading, setEditLoading ] = useState(false);

    var qs = require('qs');
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        getScoresListFromAPI();
    }, []);

    const pushSuccessSnack = (variant) => {
        enqueueSnackbar('لیست اطلاعات دریافت شد', { variant });
    }
    const pushSuccessEditSnack = (variant) => {
        enqueueSnackbar('ویرایش اطلاعات با موفقیت انجام شد', { variant });
    }
    
    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getScoresListFromAPI = async () => {

        setLoadingData(true);
        APIRequest('GET_SCORES_TABLE', 'POST', 'MtnReport/scoreboard', null, null, null, pageNumber)
        .then(response => {
            setScoreList(response.data.content);
            setLoadingData(false);
            pushSuccessSnack('success');
        })
        .catch(() => pushErrorSnack('error'))
    }

    const handleEditClick = (id, type) => {
        setSelectedRowScoreValue(parseFloat(id));
        setSelectedRowScoreType(type);
        setEditScoreDialog(true);
    }

    const handleEditApplied = async(newValue) => {

        setEditLoading(true);
        let encodedUserPass = await EncodeUsername();
        let baseURL = BaseURL();

        await axios({
            method: 'POST',
            url: `${baseURL}MtnReport/updatescoreboard`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ encodedUserPass
            },
            data: qs.stringify({
                'type': selectedRowScoreType,
                'scorepercent': parseFloat(newValue),
   
            })
        })
        .then(() => {
            setLoadingData(false);
            setEditLoading(false);
            setEditScoreDialog(false);
            getScoresListFromAPI();
            pushSuccessEditSnack('success');
        })
        .catch((err) => {
            pushErrorSnack('error')
            console.log(err)})
    }

    return (
        <div className='mainPageContentFrame'>
            { loadingData? <LoadingBackDrop />: null }
            {editScoreDialog ?
                <EditDialog openDialog={editScoreDialog} closeDialog={() => setEditScoreDialog(false)} 
                    dialogTitle="ویرایش میزان امتیاز" defaultValue={selectedRowScoreValue}
                    defaultType={selectedRowScoreType} propsHasChanged={(value) => handleEditApplied(value)} 
                    loading={editLoading} /> : null
            }
            <DashboardSectionHeader title={FaStaticTexts.mtnScoreTableColorSectionTitle} icon={<IoMdMedal />}
                 color='greenGradiantBox' message={FaStaticTexts.mtnScoreTableColorSectionMessage} />
            <div className='tableOfContentStyle'>
                <Hidden only={['sm', 'xs']}>
                    <div className='tableOfContentHeader'>
                        <ul>
                            <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                            <li style={{width: '15%'}}>{FaStaticTexts.mtnFromDate}</li>
                            <li style={{width: '15%'}}>{FaStaticTexts.mtnToDate}</li>
                            <li style={{width: '15%'}}>{FaStaticTexts.mtnSubscriberScorePercentTitle}</li>
                            <li style={{width: '15%'}}>{FaStaticTexts.mtnSubscriberScoreAmountTitle}</li>
                            <li style={{width: '15%'}}>{FaStaticTexts.itemStatus}</li>
                            <li style={{width: '15%'}}>{FaStaticTexts.edit}</li>
                        </ul>
                    </div>
                </Hidden>
                {
                    scoreList.map((item, index) =>
                    <div className='tableOfContentRow' key={index}>
                        <ul>
                            <div className='fullWidth'>
                                <div className='tableOfContentRowHeaderNotAccordion'>
                                    <div className='eachRowOfTableStyle'>
                                        <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} text={index+1} />
                                        <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnFromDate}
                                            text={moment(item.starttmst.substr(0,11), 'YYYY/MM/DD')
                                            .locale('fa').format('YYYY/MM/DD')} />
                                        <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnToDate}
                                            text={moment(item.endtmst.substr(0,11), 'YYYY/MM/DD')
                                            .locale('fa').format('YYYY/MM/DD')} />
                                        <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnSubscriberScorePercentTitle}
                                            text={item.scorepercent} />
                                        <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnSubscriberScoreAmountTitle}
                                            text={item.amount} />
                                
                                        <TableOfContentRowCell width='15%' title={FaStaticTexts.mtnReportEndCampaignStatus} 
                                            text={item.enabled === 1 ? <FiCheck className='successIcon' />
                                            : <BiX className='failedIcon' />} />
                                        
                                        <li className='tableOfContentRowCell'
                                            style={{width: '15%' }}>
                                                <Hidden only={['xl','lg', 'md']}>
                                                    <span className='inMobileLabelTitle'>
                                                        {FaStaticTexts.mtnReportEndCampaignEdit}:
                                                    </span>
                                                </Hidden>
                                            <HiPencil className='editIcon' onClick={() => 
                                                handleEditClick(item.scorepercent, item.type)} />
                                        </li>
                                    
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                    )
                }
            
            </div>
        </div>
    )
}

export default connect()(MTNScoresList);
