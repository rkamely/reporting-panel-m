import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import DashboardSideMenuItem from "./DashboardSideMenuItem";
import {AiOutlineHome, AiOutlinePoweroff} from "react-icons/ai";
import {GoMail} from "react-icons/go";
import {Link} from "react-router-dom";
import FaStaticTexts from "../../../Constants/Fa/FaStatic";


const DashboardSideMenu = (props) => {
    const [timeStatus, setTimeStatus] = useState(FaStaticTexts.goodTimeTitle);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const hours = (new Date()).getHours();
        if (hours > 0 && hours < 6) {
            setTimeStatus(FaStaticTexts.goodTimeTitle)
        } else if (hours > 6 && hours < 18) {
            setTimeStatus(FaStaticTexts.goodDayTitle)
        } else if (hours > 18 && hours < 24) {
            setTimeStatus(FaStaticTexts.goodNightTitle)
        }
        setMenuItems([
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
                        title: 'گزارش کلی',
                        linkTo: '/mtnUserGeneralReport',
                    }]
            },
            {
                linkTo: '/mtnNewOpportunities',
                title: 'فرصت ها',
                type: 'opportunity',
                children: [
                    {
                        title: 'ایجاد فرصت جدید',
                        linkTo: '/mtnNewOpportunities'
                    },
                    {
                        title: 'لیست فرصت ها',
                        linkTo: '/mtnOpportunitiesList'
                    }, 
                    {
                        title: 'تنظیمات گردونه',
                        linkTo: '/mtnCarouselSetting'
                    }
                ]
            },
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
                    }
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
                linkTo: '/mtnSubscriberScore',
                title: 'امتیازگیری و شانس ها',
                type: 'mtnSubscriberScore'
            },
            {
                linkTo: '/mtnGiftList',
                title: FaStaticTexts.giftsMenuTitle,
                type: 'gifts'
            }
        ])
    }, [])

    const { fullName, avatar } = props;
    let profileImage;
    if (avatar !== undefined){
        profileImage = avatar
    }
    else{
        profileImage = require('../../../assets/images/defaultProfile.jpg');
    }


    return(
        <div className='dashSideMenuFrame'>
            <div className='dashSideMenuHeader'>
                <img src={profileImage} alt={FaStaticTexts.profileButtonTitle} className='avatarImage' />
                { fullName!==undefined? fullName: FaStaticTexts.guestUserText
                    + '،' + '  '+ timeStatus}
                <ul className='dashSideMenuHeaderButtons'>
                    <li>
                        <Link to='/dashboard' className='listButton'>
                            <AiOutlineHome />
                            {FaStaticTexts.homeButtonTitle}
                        </Link>
                    </li>
                    <li>
                        <button className='listButton'>
                            <GoMail />
                            {FaStaticTexts.profileButtonTitle}
                        </button>
                    </li>
                    <li>
                        <button onClick={props.logOutRequest} className='listButton'>
                            <AiOutlinePoweroff />
                            {FaStaticTexts.exitButtonTitle}
                        </button>
                    </li>
                </ul>
            </div>
            <ul className='selectPagesMenu'>
                {
                    menuItems.map((item, index) =>
                        <DashboardSideMenuItem
                            title={item.title}
                            linkTo={item.linkTo}
                            menuType={item.type}
                            key={index}
                            children={item.children}
                        />
                    )
                }
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        fullName: state.AppReducer.userInfo.fullname
    }
};

export default connect(mapStateToProps)(DashboardSideMenu);
