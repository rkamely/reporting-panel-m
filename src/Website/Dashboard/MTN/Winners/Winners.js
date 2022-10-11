import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {IoIosArrowDown, RiGroupLine} from "react-icons/all";

import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Hidden from "@material-ui/core/Hidden";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

const Winners = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [winnersList, setWinnersList] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setWinnersList([
                {
                    id: 0,
                    campaign: 'شنبه های طلایی',
                    expireDate: '1399/04/31',
                    winners: [
                        {
                            id: 0,
                            name: 'آقای سید امیر حسین علی نژاد'
                        },
                        {
                            id: 1,
                            name: 'آقای محمدرضا علوی'
                        },
                        {
                            id: 2,
                            name: 'خانم سیما فیاضی پور'
                        },
                    ]
                },
                {
                    id: 1,
                    campaign: 'دو خودرو 206',
                    expireDate: '1399/08/30',
                    winners: [
                        {
                            id: 0,
                            name: 'آقای سهیل پناهی'
                        },
                        {
                            id: 1,
                            name: 'آقای محمد حسین آرین'
                        }
                    ]
                },
            ]);
            setLoadingData(false)
        }, 2000);
    }, []);

    const handleChange = panel => (event, expanded) => {
        setExpanded(expanded? panel: false);
    };

    return (
        <div className='mainPageContentFrame'>
            { loadingData? <LoadingBackDrop />: null }
            <DashboardSectionHeader title={FaStaticTexts.winnersColorSectionTitle} icon={<RiGroupLine />} color='purpleGradiantBox'
                                    message={FaStaticTexts.winnersColorSectionMessage} />
            <div className='tableOfContentStyle'>
                <Hidden only={['sm', 'xs']}>
                    <div className='tableOfContentHeader'>
                        <ul>
                            <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                            <li style={{width: '60%'}}>{FaStaticTexts.campaignNameText}</li>
                            <li style={{width: '30%'}}>{FaStaticTexts.campaignExpireDate}</li>
                        </ul>
                    </div>
                </Hidden>
                {
                    winnersList.map((item, index) =>
                        <div className='tableOfContentRow' key={index}>
                            <ul>
                                <ExpansionPanel
                                    style={{width: '100%'}}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}>
                                    <ExpansionPanelSummary
                                        className='tableOfContentRowHeader'
                                        expandIcon={<IoIosArrowDown
                                            style={{position: 'absolute'}}/>}>
                                        <div className='eachRowOfTableStyle'>
                                            <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} text={index+1} />
                                            <TableOfContentRowCell width='60%' title={FaStaticTexts.campaignNameText} text={item.campaign} />
                                            <TableOfContentRowCell width='30%' title={FaStaticTexts.campaignExpireDate} text={item.expireDate} />
                                        </div>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails
                                        className='tableOfContentDetailFrame'>
                                        <ul className='detailFrame'>
                                            {item.winners.map((item, index) =>
                                                <h6 key={index}>{`${FaStaticTexts.winnerNumber} ${index+1}: ${item.name}`}</h6>
                                            )}
                                        </ul>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            </ul>
                        </div>
                    )
                }
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

export default connect(mapStateToProps)(Winners);
