import React, {useEffect, useState} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const ChanceCampaignType = (props) => {

    const { handleChange, selectedChance } = props;
    const [ chanceText, setChanceText ] = useState('');
    const [ lotteryList, setLotteryList ] = useState([]);

    useEffect(() => {
        switch (selectedChance) {
            case '206Car':
                setChanceText('پژو 206');
                break;
            case 'galaxyPhone':
                setChanceText('گوشی هوشمند سامسونگ');
                break;
            case '50million':
                setChanceText('20 جایزه 50 میلیون تومانی');
                break;

        }
    }, [selectedChance]);

    useEffect(() => {
        setLotteryList([
            {
                id: 0,
                title: 'پژو 206',
                value: '206Car'
            },
            {
                id: 1,
                title: 'گوشی هوشمند سامسونگ',
                value: 'galaxyPhone'
            },
            {
                id: 2,
                title: '20 جایزه 50 میلیون تومانی',
                value: '50million'
            }
        ])
    }, [])

    return(
        <>
            <FormControl className='customSelectOptionInRow'>
                <span className='inputLabel'>{selectedChance === ''? 'قرعه کشی را انتخاب کنید': chanceText}</span>
                <Select
                    id="demo-simple-select"
                    value={selectedChance}
                    onChange={handleChange} >
                    {
                        lotteryList.map((item, index) => <MenuItem key={index} value={item.value}>{item.title}</MenuItem>)
                    }
                </Select>
            </FormControl>
        </>
    )
}

export default ChanceCampaignType;