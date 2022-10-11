import React from 'react';
import {MuiPickersUtilsProvider, TimePicker} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {AiOutlineClockCircle} from "react-icons/all";


const CustomTimePicker = (props) => {
    return(
        <div className='inputRowFrame customLabelAndInput timePickerFrameStyle'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                    className='inputPickerStyle'
                    onChange={props.handleChange}
                    okLabel='انتخاب'
                    cancelLabel='انصراف'
                />
                <AiOutlineClockCircle className='iconLabelOfInputStyle' />
                <div className='fakeLabelOnInput'>
                    {
                        props.value ?
                            props.value :
                            props.label
                    }
                </div>
            </MuiPickersUtilsProvider>
            <span className="errorText">{props.error ? props.error : null}</span>
        </div>
    )
}
export default CustomTimePicker;