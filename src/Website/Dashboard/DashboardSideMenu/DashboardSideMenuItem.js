import React, { useState }  from 'react';
import {Link} from "react-router-dom";
import {MdDashboard} from "react-icons/md";
import {AiOutlineUser, AiOutlineCopy, AiOutlineFileText} from "react-icons/ai";
import { IoMdPricetags} from "react-icons/io";
import { BiMedal } from 'react-icons/bi';
import {
    AiOutlineGift,
    AiOutlineSolution,
    BiSelectMultiple,
    BsFileText, FiCast,
    FiAperture, AiOutlineShareAlt, FiLayers,
    IoIosArrowDown,
    RiGroupLine, AiOutlineLineChart
} from "react-icons/all";
import '../Dashboard.scss';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";


const DashboardSideMenuItem = (props) => {

    const { linkTo, title, menuType } = props;
    const [expanded, setExpanded] = useState('panel2');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    let menuIcon;

    switch (menuType) {
        case 'dashboard':
            menuIcon =
                <MdDashboard />;
            break;
        case 'gifts':
            menuIcon = <AiOutlineGift />
            break;
        case 'winners':
            menuIcon = <RiGroupLine />
            break;
        case 'report870':
            menuIcon = <BsFileText />
            break;
        case 'invoices':
            menuIcon = <AiOutlineCopy />
            break;
        case 'scores':
            menuIcon = <BiMedal />
            break;
        case 'campaign':
            menuIcon = <FiLayers />
            break;
        case 'discountCodeList':
            menuIcon = <IoMdPricetags />
            break;
        case 'opportunity':
            menuIcon = <FiAperture />
            break;
        case 'profile':
            menuIcon = <AiOutlineUser />
            break;
        case 'campaignManagement':
            menuIcon = <AiOutlineSolution />
            break;
        case 'lottery':
            menuIcon = <BiSelectMultiple />
            break;
        case 'mtnSaleReport':
            menuIcon = <AiOutlineFileText />
            break;
        case 'mtnSubscriberReport':
            menuIcon = <AiOutlineUser />
            break;
        case 'multiplication':
            menuIcon = <AiOutlineLineChart />
            break;
        case 'mtnSubscriberScore':
            menuIcon = <FiAperture />
            break;
        case 'introduceFriends':
            menuIcon = <AiOutlineShareAlt />
            break;
        case 'groupCharge':
            menuIcon = <RiGroupLine />
            break;
        case 'rfmList':
            menuIcon = <AiOutlineFileText />
            break;
        case 'reports':
            menuIcon = <AiOutlineFileText />
            break;
        case 'momentLottary':
            menuIcon = <FiCast />

        default:
            break;
    }

    let includePathAddress
    if (props.children !== undefined) {
        includePathAddress = props.children.map(item => item.linkTo);
    }


    return(
        props.children?
            <ul className={includePathAddress.includes(window.location.pathname)? 'activeSideMenuItem': ''}>
                <Accordion expanded={expanded === 'panel'} onChange={handleChange('panel')}>
                    <AccordionSummary
                        className='collapseMenuHeader dashSideMenuItem'
                        expandIcon={<IoIosArrowDown />}>
                        { menuIcon }
                        {props.title}
                    </AccordionSummary>
                    <AccordionDetails className='collapseMenu'>
                        {
                            props.children.map((item, index) =>
                                <Link to={item.linkTo} key={index}>
                                    <li className='dashSideMenuItem'>
                                        {item.title}
                                    </li>
                                </Link>
                            )
                        }
                    </AccordionDetails>
                </Accordion>
            </ul>:

            props.linkTo === window.location.pathname?
                <Link to={linkTo}>
                    <li className='dashSideMenuItem activeSideMenuItem'>
                        { menuIcon }
                        { title }
                    </li>
                </Link>:
                <Link to={linkTo}>
                    <li className='dashSideMenuItem'>
                        { menuIcon }
                        { title }
                    </li>
                </Link>

    )
}

export default DashboardSideMenuItem;
