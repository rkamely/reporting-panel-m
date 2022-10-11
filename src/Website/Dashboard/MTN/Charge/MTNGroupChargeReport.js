import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { BsFileEarmarkText} from "react-icons/all";

import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import LoadingBackDrop from '../../../../Container/Loading/LoadingBackdrop';

const MTNChargeGroupReport = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [rfmList, setRFMList] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setRFMList([]);
            setLoadingData(false)
        }, 2000);
    }, []);


    return (
        <div className='mainPageContentFrame'>
            { loadingData? <LoadingBackDrop />: null }
            <DashboardSectionHeader title={FaStaticTexts.mtnGroupChargeReportColorSectionTitle} icon={<BsFileEarmarkText />} 
                    color='blueGradiantBox' message={FaStaticTexts.mtnGroupChargeReportColorSectionMessage} />
            <div className='dashboardFrameColumnDirection'>
                {/* <h4 className='dashboardSectionTitle'>{FaStaticTexts.mtnGroupRFMSectionTitle}</h4> */}
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

export default connect(mapStateToProps)(MTNChargeGroupReport);
