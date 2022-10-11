import React from 'react';
import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import { RiGroupLine } from "react-icons/all";




const MTNIntroduceFriendsReport = () => {
    return (
        <div className='mainPageContentFrame'>
            <DashboardSectionHeader title={FaStaticTexts.mtnIntColorSectionTitle} icon={<RiGroupLine />} color='orangeGradiantBox'
                message={FaStaticTexts.mtnGroupChargeColorSectionMessage} />
            <div className='dashboardFrameColumnDirection'>
                <h4 className='dashboardSectionTitle'>{FaStaticTexts.mtnGroupChargeSectionTitle}</h4>
            </div>
        </div>
    )
}

export default MTNIntroduceFriendsReport;