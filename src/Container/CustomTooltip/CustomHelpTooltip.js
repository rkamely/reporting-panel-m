import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStylesBootstrap = makeStyles(() => ({
    arrow: {
        color: '#000',
    },
    tooltip: {
        fontFamily: 'sans',
        top: -10,
        borderRadius: 3,
        padding: 15,
        fontSize: 12,
        lineHeight: 2,
        color: '#fff',
        backgroundColor: '#000',
        textAlign: 'justify'
    },
}));

const CustomHelpTooltip = props => {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

export default CustomHelpTooltip;
