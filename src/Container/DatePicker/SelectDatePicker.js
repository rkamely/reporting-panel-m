import React, {Component} from 'react';
import momentJalaali from 'moment-jalaali';
import {Calendar} from 'react-datepicker2';
import '../../Styles/_mainStyles.scss'


class SelectDatePicker extends Component {

    state = {
        selectedValue: momentJalaali(),
        defaultDate: null,
        isGregorian: false
    };

    componentDidMount() {
        try{
            var customizedDate = this.props.defaultDate;
            customizedDate = customizedDate.replace(/-/g, '/');
        }
        catch{
            console.log('ERROR');
        }
        if (this.props.defaultDate !== '') {
            this.setState({
                defaultDate: customizedDate
            })
        }
    }

    // enabledRange = {
    //     min: momentJalaali().startOf('month'),
    //     max: momentJalaali().endOf('month')
    // };

    // disabledRanges = [
    //     {
    //         disabled: true,
    //         start: momentJalaali().add(-99999999, 'days'),
    //         end: momentJalaali().add(-1, 'days')
    //     },
    // ];

    static getCustomFormat(inputValue, isGregorian) {
        if (!inputValue)
            return '';
        const inputFormat = isGregorian ? 'YYYY/MM/DD' : 'jYYYY/jMM/jDD';
        return isGregorian ? inputValue.locale('es').format(inputFormat) :
            inputValue.locale('fa').format(inputFormat);
    }

    render() {
        return (

            <div className='datepickerFrameStyle'>
                <Calendar
                    className='datepickerStyle'
                    // min={this.enabledRange.min}
                    // max={this.enabledRange.max}
                    value={this.state.value}
                    isGregorian={false}
                    onChange={value => this.props.changeDate(value)}
                />

            </div>
        )
    }
}

export default SelectDatePicker;
