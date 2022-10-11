import React  from 'react';
import {BeatLoader} from "react-spinners";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const AlertDelete = (props) => {
    const { openDialog, closeDialog, dialogTitle, dialogMessage, approveAction, loadingDialog} = props;
    return(
        <Dialog
            open={openDialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle className='customModalHeader'>{dialogTitle}</DialogTitle>
            {
                <div>
                    <DialogContent className='modalContent'>
                        <DialogContentText>
                            <div className='inRowFlexItems'>
                                <p className='simpleTitleOnWhite'>
                                    {dialogMessage}
                                    <br />
                                    برای حذف مطمئن هستید؟
                                </p>
                                <img src={require('../../assets/images/Icons/alert.svg')}
                                     style={{width: 100}} alt='حذف محصول'/>
                            </div>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <div>
                            <Button onClick={closeDialog}
                                    className='dialogActionBtn' >
                                انصراف
                            </Button>
                            <Button onClick={approveAction}
                                    className='dialogActionBtn' >
                                {loadingDialog?
                                    <BeatLoader
                                        size={8}
                                        margin='3px'
                                        color={"#fff"}
                                        loading={true}
                                    />:
                                    'بله'
                                }
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            }
        </Dialog>
    )
}

export default AlertDelete;
