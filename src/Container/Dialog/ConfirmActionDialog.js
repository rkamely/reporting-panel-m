import React  from 'react';
import {BeatLoader} from "react-spinners";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {MdClose} from "react-icons/md";

const ConfirmActionDialog = (props) => {

    const { dialogTitle, closeDialog, dialogMessage, approveAction, actionPending } = props;

    return(
        <Dialog
            open={true}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='approveActionModalHeader'>
                <span className='inRowFlexItems'>
                    <h4>{dialogTitle}</h4>
                </span>
                <MdClose onClick={closeDialog} />
            </div>
            {
                <div>
                    <DialogContent className='modalContent'>
                        <div className='inRowFlexItems'>
                            <p className='simpleTitleOnWhite minusLetterSpacing'>
                                {dialogMessage}
                            </p>
                        </div>
                    </DialogContent>
                    <DialogActions className='dialogActionFrame'>
                        <div>
                            <Button onClick={closeDialog}
                                    className='dialogActionBtn' >
                                انصراف
                            </Button>
                            <Button onClick={approveAction} disabled={actionPending}
                                    className='dialogActionBtn' >
                                {actionPending?
                                    <BeatLoader
                                        size={8}
                                        margin='3px'
                                        color={"#00c6ff"}
                                        loading={true}
                                    />:
                                    'تایید'
                                }
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            }
        </Dialog>
    )
}



export default ConfirmActionDialog;
