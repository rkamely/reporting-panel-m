import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import {MdFingerprint} from "react-icons/md";
import DialogContent from "@material-ui/core/DialogContent";
import {FiX} from "react-icons/fi";


const ErrorAuthenticationDialog = (props) => {
    const { openDialog, close, dialogTitle, dialogMessage } = props;
    return(
        <Dialog
            open={openDialog}
            onClose={close}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div id="alert-dialog-slide-title" className='customErrorModalHeader'>
                <div className='inRowFlexItems'>
                    <MdFingerprint/>
                    <h4>{dialogTitle}</h4>
                </div>
                <FiX onClick={close} />
            </div>
            <DialogContent className='modalContent'>
                <h4 className='dialogMessage'>
                    { dialogMessage }
                </h4>
            </DialogContent>
        </Dialog>
    )
}
export default ErrorAuthenticationDialog;
