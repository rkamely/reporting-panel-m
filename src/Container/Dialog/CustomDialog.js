import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import {FiX} from "react-icons/fi";
import {MdFingerprint} from "react-icons/md";

const CustomDialog = (props) => {

    const { dialogTitle, dialogMessage, closeDialog } = props;
    return(
        <Dialog
            open={true}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle className='customModalHeader'>
                <div className='inRowFlexItems'>
                    <MdFingerprint/>
                    {dialogTitle}
                </div>
                <FiX onClick={closeDialog} />
            </DialogTitle>
            {
                <div>
                    <DialogContent className='modalContent'>
                        <DialogContentText>
                            <div className='inRowFlexItems'>
                                <p className='simpleTitleOnWhite'>
                                    {dialogMessage}
                                </p>
                            </div>
                        </DialogContentText>

                    </DialogContent>
                    {/*<DialogActions>*/}
                        {/*<div>*/}
                            {/*<Button onClick={closeDialog}*/}
                                    {/*className='dialogActionBtn' >*/}
                                {/*انصراف*/}
                            {/*</Button>*/}
                            {/*<Button onClick={approveDialog}*/}
                                    {/*className='dialogActionBtn' >*/}
                                {/*{props.isDeletingLoader?*/}
                                    {/*<BeatLoader*/}
                                        {/*size={8}*/}
                                        {/*margin='3px'*/}
                                        {/*color={"#fff"}*/}
                                        {/*loading={true}*/}
                                    {/*/>:*/}
                                    {/*'بله'*/}
                                {/*}*/}
                            {/*</Button>*/}
                        {/*</div>*/}
                    {/*</DialogActions>*/}
                </div>
            }
        </Dialog>
    )
};

export default CustomDialog;
