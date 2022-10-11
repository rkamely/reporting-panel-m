import React, {useState, useEffect, useContext} from 'react';
import {connect} from 'react-redux';
import '../../Dashboard.scss';
import MultipleCategoryPieChart from "../../../../Container/Diagrams/MultipleCategoryPieChart";
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";
import {AiOutlineGift, AiOutlineUser, BiAlarm, FiAperture} from "react-icons/all";
import PriceFormat from "../../../../PriceFormat";
import ColumnErrorReportGraph from "../../../../Container/Diagrams/ColumnErrorReportGraph";
import QuickAccessBox from "../../MainDashboard/QuickAccessBox";


const MCIMainPage = () => {

    const [diagram1, setDiagram1] = useState(null);
    const [diagram2, setDiagram2] = useState(null);


    useEffect(() => {
        setDiagram1(<MultipleCategoryPieChart/>);
        setDiagram2(<ColumnErrorReportGraph/>);
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
            {/*    {diagram1}*/}
            {/*</div>*/}
            {/*<div className='dashboardSectionContentFrame inRowFlexItemsSpaceBetween'>*/}
            {/*    {diagram2}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*<MyComponent className="redBg">Test</MyComponent>*/}
            {/*<SectionTitle className="testTitle">Styled Component Title</SectionTitle>*/}
            {/*    <SimpleOutlineSuccess onClick={()=>console.log("YES US")}>Click 1</SimpleOutlineSuccess>*/}
            {/*    <TomatoButton>Click 2</TomatoButton>*/}
            {/*    <br />*/}
            {/*    <SimpleButton type='bold' backgroundColor='green' color='#fff'>Button1</SimpleButton>*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*    <SimpleButton type='bolder' backgroundColor='red' color='#fff'>Button3</SimpleButton>*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*    <SimpleButton backgroundColor='purple' color='#fff'>Button2</SimpleButton>*/}
            {/*    <MehdiTitle>Simple Title</MehdiTitle>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Input1 type='password' placeholder="A small text input" />*/}
            {/*    <br />*/}
            {/*    <Input placeholder="A bigger text input" size="2em" />*/}
            {/*    <br />*/}
            {/*    <LinkButton as='a' href='http://reactjs.org'>Link Button</LinkButton>*/}
            {/*</div>*/}
            {/*<Button1 color='teal'>Button Test 1</Button1>*/}
            {/*<Button12>Button Test 2</Button12>*/}
            {/*<ThemeProvider theme={ButtonTheme}>*/}
            {/*    <Button2 type='dark'>Button test 1</Button2>*/}
            {/*</ThemeProvider>*/}
            {/*<ThemeProvider theme={ButtonTheme}>*/}
            {/*    <Button2 type='light'>Button test 2</Button2>*/}
            {/*</ThemeProvider>*/}
        </div>
    )
}


export default connect()(MCIMainPage);
