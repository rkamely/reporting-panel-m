import React, {useEffect, useState} from 'react';
import ComponentSectionHeader from "../../../../../Container/Header/ComponentSectionHeader/ComponentSectionHeader";
import FaStaticTexts from "../../../../../Constants/Fa/FaStatic";
import {AiOutlineCalendar} from "react-icons/all";
import {FiCast} from "react-icons/all";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import {FiZap} from "react-icons/all";
import PriceFormat from "../../../../../PriceFormat";
import PersianDatePicker from "../../../../../Container/Dialog/PersianDatePicker";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {ScaleLoader, BeatLoader} from "react-spinners";
import { useSnackbar } from 'notistack';
import FormatDate from '../../../../../Container/Date/FormatDate';
import EncodeUsername from '../../../../../EncodeUsername';
import BaseURL from '../../../../../BaseURL';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


var qs = require('qs');

const MTNErrorReport = () => {

    const [ diagramData, setDiagramData ] = useState([]);
    const [ loadingData, setLoadingData ] = useState(false);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [ noResult, setNoResult] = useState(false);
    const [selectDateError, setSelectDateError] = useState('');
    const [ timePeriod, setTimePeriod ] = useState('');
    const [ calendarType, setCalendarType ] = useState('');
    const [ selectedDate, setSelectedDate] = useState('');
    const [ fromDate, setFromdate] = useState('');
    const [ toDate, setToDate] = useState('');



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

        console.log('Selected'+ selectedDate);
        console.log('Selected'+ selectedDate);

        await axios({
            method: 'POST',
            url: `${baseURL}MtnReport/dasherror`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ encodedUserPass
            },
            data: qs.stringify({
                'repstdate': timePeriod === 'daily'? selectedDate: fromDate,
                'rependdate': timePeriod === 'daily'? selectedDate: toDate
            })
        })
        .then(response => {
        
            if(response.data.length === 0){
                setNoResult(true);
            }
            else{
                let filteredArray = [];
                filteredArray = response.data.filter(item => item.count !== "1");
                setDiagramData(filteredArray);
    
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
        // if(selectedDate !== ''){
        //     setSelectDateError('');
        //     setLoadingData(true);
        //     getDiagramsData();
        // }
        // else{
        //     setSelectDateError('لطفا تاریخ را انتخاب کنید');
        // }
    }
    
    // Themes begin
    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");
    // Themes end

    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = diagramData;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "error";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.tooltipText = "{description}";
    categoryAxis.tooltip.label.fontSize = 12;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.grid.template.disabled = true;


    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "error";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;


    series.columns.template.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();

    /* Configure cursor lines */
    chart.cursor.lineX.stroke = am4core.color("#8F3985");
    chart.cursor.lineX.strokeWidth = 0;
    chart.cursor.lineX.strokeOpacity = 0.2;

    chart.cursor.lineY.stroke = am4core.color("#8F3985");
    chart.cursor.lineY.strokeWidth = 0;
    

    return (
        <div className='mainPageContentFrame'>
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                formatDateFunc={(date) => formatDate(date)}/> : null
            }
             <ComponentSectionHeader title={FaStaticTexts.faultsChartTitle}
                                    message={FaStaticTexts.faultsChartMessage}
                                    icon={<FiZap/>} color='redGradiantBox'/>

            <div className='dashboardFilterRegFrame'>
                
            <div className='dashboardFrameColumnDirection'>
                    <div className='dashboardSectionInputsInRow inRowFlexItemsSpaceBetween'>
                        <div className="inRowFlexItems">
                            <FormControl className='customSelectOptionInRow'>
                                <span className='inputLabel'>{timePeriod === ''? 'انتخاب بازه زمانی':
                                    timePeriod === 'daily'? 'انتخاب روز': 'بازه زمانی'}</span>
                                <Select
                                    id="demo-simple-select"
                                    value={timePeriod}
                                    onChange={(e) => setTimePeriod(e.target.value)}>
                                    <MenuItem value='' disabled={true}>نوع تاریخ</MenuItem>
                                    <MenuItem value='daily'>انتخاب روز</MenuItem>
                                    <MenuItem value='timePeriod'>بازه زمانی</MenuItem>
                                </Select>
                            </FormControl>
                            {
                                timePeriod === 'daily'?
                                <div className='datepickerInputFrameFixedWidth margin10'>
                                    <AiOutlineCalendar className='inputIcon' />
                                    <input type='text' placeholder='تاریخ' className='datepickerInputStyle'
                                            value={selectedDate} onClick={() => handleDateInputClicked('daily')}
                                            onChange={() => console.log('daily')} />
                                </div>:
                                timePeriod === 'timePeriod'?
                                <>
                                    <div className='datepickerInputFrameFixedWidth margin10'>
                                        <AiOutlineCalendar className='inputIcon' />
                                        <input type='text' placeholder='از تاریخ' className='datepickerInputStyle'
                                                value={fromDate} onClick={() => handleDateInputClicked('fromDate')}
                                                 onChange={() => {}} />
                                    </div>
                                    <div className='datepickerInputFrameFixedWidth margin10'>
                                        <AiOutlineCalendar className='inputIcon' />
                                        <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
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
                                        'نمایش نمودار'
                                        // <AiOutlineSearch name='AiOutlineSearch' />
                                    }
                                </Button>: null
                            }
                        </div>
        
                    </div>
                </div>

            </div>
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
            {
                !noResult?
                <div id="chartdiv" className='chartStyleFrame'/>:
                <p className='simpleTextOnWhite'>
                    <div className="columnDirectionCenterAlign">
                        <img src={require('../../../../../assets/images/icon/no_result_found.png')} 
                            alt="موردی یافت نشد" />
                        <h2 className="notFoundTitle">هیچ موردی یافت نشد!</h2>
                    </div>
                </p>
            }
        </div>
    )
}

export default MTNErrorReport;