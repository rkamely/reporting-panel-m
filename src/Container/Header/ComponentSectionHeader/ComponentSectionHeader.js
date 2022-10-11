import React from 'react';


const DashboardSectionHeader = (props) => {
    const { title, icon, color, message } = props;
    return(
        <div className={['dashboardSectionHeader', color].join(' ')}>
            <div className='inRowFlexItems dashboardHeaderDetailFrame'>
                {icon}
                <span>
                    <h3>{title}</h3>
                    <p>{message}</p>
                </span>
            </div>
        </div>
    )
}

export default DashboardSectionHeader;