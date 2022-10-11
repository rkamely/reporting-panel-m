import React from 'react';
import InputWithIcon from "../../../../../../Container/InputWithLabel";

const ScoreCampaignType = (props) => {

    const { handleChange, value } = props;
    return(
        <InputWithIcon
            title='میزان امتیاز' inputType='text' handleChange={handleChange} value={value} />
    )
}

export default ScoreCampaignType;