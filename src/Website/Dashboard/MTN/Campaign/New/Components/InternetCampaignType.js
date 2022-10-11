import React, { useState, useEffect } from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const InternetCampaignType = (props) => {

    const { handleChangeInternet, selectedInternet } = props;
    const [ internetText, setInternetText] = useState('');

    useEffect(() => {
        switch (selectedInternet){
            case '1gig1day':
                setInternetText('بسته هدیه 1 گیگابایت  1 روزه ویژه ستاره اول');
                break;
            case '2gig1day':
                setInternetText('بسته هدیه 2 گیگابایت  1 روزه ویژه ستاره اول');
                break;
            case '3gig1day':
                setInternetText('بسته هدیه 3 گیگابایت  1 روزه ویژه ستاره اول');
                break;
            case '1500meg7day':
                setInternetText('بسته هدیه 1.5 گیگابایت  7 روزه ویژه ستاره اول');
                break;
            case '750meg7day':
                setInternetText('بسته هدیه 750 مگابایت  7 روزه ویژه ستاره اول');
                break;
            case '500meg1day':
                setInternetText('بسته هدیه 500 مگابایت  1 روزه ویژه ستاره اول');
                break;

        }
    }, [selectedInternet]);

    return(
        <>
            <FormControl className='customSelectOptionInRow'>
                <span className='inputLabel'>{selectedInternet === ''? 'نوع اینترنت را انتخاب کنید': internetText}</span>
                <Select
                    id="demo-simple-select"
                    value={selectedInternet}
                    onChange={handleChangeInternet} >
                    <MenuItem value='1gig1day'>بسته هدیه 1 گیگابایت  1 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='2gig1day'>بسته هدیه 2 گیگابایت  1 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='3gig1day'>بسته هدیه 3 گیگابایت  1 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='1500meg7day'>بسته هدیه 1.5 گیگابایت  7 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='750meg7day'>بسته هدیه 750 مگابایت  7 روزه ویژه ستاره اول</MenuItem>
                    <MenuItem value='500meg1day'>بسته هدیه 500 مگابایت  1 روزه ویژه ستاره اول</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

export default InternetCampaignType;