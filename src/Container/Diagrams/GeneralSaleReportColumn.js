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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const GeneralSaleReportColumn = () => {

    const [diagramData, setDiagramData] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [noResult, setNoResult] = useState(false);
    const [typesList, setTypesList] = useState([]);
    const [ timePeriod, setTimePeriod ] = useState('');
    const [ calendarType, setCalendarType ] = useState('');
    const [ selectedDate, setSelectedDate] = useState('');
    const [ fromDate, setFromdate] = useState('');
    const [ toDate, setToDate] = useState('');

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
        enqueueSnackbar('???????? ???????????? ?????????????? ???? ????????!', {variant});
    }


    /********************* Set Selected Date Filter *********************/
    const formatDate = (dateValue) => {
        let finalDate = FormatDate(dateValue);
        if(calendarType === 'daily') {
            setSelectedDate(finalDate);
        }
        else if(calendarType === 'fromDate'){
            setFromdate(finalDate)
        }
        else if(calendarType === 'toDate'){
            setToDate(finalDate)
        }
        setCalendarDialog(false);
    }

    const handleDateInputClicked = (type) => {
        if(type === 'daily') {
            setCalendarType('daily');
        }
        if(type === 'fromDate'){
            setCalendarType('fromDate')
        }
        else if(type === 'toDate'){
            setCalendarType('toDate')
        }
        setCalendarDialog(true);
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
                'repstdate': timePeriod === 'daily'? selectedDate: fromDate,
                'rependdate': timePeriod === 'daily'? selectedDate: toDate
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
        setLoadingData(true);
        getDiagramsData();
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

    // Create chart instance
    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    // chart.scrollbarX = new am4core.Scrollbar();

    // Add data
    chart.data = diagramData

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "description";
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.renderer.labels.template.rotation = 270;
    // categoryAxis.tooltip.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    // series.sequencedInterpolation = true;
    series.dataFields.valueY = "sale";
    series.dataFields.categoryX = "description";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    

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
                    <div className='dashboardSectionInputsInRow inRowFlexItemsSpaceBetween'>
                        <div className="inRowFlexItems">
                            <FormControl className='customSelectOptionInRow'>
                                <span className='inputLabel'>{timePeriod === ''? '???????????? ???????? ??????????':
                                    timePeriod === 'daily'? '???????????? ??????': '???????? ??????????'}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={timePeriod}
                                    onChange={(e) => setTimePeriod(e.target.value)}>
                                    <MenuItem value='' disabled={true}>?????? ??????????</MenuItem>
                                    <MenuItem value='daily'>???????????? ??????</MenuItem>
                                    <MenuItem value='timePeriod'>???????? ??????????</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                timePeriod === 'daily'?
                                <div className='datepickerInputFrameFixedWidth margin10'>
                                    <AiOutlineCalendar className='inputIcon' />
                                    <input type='text' placeholder='??????????' className='datepickerInputStyle'
                                            value={selectedDate} onClick={() => handleDateInputClicked('daily')}
                                            onChange={() => console.log('daily')} />
                                </div>:
                                timePeriod === 'timePeriod'?
                                <>
                                    <div className='datepickerInputFrameFixedWidth margin10'>
                                        <AiOutlineCalendar className='inputIcon' />
                                        <input type='text' placeholder='???? ??????????' className='datepickerInputStyle'
                                                value={fromDate} onClick={() => handleDateInputClicked('fromDate')}
                                                 onChange={() => {}} />
                                    </div>
                                    <div className='datepickerInputFrameFixedWidth margin10'>
                                        <AiOutlineCalendar className='inputIcon' />
                                        <input type='text' placeholder='???? ??????????' className='datepickerInputStyle'
                                                value={toDate} onClick={() => handleDateInputClicked('toDate')}
                                                 onChange={() => {}} />
                                    </div>
                                </>: null
                            } 
                            {
                                timePeriod !== ''?
                                <Button className='applyFilterRegButtonInRow' onClick={handleSubmitForm} 
                                    disabled={loadingData}>
                                    {
                                        loadingData?
                                        <BeatLoader
                                            size={9}
                                            color={"#fff"}
                                            loading={true}
                                        />:
                                        '?????????? ????????????'
                                    }
                                </Button>: null
                            }
                        </div>
                    
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
                                                                            '???????? ??????????': item.description}/>
                                                    
                                                        <TableOfContentRowCell width='20%' isRtl={true}
                                                                            title={FaStaticTexts.saleCountText}
                                                                            text={PriceFormat(item.count)}/>
                                                                            
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
                                 alt="?????????? ???????? ??????"/>
                            <h2 className="notFoundTitle">?????? ?????????? ???????? ??????!</h2>
                        </div>
                    </p>
            }
            {
                loadingData?
                <div className='loadingFrameOnChart'>
                    <ScaleLoader
                        size={9}
                        color={"#00c4ff"}
                        loading={true}
                    />
                </div>:
                null
            }
        </div>
    )
}

export default GeneralSaleReportColumn;