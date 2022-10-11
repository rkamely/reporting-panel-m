import React from 'react';
import { Input } from "@material-ui/core";
import '../Website/Dashboard/Dashboard.scss';
import PriceFormat from "../PriceFormat";

const InputWithIcon = (props) => {
    const { title, inputType, handleChange, errors, value, isPrice, maxLength } = props;
    return (
        <div className='customLabelAndInput'>
            {/* <label htmlFor={title}>
                {title}
            </label> */}
            <div className='inputWithError'>
                <input
                    type={inputType}
                    id={title}
                    name='campaignName'
                    className={isPrice ? 'inputPriceStyleFrame' : 'inputTextStyleFrame'}
                    placeholder={title}
                    value={isPrice ? PriceFormat(value) : value}
                    onChange={handleChange}
                    maxLength={maxLength}
                />
                <span> {errors ? errors : null} </span>
            </div>
            {
                isPrice ? <div className='disabledLabel'>{props.disableLabel}</div> : null
            }
        </div>
    )
}

export default InputWithIcon;