import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { RiGroupLine} from "react-icons/all";

import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";

const MTNIntroduceFriends = () => {

    const [loadingData, setLoadingData] = useState(true);



    return (
        <div className='mainPageContentFrame'>
            { loadingData? <LoadingBackDrop />: null }
            <DashboardSectionHeader title={FaStaticTexts.mtnGroupChargeColorSectionTitle} icon={<RiGroupLine />} color='blueGradiantBox'
                                    message={FaStaticTexts.mtnGroupChargeColorSectionMessage} />
            <div className='dashboardFrameColumnDirection'>
                <h4 className='dashboardSectionTitle'>{FaStaticTexts.mtnGroupChargeSectionTitle}</h4>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isLoginPending: state.AppReducer.isLoginPending,
        profileStatus: state.AppReducer.userInfo.status
    }
};

export default connect(mapStateToProps)(MTNIntroduceFriends);
