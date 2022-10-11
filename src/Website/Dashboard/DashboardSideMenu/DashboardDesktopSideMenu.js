import React, {useState, useEffect} from 'react';
import {connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import {AiOutlineHome, AiOutlinePoweroff, AiOutlineUser} from "react-icons/ai";

import DashboardSideMenuItem from "./DashboardSideMenuItem";
import {isAuthenticated, isLoginPending, logOutRequest} from "../../../Redux/Actions/AuthenticationAction";
import ConfirmActionDialog from "../../../Container/Dialog/ConfirmActionDialog";
import FaStaticTexts from "../../../Constants/Fa/FaStatic";


const DashboardDesktopSideMenu = (props) => {
    const [timeStatus, setTimeStatus] = useState(`${FaStaticTexts.goodTimeTitle}`);
    const [logoutDialog, setLogoutDialog] = useState(false);
    const [mciMenuItems, setMCIMenuItems] = useState([]);
    const [mtnMenuItems, setMTNMenuItems] = useState([]);

    const userState = useSelector(state => state.AppReducer);

    useEffect(() => {
        const hours = (new Date()).getHours();
        if (hours > 0 && hours < 6) {
            setTimeStatus(FaStaticTexts.goodTimeTitle)
        } else if (hours > 6 && hours < 18) {
            setTimeStatus(FaStaticTexts.goodDayTitle)
        } else if (hours > 18 && hours < 24) {
            setTimeStatus(FaStaticTexts.goodNightTitle)
        }
        setMCIMenuItems([
            {
                id: 0,
                linkTo: '/mciMainPage',
                title: FaStaticTexts.dashboardMenuTitle,
                type: 'dashboard'
            },
            // {
            //     id: 2,
            //     linkTo: '/prices',
            //     title: FaStaticTexts.giftsMenuTitle,
            //     type: 'prices'
            // }
        ]);

        setMTNMenuItems([
            {
                linkTo: '/mtnMainPage',
                title: FaStaticTexts.dashboardMenuTitle,
                type: 'dashboard'
            },
            {
                linkTo: '/mtnGeneralReport',
                title: 'گزارشات',
                type: 'reports',
                children: [
                    {
                        id: 0,
                        title: 'گزارش کلی کاربر',
                        linkTo: '/mtnUserGeneralReport',
                    },
                    {
                        id: 1,
                        title: 'گزارش کلی فروش',
                        linkTo: '/mtnGeneralSaleReport',
                    },
                    {
                        id: 2,
                        title: 'گزارش خطاها',
                        linkTo: '/mtnErrorReport',
                    },
                    // {
                    //     id: 1,
                    //     title: 'گزارش فروش',
                    //     linkTo: '/mtnSaleReport',
                    // },
                    // {
                    //     id: 2,
                    //     title: 'گزارش کاربران',
                    //     linkTo: '/mtnSubscriberReport',
                    // },
                    // {
                    //     id: 3,
                    //     title: 'گزارش جامع تراکنش ها',
                    //     linkTo: '/mtnMainTransactionsReport'
                    // },
                    // {
                    //     id: 4,
                    //     title: 'گزارش درخواست های معرف',
                    //     linkTo: '/mtnIntroduceFriends'
                    // },
                    // {
                    //     id: 4,
                    //     title: 'گزارش  خطاهای بوسیم',
                    //     linkTo: '/mtnUsimFaults'
                    // }
                ]
            },
            // {
            //     linkTo: '/mtnNewOpportunities',
            //     title: 'فرصت ها',
            //     type: 'opportunity',
            //     children: [
            //         {
            //             title: 'ایجاد فرصت جدید',
            //             linkTo: '/mtnNewOpportunities'
            //         },
            //         {
            //             title: 'لیست فرصت ها',
            //             linkTo: '/mtnOpportunitiesList'
            //         }, 
            //         {
            //             title: 'تنظیمات گردونه',
            //             linkTo: '/mtnCarouselSetting'
            //         }
            //     ]
            // },
            {
                linkTo: '/mtnNewCampaign',
                title: 'کمپین ها',
                type: 'campaign',
                children: [
                    {
                        id: 0,
                        title: 'کمپین جدید',
                        linkTo: '/mtnNewCampaign'
                    },
                    {
                        id: 1,
                        title: 'لیست کمپین ها',
                        linkTo: '/mtnCampaignList'
                    },
                    {
                        id: 2,
                        title: 'گزارش کمپین ها',
                        linkTo: '/mtnCampaignUsedReport'
                    },
                    // {
                    //     id: 2,
                    //     title: 'گزارش ارسال هدیه به مشترک',
                    //     linkTo: '/mtnCampaignReport'
                    // }
                ]
            },
            {
                linkTo: '/mtnScoresTable',
                title: 'امتیازات',
                type: 'scores',
                children: [
                    {
                        title: 'جدول امتیازات',
                        linkTo: '/mtnScoresTable'
                    },
                    {
                        title: 'امتیازات مشترکین',
                        linkTo: '/mtnSubscriberScoresList'
                    }
                ]
            },
            {
                linkTo: '/mtnMomentLottaryTable',
                title: 'قرعه کشی در لحظه',
                type: 'momentLottary',
                children: [
                    {
                        title: 'تعریف کمپین',
                        linkTo: '/mtnMomentLottaryCampaign'
                    }
                ]
            },
            {
                linkTo: '/mtnNewOpportunities',
                title: 'جوایز',
                type: 'gifts',
                children: [
                    {
                        title: 'تعریف جایزه جدید',
                        linkTo: '/mtnNewGift'
                    },
                    {
                        title: FaStaticTexts.giftsMenuTitle,
                        linkTo: '/mtnGiftList'
                    }
                ]
            },
            {
                linkTo: '/mtnSubscriberScore',
                title: 'امتیازگیری و شانس ها',
                type: 'mtnSubscriberScore'
            },
    
            // {
            //     linkTo: '/mtnIntroduceFriend',
            //     title: 'معرفی به دوستان',
            //     type: 'introduceFriends',
            //     children: [
            //         {
            //             id: 0,
            //             title: 'جدید',
            //             linkTo: '/mtnIntroduceFriends'
            //         },
            //         {
            //             id: 1,
            //             title: 'گزارش معرفی به دوستان',
            //             linkTo: '/mtnIntroduceFriendsReport'
            //         }
            //     ]
            // },

            // {
            //     linkTo: '/mtnChargeGroup',
            //     title: 'شارژ گروهی',
            //     type: 'groupCharge',
            //     children: [
            //         {
            //             id: 0,
            //             title: 'جدید',
            //             linkTo: '/mtnChargeGroup'
            //         },
            //         {
            //             id: 1,
            //             title: 'گزارش شارژ گروهی',
            //             linkTo: '/mtnChargeGroupReport'
            //         }
            //     ]
            // },
            
            // {
            //     linkTo: '/mtnMultiplication',
            //     title: FaStaticTexts.multiplication,
            //     type: 'multiplication'
            // },
            
            // {
            //     linkTo: '/winners',
            //     title: FaStaticTexts.winnersMenuTitle,
            //     type: 'winners'
            // },
            // {
            //     linkTo: '/lottery',
            //     title: FaStaticTexts.lotteryMenuTitle,
            //     type: 'lottery'
            // },
            // {
            //     linkTo: '/report870',
            //     title: FaStaticTexts.report870Title,
            //     type: 'report870'
            // },
            // {
            //     linkTo: '/campaignManagement',
            //     title: FaStaticTexts.campaignManagement,
            //     type: 'campaignManagement'
            // }
        ])
    }, [])

    const logOutBtn = () => {
        props.dispatch(isLoginPending(true));
        logOutRequest()
            .then(() => {
                props.dispatch(isAuthenticated(false));

                props.history.push('/')
            })
    };
    const { fullName, avatar } = userState;
    let profileImage;
    if (avatar !== undefined){
        profileImage = avatar
    }
    else{
        profileImage = require('../../../assets/images/defaultProfile.jpg');
    }
    return (
        <div className='dashSideMenuFrame'>
            {
                logoutDialog?
                    <ConfirmActionDialog
                        dialogTitle={FaStaticTexts.logOutButtonTitle} closeDialog={()=>setLogoutDialog(false)}
                        dialogMessage={FaStaticTexts.sureToLogoutMessage} approveAction={logOutBtn}/>: null
            }
            <div className='dashSideMenuHeader'>
                <img src={profileImage} alt={FaStaticTexts.profileButtonTitle} className='avatarImage' />
                { fullName!==undefined? fullName: FaStaticTexts.guestUserText
                    + '،' + '  '+ timeStatus}
                <ul className='dashSideMenuHeaderButtons'>
                    <li>
                        <Link to='/mtnMainPage' className='listButton'>
                            <AiOutlineHome />
                            {FaStaticTexts.homeButtonTitle}
                        </Link>
                    </li>
                    <li>
                        <Link to='/userProfile' className='listButton'>
                            <AiOutlineUser />
                            {FaStaticTexts.profileButtonTitle}
                        </Link>
                    </li>
                    <li>
                        <button onClick={() => setLogoutDialog(true)} className='listButton'>
                            <AiOutlinePoweroff />
                            {FaStaticTexts.exitButtonTitle}
                        </button>
                    </li>
                </ul>
            </div>
            <ul className='selectPagesMenu'>
                {
                    userState.operatorType === 'MCI'?
                        <>
                            <img src={require('../../../assets/images/mciLogo.png')} alt='' className='operatorIcon' />
                            {
                                mciMenuItems.map((item, index) =>
                                    <DashboardSideMenuItem
                                        title={item.title}
                                        linkTo={item.linkTo}
                                        menuType={item.type}
                                        key={index}
                                    />
                                )
                            }
                        </>:
                        <>
                            <img src={require('../../../assets/images/mtnLogo.png')} alt='' className='operatorIcon' />
                            {
                                mtnMenuItems.map((item, index) =>
                                    <DashboardSideMenuItem
                                        title={item.title}
                                        linkTo={item.linkTo}
                                        menuType={item.type}
                                        key={index}
                                        children={item.children}
                                    />
                                )
                            }
                        </>

                }
            </ul>
        </div>
    )
}


export default withRouter(connect()(DashboardDesktopSideMenu));
