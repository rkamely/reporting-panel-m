import React, {useState, useEffect} from 'react';
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import LoadingBackDrop from '../../../../Container/Loading/LoadingBackdrop';
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
import InputWithIcon from "../../../../Container/InputWithLabel";
import Button from "@material-ui/core/Button";
import PriceFormat from '../../../../PriceFormat';
import { mtnCampaignUsed } from '../../../../APIRequest';
import MenuItem from "@material-ui/core/MenuItem";




const MTNCampaignUsedReport = () => {

    const [loadingData, setLoadingData] = useState(false);
    const [loadMoreLoading, setLoadMoreLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [expanded, setExpanded] = useState(null);
    const [errors, setErrors] = useState({});
    const [mobile, setMobile ] = useState('');
    const [ reportType, setReportType ] = useState(0);
    const [ list, setList ] = useState([]);
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

    const getCampaignList = async () => {
        setLoadingData(true);
        setNoDataToShow(false);
        mtnCampaignUsed(mobile, reportType, pageNumber)
            .then((res) => {
                if(res.data.content.length > 0){
                    setList(res.data.content);
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



    const handleChangeInput = (e, type) => {
 
        switch(type){
            case 'mobile':
                errors.mobile = '';
                setMobile(e.target.value);
                break;  
            case 'reportType':
                errors.reportType = '';
                if(e.target.value === 1){
                    setMobile('');
                }
                setReportType(e.target.value);
                break;        
        }
    }
    

    const handleSubmitForm = (e) => {    
        // FormValidation(campaignStatus)
        //     .then(() => getCampaignList())
        //     .catch((err) => {
        //         pushErrorSnack('error');
        //         setErrors(err)
        //     })
        getCampaignList();
    }

    const handleLoadMore = () => {
        setPageNumber(pageNumber + 1);
        setLoadMoreLoading(true);
    }
    
    return (
        <div className='mainPageContentFrame'>
            {loadingData ? <LoadingBackDrop/> : null}

        
            <DashboardSectionHeader title={FaStaticTexts.mtnCampaignUsedTitleTitle}
                                    icon={<FiLayers />} color='purpleGradiantBox'
                                    message={FaStaticTexts.mtnCampaignUsedTitleMessage}/>
            <div className='tableOfContentStyle'>
                <div className='dashboardFilterRegFrame'>
                    <div className='dashboardFrameColumnDirection'>
                        <div className='dashboardSectionInputsInRow'>
                            <div className='dashboardSectionInputsInRow'>
                                <FormControl className='customSelectOptionInRow'>
                                    <span className='inputLabel'>{reportType === 0? 'نوع گزارش':
                                        reportType === 1? 'شرکت کنندگان': reportType === 2? 'شماره خاص': 'همه'}</span>
                                    <Select
                                        id="demo-simple-select"
                                        value={reportType}
                                        onChange={(e) => handleChangeInput(e, 'reportType')}>
                                        <MenuItem value={1}>همه شرکت کنندگان</MenuItem>
                                        <MenuItem value={2}>شماره خاص</MenuItem>
                                    </Select>
                                    <span className="errorText"> {errors ? errors.reportType : null} </span>
                                </FormControl>
                                {
                                    reportType === 2?
                                    <InputWithIcon title='تلفن همراه ' inputType='text' handleChange={(e) => 
                                        setMobile(e.target.value)} value={mobile} maxLength={11} />: null
                                }
                            </div>
                        </div>
                    </div>
                    <Button className='applyFilterRegButton' onClick={handleSubmitForm}>
                        جستجو
                    </Button>
                    
                </div>
                {
                    list.length > 0?
                        <Hidden only={['sm', 'xs']}>
                            <div className='tableOfContentHeader'>
                                <ul>
                                    <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                                    <li style={{width: '40%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderTel}</li>
                                    <li style={{width: '30%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderDate}</li>
                                    <li style={{width: '20%'}}>{FaStaticTexts.mtnReportCampaignType}</li>
                                </ul>
                            </div>
                        </Hidden>: null
                }
                {
                    !noDataToShow?
                        list.map((item, index) =>
                            <div className='tableOfContentRow' key={index}>
                                <ul>
                                    <div className='fullWidth'>
                                        <div className='tableOfContentRowHeaderNotAccordion'>
                                            <div className='eachRowOfTableStyle'>
                                                    <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} text={index+1} />
                                                    <TableOfContentRowCell width='40%' title={FaStaticTexts.mtnReportCampaignChargeAmount} 
                                                        text={item.phone} isRtl={true} />
                                                    <TableOfContentRowCell width='30%' title={FaStaticTexts.mtnReportRowTitleOfHeaderDate}
                                                        text={moment(item.tmst.substr(0,11), 'YYYY/MM/DD')
                                                        .locale('fa').format('YYYY/MM/DD')} />

                                                    <TableOfContentRowCell width='20%' title={FaStaticTexts.mtnReportEndCampaignStatus} 
                                                    text={item.used === 1 ? <FiCheck className='successIcon' />: 
                                                        <BiX className='failedIcon' />} />     
                                            </div>
                                        </div>
                                    </div>
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
                    list.last?
                    <LoadMore title='موارد بیشتر' loading={loadMoreLoading}
                        loadMore={() => handleLoadMore()} />: null
                }
            </div>
        </div>
    )
}

export default MTNCampaignUsedReport;