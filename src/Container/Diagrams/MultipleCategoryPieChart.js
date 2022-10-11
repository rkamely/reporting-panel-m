import React, { useState, useEffect } from 'react';
import '../../Styles/_mainStyles.scss';
import FaStaticTexts from "../../Constants/Fa/FaStatic";
import {AiOutlinePieChart, RiFileExcel2Line} from "react-icons/all";
import ComponentSectionHeader from "../Header/ComponentSectionHeader/ComponentSectionHeader";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import BaseURL from '../../BaseURL';
import EncodeUsername from '../../EncodeUsername';
import axios from 'axios';
import {ScaleLoader, BeatLoader} from "react-spinners";
import FormatDate from '../../Container/Date/FormatDate';
import PersianDatePicker from "../../Container/Dialog/PersianDatePicker";
import { AiOutlineCalendar } from "react-icons/all";
import {Button} from '@material-ui/core';
import CsvDownload from 'react-json-to-csv';
import moment from 'jalali-moment';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PriceFormat from '../../PriceFormat';


var qs = require('qs');

const MultipleCategoryPieChart = () => {
    

    const [ diagramData, setDiagramData ] = useState([]);
    const [ excelData, setExcelData ] = useState([]);
    const [ loadingData, setLoadingData ] = useState(false);
    const [calendarDialog, setCalendarDialog] = useState(false);
    const [ noResult, setNoResult] = useState(false);
    const [errors, setErrors] = useState({});
    const [selectDateError, setSelectDateError] = useState('');
    const [fromDateError, setFromDateError] = useState('');
    const [toDateError, setToDateError] = useState('');
    const [ timePeriod, setTimePeriod ] = useState('');
    const [ calendarType, setCalendarType ] = useState('');
    const [ selectedDate, setSelectedDate] = useState('');
    const [ fromDate, setFromdate] = useState('');
    const [ toDate, setToDate] = useState('');
    const [ wholeSale, setWholeSale ] = useState(null);

    useEffect(() => {
        setSelectedDate();
        // getDiagramsData(moment().locale('fa').format('YYYY/MM/DD'));
    }, []);


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
    
    const getDiagramsData = async (date) => {

        setNoResult(false);
        let baseURL = BaseURL();
        let encodedUserPass = EncodeUsername();

        await axios({
            method: 'POST',
            url: `${baseURL}MtnReport/dash`,
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
            let wholeSale = response.data.reduce((accumulator, current) => accumulator + current.sales, 0);
            setWholeSale(wholeSale);
            setDiagramData(response.data);
            setLoadingData(false);
            generateExcelData(response.data);
        })
        .catch((err) => {
            setDiagramData([]);
            console.log(err);
            setLoadingData(false);
        })
    };
    
    const generateExcelData = (data) => {
        var dataForExcel = JSON.parse(JSON.stringify(data));
        dataForExcel.map(obj => {
            if(obj.operator === 'ایرانسل'){
                obj.operator = 'MTN'
            }
            else if(obj.operator === 'همراه اول'){
                obj.operator = 'MCI'
            }
        });
        setExcelData(dataForExcel);
    }
    
    
    const handleSubmitForm = () => {
        if(selectedDate !== ''){
            setSelectDateError('');
            setLoadingData(true);
            getDiagramsData(selectedDate);
        }
        else{
            setSelectDateError('لطفا تاریخ را انتخاب کنید');
        }
    }


    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribution");

    var container = am4core.create("chartDiv1", am4core.Container);
    container.rtl = true;

    container.width = am4core.percent(100);
    container.height = am4core.percent(100);
    container.layout = "horizontal";


    var chart = container.createChild(am4charts.PieChart);
    chart.rtl = true;

    chart.data = diagramData;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "sales" +
        "";
    pieSeries.dataFields.category = "operator";
    pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
    pieSeries.slices.template.propertyFields.fill = "color";
    pieSeries.slices.template.events.on("hit", function(event) {
        selectSlice(event.target.dataItem);
    });

    var chart2 = container.createChild(am4charts.PieChart);
    chart2.rtl = true;
    chart2.width = am4core.percent(30);
    chart2.radius = am4core.percent(80);

    var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
    pieSeries2.dataFields.value = "value";
    pieSeries2.dataFields.category = "name";
    pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
    pieSeries2.labels.template.disabled = true;
    pieSeries2.ticks.template.disabled = true;
    pieSeries2.alignLabels = false;
    pieSeries2.slices.template.propertyFields.fill = "color";
    pieSeries2.events.on("positionchanged", updateLines);

    var interfaceColors = new am4core.InterfaceColorSet();
    interfaceColors.rtl = true;

    var line1 = container.createChild(am4core.Line);
    line1.rtl = true;

    line1.strokeDasharray = "2,2";
    line1.strokeOpacity = 0.5;
    line1.stroke = interfaceColors.getFor("alternativeBackground");
    line1.isMeasured = false;

    var line2 = container.createChild(am4core.Line);
    line2.rtl = true;
    line2.strokeDasharray = "2,2";
    line2.strokeOpacity = 0.5;
    line2.stroke = interfaceColors.getFor("alternativeBackground");
    line2.isMeasured = false;

    var selectedSlice;

    function selectSlice(dataItem) {

        if (dataItem !== undefined){
            selectedSlice = dataItem.slice;
            var fill = selectedSlice.fill;
            var count = dataItem.dataContext.subData.length;
            pieSeries2.colors.list = [];
            for (var i = 0; i < count; i++) {
                pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
            }

            chart2.data = dataItem.dataContext.subData;
            pieSeries2.appear();

            var middleAngle = selectedSlice.middleAngle;
            var firstAngle = pieSeries.slices.getIndex(0).startAngle;
            var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
            animation.events.on("animationprogress", updateLines);

            selectedSlice.events.on("transformed", updateLines);
        }
    }


    function updateLines() {
        if (selectedSlice) {
            var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
            var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

            p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
            p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

            var p21 = { x: 0, y: -pieSeries2.pixelRadius };
            var p22 = { x: 0, y: pieSeries2.pixelRadius };

            p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
            p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

            line1.x1 = p11.x;
            line1.x2 = p21.x;
            line1.y1 = p11.y;
            line1.y2 = p21.y;

            line2.x1 = p12.x;
            line2.x2 = p22.x;
            line2.y1 = p12.y;
            line2.y2 = p22.y;
        }
    }

    chart.events.on("datavalidated", function() {
        setTimeout(function() {
            selectSlice(pieSeries.dataItems.getIndex(0));
        }, 1000);
    });


    return (
        <div className='sectionComponentWithHeader'>
            {calendarDialog ?
                <PersianDatePicker openDialog={calendarDialog} closeDialog={() => setCalendarDialog(false)}
                                formatDateFunc={(date) => formatDate(date)}/> : null
            }
            <ComponentSectionHeader title={FaStaticTexts.multipleCategoryPieChartTitle}
                                    message={FaStaticTexts.multipleCategoryPieChartMessage}
                                    icon={<AiOutlinePieChart/>} color='blueGradiantBox'/>

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
                                <span className="errorText"> {errors ? errors.giftStatus : null} </span>
                            </FormControl>
                            {
                                timePeriod === 'daily'?
                                <div className='datepickerInputFrameFixedWidth margin10'>
                                    <AiOutlineCalendar className='inputIcon' />
                                    <input type='text' placeholder='تاریخ' className='datepickerInputStyle'
                                            value={selectedDate} onClick={() => handleDateInputClicked('daily')}
                                            onChange={() => console.log('daily')} />
                                    <span className="errorText"> {selectDateError ? selectDateError : null} </span>
                                </div>:
                                timePeriod === 'timePeriod'?
                                <>
                                    <div className='datepickerInputFrameFixedWidth margin10'>
                                        <AiOutlineCalendar className='inputIcon' />
                                        <input type='text' placeholder='از تاریخ' className='datepickerInputStyle'
                                                value={fromDate} onClick={() => handleDateInputClicked('fromDate')}
                                                 onChange={() => {}} />
                                        <span className="errorText"> {fromDateError ? fromDateError : null} </span>
                                    </div>
                                    <div className='datepickerInputFrameFixedWidth margin10'>
                                        <AiOutlineCalendar className='inputIcon' />
                                        <input type='text' placeholder='تا تاریخ' className='datepickerInputStyle'
                                                value={toDate} onClick={() => handleDateInputClicked('toDate')}
                                                 onChange={() => {}} />
                                        <span className="errorText"> {toDateError ? toDateError : null} </span>
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
                        {
                            excelData.length !== 0?
                            <CsvDownload data={excelData} className="generateExcelButton">
                                <RiFileExcel2Line /> دانلود فایل
                            </CsvDownload>: null
                        }
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
                !noResult && !loadingData?
                <div className='columnDirectionCenterAlign'>
                    <div id="chartDiv1" className='chartStyleFrame'/>
                    {
                        wholeSale !== null && !loadingData?
                        <h3 className='wholeSaleTitle'>{PriceFormat(wholeSale)} ریال</h3>: null
                    }
                </div>:
                <div className="columnDirectionCenterAlign">
                    <img src={require('../../assets/images/icon/no_result_found.png')} 
                        alt="موردی یافت نشد" />
                    <h2 className="notFoundTitle">هیچ موردی یافت نشد!</h2>
                </div>
            }
            
        </div>
    )
}

export default MultipleCategoryPieChart;