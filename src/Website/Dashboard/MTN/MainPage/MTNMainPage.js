import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../Dashboard.scss';
import MultipleCategoryPieChart from "../../../../Container/Diagrams/MultipleCategoryPieChart";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import { AiOutlineUser, IoWalletOutline, BiAlarm, FiAperture, AiOutlineMonitor } from "react-icons/all";
import PriceFormat from "../../../../PriceFormat";
import ColumnErrorReportGraph from "../../../../Container/Diagrams/ColumnErrorReportGraph";
import GeneralSaleReportPie from "../../../../Container/Diagrams/GeneralSaleReportPie";
import GeneralSaleReportColumn from "../../../../Container/Diagrams/GeneralSaleReportColumn";
import QuickAccessBox from "../../MainDashboard/QuickAccessBox";
import APIRequest from '../../../../APIRequest';
import { useSnackbar } from 'notistack';
import { BeatLoader } from "react-spinners";



const MTNMainPage = () => {

    const [diagram1, setDiagram1] = useState(null);
    const [diagram2, setDiagram2] = useState(null);
    const [diagram3, setDiagram3] = useState(null);
    const [diagram4, setDiagram4] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loadingBalance, setLoadingBalance] = useState(true);


    useEffect(() => {
        setDiagram1(<MultipleCategoryPieChart />);
        setDiagram2(<ColumnErrorReportGraph />);
        setDiagram3(<GeneralSaleReportPie />);
        setDiagram4(<GeneralSaleReportColumn />);
        getBalanceInfo();
        setInterval(() => {
            // getBalanceInfo();
        }, 10000);

}, []);

    const { enqueueSnackbar } = useSnackbar();

    const pushErrorSnack = (variant) => {
        enqueueSnackbar('مشکل دریافت اطلاعات از سرور!', { variant });
    }

    const getBalanceInfo = () => {
        APIRequest('GET_BALANCE_VALUE', 'POST', 'MtnReport/balance', '', '', '')
            .then((res) => {
                setBalance(res.data.content);
                setLoadingBalance(false);
            })
            .catch(() => pushErrorSnack('error'))
    }

    return (
        <div className='transparentDashboardContentFrame'>
            <div className='dashQuickAccessBoxes'>
                <ul>
                    <QuickAccessBox title={FaStaticTexts.activeCampaignQuickAccess} color='orangeGradiantBox'
                        icon={<BiAlarm />} message={`${12}${FaStaticTexts.campaignText}`} />
                    <QuickAccessBox title={FaStaticTexts.lotteryText} color='redGradiantBox'
                        icon={<FiAperture />} message={8} />
                    <QuickAccessBox title={FaStaticTexts.balanceRemain} color='blueGradiantBox'
                        icon={<AiOutlineMonitor />} message={loadingBalance ?
                            <BeatLoader size={7} color={"#26c6da"} /> : `${PriceFormat(balance)} ریال`} />
                    <QuickAccessBox title={FaStaticTexts.accessLevelText} color='greenGradiantBox'
                        icon={<AiOutlineUser />} message='مدیر ارشد' />
                </ul>
            </div>
            <div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>
                {diagram1}
            </div>
        
            {/* <div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>
                {diagram4}
            </div>
            <div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>
                {diagram3}
            </div>
            
            <div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>
                {diagram2}
            </div> */}
        </div>
    )
}

export default connect()(MTNMainPage);
