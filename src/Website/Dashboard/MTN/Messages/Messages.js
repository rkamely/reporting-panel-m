import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {AiOutlineMail, IoIosArrowDown} from "react-icons/all";

import DashboardSectionHeader from "../../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import TableOfContentRowCell from "../../../../Container/Table/TableOfContentRowCell";
import LoadingBackDrop from "../../../../Container/Loading/LoadingBackdrop";

import Hidden from "@material-ui/core/Hidden";
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core';
import { AccordionDetails } from '@material-ui/core'
import FaStaticTexts from "../../../../Constants/Fa/FaStatic";

const Messages = () => {

    const [loadingData, setLoadingData] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setMessageList([
                {
                    id: 0,
                    title: 'تهیه بلیت اتوبوس از اپ ستاره‌یک',
                    message: 'شرکت ستاره اول به ارائه خدماتی ازجمله فروش انواع مدل‌های شارژ و همچنین سیم‌کارت می‌پردازد. با پیشرفت تکنولوژی و رونق گرفتن اپلیکیشن‌های پرداخت، این شرکت تصمیم گرفت علاوه بر کد یو‌اس‌اس‌دی # ۱ *، این بار با «اپلیکیشن ستاره یک» وارد این حوزه شود.'
                },
                {
                    id: 1,
                    title: 'احراز رتبه دانش بنیان',
                    message: '«ستاره یک» قابلیت‌هایی را در اختیار کاربران قرار می‌دهد که آنها راحت‌تر به سرویس‌های پرداختی دسترسی پیدا کنند؛ از جمله خرید شارژ کلیه اپراتورها، خرید شارژ فوق‌العاده، جوانان و بانوان ویژه مشترکین همراه‌اول، شارژ اضطراری و غیره.\n' +
                        'باتوجه به دانش تخصصی به‌کار برده شده در محصولات و بنا به ارزیابی صورت گرفته توسط کارگروه ارزیابی شرکت‌های دانش‌بنیان معاونت علمی و فناوری ریاست جمهوری، ستاره اول به‌عنوان شرکت دانش‌بنیان شناخته شد. بر این اساس ستاره اول قصد دارد گامی در جهت پیشرفت محصولات ارائه شده و کسب رضایت بیشتر مشتریان بردارد.'
                },
                {
                    id: 2,
                    title: 'حضور در نمایشگاه الکامپ 2019',
                    message: 'ستاره اول در بیست و پنجمین نمایشگاه الکامپ با هدف معرفی محصولات خود به مخاطبین حضور یافت.\n' +
                        'یکی از دلایل حضور ستاره اول در این دوره نمایشگاه آشنایی بیشتر مخاطبان و مردم با خدماتی متنوع این شرکت به‌خصوص در زمینه عرضه سیمکارت در دو بستر سایت و اپلیکیشن بود.\n' +
                        'ستاره اول در زمینه سیمکارت با استفاده از درگاه های فروش خود یعنی وب‌سایت های «ستاره سیم» و «رندترین» به ارائه خدمات می پردازد.\n' +
                        'کارشناس فروش شرکت ستاره اول درباره این دو بستر فروش توضیح داد: «سایت رندترین، فروش سیم‌کارت به‌صورت حراج را انجام می‌دهد و مانند همه حراجی‌هایی که انجام می‌شوند، این سایت نیز ابتدا یک قیمت پایه برای سیم‌کارت مشخص می‌کند، سپس مشتریان شرکت و ودیعه‌ای را پرداخت می‌کنند و با توجه به قوانینی که در سایت رندترین وجود دارد، می‌توانند در حراج ما شرکت کنند.»'
                },
                {
                    id: 3,
                    title: 'ستاره اول، در گام دوم پیشرفت و تعالی',
                    message: 'در راستای تعریف برنامه جامع سازمانی و تصمیم‌گیری برای چگونگی یافتن منابع موردنیاز و رسیدن به مقصود و برای آنکه یک سازمان از مسیر حرکت خود آگاه باشد باید بداند اکنون دقیقاً کجا قرار دارد.\n' +
                        'پس‌ازآن باید آنچه می‌خواهد باشد را به‌درستی تعریف کرده و چگونگی رسیدن به آن جایگاه را مشخص کند. مستندات حاصل از این فرایند را برنامه راهبردی سازمان یا همان سند راهبردی می‌نامند.\n' +
                        'برنامه راهبردی برای برنامه‌ریزی مؤثر به‌منظور ترسیم طرح و برنامه یک سازمان بکار می‌رود، اما هرگز نمی‌تواند به صورت مشخص پیش‌بینی کند بازار در آینده دقیقاً چگونه خواهد بود و در آینده نزدیک چه اتفاقاتی رخ خواهد داد.'
                },
            ]);
            setLoadingData(false)
        }, 3000);
    }, []);

        const handleChange = panel => (event, expanded) => {
        setExpanded(expanded? panel: false);
    };

    return (
        <div className='mainPageContentFrame'>
            { loadingData? <LoadingBackDrop />: null }
            <DashboardSectionHeader title={FaStaticTexts.messageColorSectionTitle}
                icon={<AiOutlineMail />} color='greenGradiantBox' message={FaStaticTexts.messageColorSectionMessage} />
            <div className='tableOfContentStyle'>
                <Hidden only={['sm', 'xs']}>
                    <div className='tableOfContentHeader'>
                        <ul>
                            <li style={{width: '10%'}}>{FaStaticTexts.rowStaticText}</li>
                            <li style={{width: '90%'}}>{FaStaticTexts.messageTitleOfHeader}</li>
                        </ul>
                    </div>
                </Hidden>
                {
                    messageList.map((item, index) =>
                        <div className='tableOfContentRow' key={index}>
                            <ul>
                                <Accordion
                                    style={{width: '100%'}}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        className='tableOfContentRowHeader'
                                        expandIcon={<IoIosArrowDown
                                            style={{position: 'absolute'}}/>}>
                                        <div className='eachRowOfTableStyle'>
                                            <TableOfContentRowCell width='10%' title={FaStaticTexts.rowStaticText} text={index+1} />
                                            <TableOfContentRowCell width='90%' title={FaStaticTexts.messageTitleOfHeader} text={item.title} />
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails
                                        className='tableOfContentDetailFrame'>
                                        <ul className='detailFrame'>
                                            <h6>{item.message}</h6>
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </ul>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default connect()(Messages);
