//withdLoading.js
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';


function TooltipHOC(Component) {

  return function WihLoadingComponent({ ...props }) {
    return (
        <Tooltip title="تعداد محدودیت روزانه شرکت در قرعه کشی" placement="top" arrow>
            <span>
                <Component {...props} />
            </span>
        </Tooltip>  
    )
            
  };
}
export default TooltipHOC;
