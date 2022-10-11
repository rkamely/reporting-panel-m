import React from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import {connect, useSelector} from 'react-redux';
import AuthWebsiteLayout from "../Website/HOC/Layout/AuthWebsiteLayout";
import DashboardLayout from "../Website/HOC/Layout/DashboardLayout";
import Login from "../Website/Pages/Accounting/Login/Login";
import UserProfile from "../Website/Dashboard/UserProfile/UserProfile";
import MainWebsiteLayout from "../Website/HOC/Layout/MainWebsiteLayout";
import MainPage from "../Website/Pages/MainPage/MainPage";
import Messages from "../Website/Dashboard/MTN/Messages/Messages";
import Announce from "../Website/Dashboard/MTN/Announce/Announce";
import Gifts from "../Website/Dashboard/MTN/Gifts/MTNGiftList";
import MTNNewGift from "../Website/Dashboard/MTN/Gifts/MTNNewGift";
import Winners from "../Website/Dashboard/MTN/Winners/Winners";
import MTNSaleReport from "../Website/Dashboard/MTN/SaleReport/SaleReport";
import MTNSubscriberReport from "../Website/Dashboard/MTN/SubscriberReport/SubscriberReport";
import MTNSubscriberScore from "../Website/Dashboard/MTN/SubscriberScore/SubscriberScore";
import MTNMainPage from "../Website/Dashboard/MTN/MainPage/MTNMainPage";
import MCIMainPage from "../Website/Dashboard/MCI/MainPage/MCIMainPage";
import MTNCampaignReport from "../Website/Dashboard/MTN/Campaign/MTNCampaignReport";
import MTNCampaignList from "../Website/Dashboard/MTN/Campaign/MTNCampaignList";
import MTNNewCampaign from "../Website/Dashboard/MTN/Campaign/New/MTNNewCampaign";
import MTNChargeGroup from "../Website/Dashboard/MTN/Charge/MTNGroupCharge";
import MTNIntroduceFriends from '../Website/Dashboard/MTN/Friends/MTNIntroduceFriends';
import MTNIntroduceFriendsReport from '../Website/Dashboard/MTN/Friends/MTNIntroduceFriendsReport';
import MTNRFMList from '../Website/Dashboard/MTN/RFM/MTNRFMList';
import MTNGroupChargeReport from '../Website/Dashboard/MTN/Charge/MTNGroupChargeReport';
import MTNMultiplication from '../Website/Dashboard/MTN/Multiplication/MTNMultiplication';
import MTNMainTransactionsReport from '../Website/Dashboard/MTN/TransactionsReports/MTNMainTransactionsReport';
import MTNNewOpportunities from '../Website/Dashboard/MTN/Opportunities/MTNNewOpportunities';
import MTNOpportunitiesList from '../Website/Dashboard/MTN/Opportunities/MTNOpportunitiesList';
import MTNCarouselSetting from '../Website/Dashboard/MTN/Opportunities/MTNCarouselSetting';
import MTNUserGeneralReport from '../Website/Dashboard/MTN/Report/UserGeneralReport/MTNUserGeneralReport';
import MTNGeneralSaleReport from '../Website/Dashboard/MTN/Report/GeneralSaleReport/MTNGeneralSaleReport';
import MTNScoresTable from '../Website/Dashboard/MTN/Scores/MTNScoresTable';
import MTNSubscriberScoreList from '../Website/Dashboard/MTN/Scores/MTNSubscriberScoreList';
import MtnMomentLottaryCampaign from '../Website/Dashboard/MTN/MomentLottary/MtnMomentLottaryCampaign';
import MTNErrorReport from '../Website/Dashboard/MTN/Report/ErrorReport/MTNErrorReort';
import MTNCampaignUsedReport from '../Website/Dashboard/MTN/Campaign/MTNCampaignUsedReport';


const Routes = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Switch>

                    {/*********************** authentication page routes ***********************/}
                    <AuthWebsiteLayout path='/' exact component={Login} />

                    {/*********************** Dashboard page routes ***********************/}
                    <DashboardLayout path='/mciMainPage' component={MCIMainPage} />
                    <DashboardLayout path='/mtnMainPage' component={MTNMainPage} />
                    <DashboardLayout path='/messages' component={Messages} />
                    <DashboardLayout path='/announce' component={Announce} />
                    <DashboardLayout path='/winners' component={Winners} />
                    <DashboardLayout path='/userProfile' component={UserProfile} />

                    {/*********************** Dashboard MTN page routes ***********************/}
                    <DashboardLayout path='/mtnSubscriberReport' component={MTNSubscriberReport} />
                    <DashboardLayout path='/mtnSubscriberScore' component={MTNSubscriberScore} />
                    <DashboardLayout path='/mtnSaleReport' component={MTNSaleReport} />
                    <DashboardLayout path='/mtnNewCampaign' component={MTNNewCampaign} />
                    <DashboardLayout path='/mtnCampaignReport' component={MTNCampaignReport} />
                    <DashboardLayout path='/mtnCampaignList' component={MTNCampaignList} />
                    <DashboardLayout path='/mtnCampaignUsedReport' component={MTNCampaignUsedReport} />
                    <DashboardLayout path='/mtnChargeGroup' component={MTNChargeGroup} />
                    <DashboardLayout path='/mtnChargeGroupReport' component={MTNGroupChargeReport} />
                    <DashboardLayout path='/mtnIntroduceFriends' component={MTNIntroduceFriends} />
                    <DashboardLayout path='/mtnIntroduceFriendsReport' component={MTNIntroduceFriendsReport} />
                    <DashboardLayout path='/rfmList' component={MTNRFMList} />
                    <DashboardLayout path='/mtnMultiplication' component={MTNMultiplication} />
                    <DashboardLayout path='/mtnMainTransactionsReport' component={MTNMainTransactionsReport} />
                    <DashboardLayout path='/mtnUserGeneralReport' component={MTNUserGeneralReport} />
                    <DashboardLayout path='/mtnGeneralSaleReport' component={MTNGeneralSaleReport} />
                    <DashboardLayout path='/mtnErrorReport' component={MTNErrorReport} />
                    <DashboardLayout path='/mtnNewOpportunities' component={MTNNewOpportunities} />
                    <DashboardLayout path='/mtnOpportunitiesList' component={MTNOpportunitiesList} />
                    <DashboardLayout path='/mtnCarouselSetting' component={MTNCarouselSetting} />
                    <DashboardLayout path='/mtnGiftList' component={Gifts} />
                    <DashboardLayout path='/mtnNewGift' component={MTNNewGift} />
                    <DashboardLayout path='/mtnScoresTable' component={MTNScoresTable} />
                    <DashboardLayout path='/mtnSubscriberScoresList' component={MTNSubscriberScoreList} />
                    <DashboardLayout path='/mtnMomentLottaryCampaign' component={MtnMomentLottaryCampaign} />


                </Switch>
            </React.Fragment>
        </BrowserRouter>
    )
};

export default connect()(Routes);
