import React, {useState, useEffect} from 'react';
import '../../Styles/_mainStyles.scss';
import FaStaticTexts from "../../Constants/Fa/FaStatic";
import {FiCast} from "react-icons/all";
import ComponentSectionHeader from "../Header/ComponentSectionHeader/ComponentSectionHeader";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import TableOfContentRowCell from "../../Container/Table/TableOfContentRowCell";
import axios from 'axios';
import BaseURL from '../../BaseURL';
import EncodeUsername from '../../EncodeUsername';
import {ScaleLoader, BeatLoader} from "react-spinners";
import FormatDate from '../Date/FormatDate';
import PersianDatePicker from "../Dialog/PersianDatePicker";
import {AiOutlineCalendar} from "react-icons/all";
import {Button} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import APIRequest from '../../APIRequest';
import PriceFormat from '../../PriceFormat';


const GeneralSaleReportPie = () => {

    const [diagramData, setDiagramData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [noResult, setNoResult] = useState(false);
    const [selectDateError, setSelectDateError] = useState('');
    const [typesList, setTypesList] = useState([]);

    const {enqueueSnackbar} = useSnackbar();
    var qs = require('qs');

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

    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', {variant});
    }


    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        setSelectedDate(finalDate)
        setCalendarDialog(false);
    }

    const getDiagramsData = async () => {

        setNoResult(false);
        let baseURL = BaseURL();
        let encodedUserPass = EncodeUsername();

        await axios({
            method: 'POST',
            url: `${baseURL}MtnReport/generalsale`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedUserPass
            },
            data: qs.stringify({
                'repdate': selectedDate
            })
        })
            .then(response => {

                if (response.data.length === 0) {
                    setNoResult(true);
                } else {
                    let tempArray = response.data;
                    tempArray.map(resultItem => {
                        typesList.map(typeList => {
                            if (typeList.type === resultItem.type) {
                                resultItem['description'] = typeList.desc
                            }
                        });
                    });
                    setDiagramData(tempArray);

                }
                setLoadingData(false);
            })
            .catch((err) => {
                setDiagramData([]);
                console.log(err);
                setLoadingData(false);
            })
    };

    const handleSubmitForm = () => {

        if (selectedDate !== '') {
            setSelectDateError('');
            setLoadingData(true);
            getDiagramsData();
        } else {
            setSelectDateError('لطفا تاریخ را انتخاب کنید');
        }
    }

    function am4themes_myTheme(target) {
        if (target instanceof am4core.ColorSet) {
            target.list = [
                am4core.color("#00E676"),
                am4core.color("#F44336"),
                am4core.color("#26C6DA"),
                am4core.color("#850f99"),
                am4core.color("#3155ae"),
                am4core.color("#607D8B"),
                am4core.color("#F44336"),
                am4core.color("#9a64ff"),
                am4core.color("#FBC02D")
            ];
        }
    }

    // Themes begin
    am4core.useTheme(am4themes_myTheme);
    am4core.addLicense("");
    // Themes end

    var chart = am4core.create("chartdiv2", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.rtl = true;

    chart.data = diagramData;

    chart.innerRadius = am4core.percent(30);
    chart.depth = 80;

    chart.legend = new am4charts.Legend();
    chart.legend.fontSize = 10;

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "count";
    series.dataFields.depthValue = "count";
    series.dataFields.category = "description";
    series.slices.template.stroke = am4core.color("#fff");
    series.slices.template.strokeOpacity = 1;
    series.labels.template.fontSize = 10;
    series.tooltip.fontSize = 12;
    // series.labels.template. = '#ff0000'

    // This creates initial animation
    series.hiddenState.properties.opacity = 1;
    series.hiddenState.properties.endAngle = -90;
    series.hiddenState.properties.startAngle = -90;


    chart.hiddenState.properties.radius = am4core.percent(0);


    return (
        <div className='sectionComponentWithHeader'>
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                   formatDateFunc={(date) => formatDate(date)}/> : null
            }
            <ComponentSectionHeader title={FaStaticTexts.generalSaleChartTitle}
                                    message={FaStaticTexts.generalSaleChartMessage}
                                    icon={<FiCast/>} color='blueGradiantBox'/>

            <div className='dashboardFilterRegFrame'>
                <div className='dashboardFrameColumnDirection'>
                    <div className='dashboardSectionInputsInRow inRowFlexItems'>
                        <div className='datepickerInputFrame margin10'>
                            <AiOutlineCalendar className='inputIcon'/>
                            <input type='text' placeholder=' از تاریخ' className='datepickerInputStyle'
                                   value={selectedDate} onClick={() => {
                                setCalendarDialog(true)
                            }} onChange={() => {
                            }}/>
                            <span className="errorText"> {selectDateError ? selectDateError : null} </span>
                        </div>
                        <Button className='applyFilterRegButtonInRow' onClick={handleSubmitForm} disabled={loadingData}>
                            {
                                loadingData ?
                                    <BeatLoader
                                        size={9}
                                        color={"#fff"}
                                        loading={true}
                                    /> :
                                    'نمایش نمودار'
                            }
                        </Button>
                    </div>
                </div>

            </div>
            {
                !noResult ?
                    <>
                        <div id="chartdiv2" className='chartStyleFrame' style={{overflow: 'hidden'}}/>
                        <div className='tableOfContentStyle' style={{ marginTop: 50}}>
                            {
                                diagramData.length > 0?
                                <div className='tableOfContentHeader'>
                                    <ul>
                                        <li style={{width: '10%'}}>{FaStaticTexts.mtnReportRowTitleOfHeaderRow}</li>
                                        <li style={{width: '30%'}}>{FaStaticTexts.saleTypeText}</li>
                                        <li style={{width: '20%'}}>{FaStaticTexts.saleCountText}</li>
                                        <li style={{width: '40%'}}>{FaStaticTexts.saleVolumeText}</li>
                                    </ul>
                                </div>: null
                            }
                            {
                                diagramData.map((item, index) =>
                                    <div className='tableOfContentRow' key={index}>
                                        <ul>
                                            <div className='fullWidth'>
                                                <div className='tableOfContentRowHeaderNotAccordion'>
                                                    <div className='eachRowOfTableStyle'>
                                                        <TableOfContentRowCell width='10%' isRtl={true}
                                                                            title={FaStaticTexts.mtnReportRowTitleOfHeaderRow}
                                                                            text={index + 1}/>
                                                        <TableOfContentRowCell width='30%' isRtl={true}
                                                                            title={FaStaticTexts.saleTypeText}
                                                                            text={item.description === undefined?
                                                                            'سایر موارد': item.description}/>
                                                    
                                                        <TableOfContentRowCell width='20%' isRtl={true}
                                                                            title={FaStaticTexts.saleCountText}
                                                                            text={item.count}/>
                                                                            
                                                        <TableOfContentRowCell width='40%' isRtl={true} cellType='price'
                                                            title={FaStaticTexts.saleVolumeText}
                                                            text={PriceFormat(item.sale)}/>
                                                    
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </> :
                    <p className='simpleTextOnWhite'>
                        <div className="columnDirectionCenterAlign">
                            <img src={require('../../assets/images/icon/no_result_found.png')}
                                 alt="موردی یافت نشد"/>
                            <h2 className="notFoundTitle">هیچ موردی یافت نشد!</h2>
                        </div>
                    </p>
            }
        </div>
    )
}

export default GeneralSaleReportPie;