import React, {useEffect, useState} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const ChargeCampaignType = (props) => {

    const { handleChangeCharge, selectedCharge } = props;
    const [ chargeText, setChargeText ] = useState('');

    useEffect(() => {
        switch (selectedCharge) {
            case 'direct':
                setChargeText('شارژ مستقیم');
                break;
            case 'exclusive':
                setChargeText('شارژ فوق العاده');
                break;
            case 'young':
                setChargeText('شارژ جوانان');
                break;
            case 'women':
                setChargeText('شارژ بانوان');
                break;
            case 'loyal':
                setChargeText('شارژ وفاداری');
                break;

        }
    }, [selectedCharge])

    return(
        <>
            <FormControl className='customSelectOptionInRow'>
                <span className='inputLabel'>{selectedCharge === ''? 'نوع شارژ را انتخاب کنید': chargeText}</span>
                <Select
                    id="demo-simple-select"
                    value={selectedCharge}
                    onChange={handleChangeCharge} >
                    <MenuItem value='direct'>شارژ مستقیم</MenuItem>
                    <MenuItem value='exclusive'>شارژ فوق العاده</MenuItem>
                    <MenuItem value='young'>شارژ جوانان</MenuItem>
                    <MenuItem value='women'>شارژ بانوان</MenuItem>
                    <MenuItem value='loyal'>شارژ وفاداری</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default ChargeCampaignType;