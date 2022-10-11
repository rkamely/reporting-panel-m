import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import '../Dashboard.scss';
import MultipleCategoryPieChart from "../../../Container/Diagrams/MultipleCategoryPieChart";
import QuickAccessBox from "./QuickAccessBox";
import FaStaticTexts from "../../../Constants/Fa/FaStatic";
import {AiOutlineGift, AiOutlineUser, BiAlarm, FiAperture} from "react-icons/all";
import PriceFormat from "../../../PriceFormat";
import ColumnErrorReportGraph from "../../../Container/Diagrams/ColumnErrorReportGraph";


const Dashboard = () => {

    const [ diagram1, setDiagram1] = useState(null);
    const [ diagram2, setDiagram2] = useState(null);
    useEffect(() => {
        setDiagram1(<MultipleCategoryPieChart />);
        setDiagram2(<ColumnErrorReportGraph />);
    }, []);

    return (
        <div className='transparentDashboardContentFrame'>
            <div className='dashQuickAccessBoxes'>
                <ul>
                    <QuickAccessBox title={FaStaticTexts.activeCampaignQuickAccess} color='orangeGradiantBox'
                                    icon={<BiAlarm/>} message={`${12}${FaStaticTexts.campaignText}`}/>
                    <QuickAccessBox title={FaStaticTexts.lotteryText} color='redGradiantBox'
                                    icon={<FiAperture/>} message={8}/>
                    <QuickAccessBox title={FaStaticTexts.allPricesText} color='blueGradiantBox'
                                    icon={<AiOutlineGift/>} message={`${PriceFormat(128260000)} ریال`}/>
                    <QuickAccessBox title={FaStaticTexts.accessLevelText} color='greenGradiantBox'
                                    icon={<AiOutlineUser/>} message='مدیر ارشد'/>
                </ul>
            </div>
            {/*<div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>*/}
            {/*    {diagram2}*/}
            {/*</div>*/}
            {/*<div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>*/}
            {/*    {diagram1}*/}
            {/*</div>*/}
        </div>
    )
}

export default connect()(Dashboard);
