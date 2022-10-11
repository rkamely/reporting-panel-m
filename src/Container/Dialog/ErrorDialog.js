import React  from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";


const ErrorDialog = (props) => {
    const { openDialog, closeDialog, dialogMessage} = props;
    return(
        <Dialog
            open={openDialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {
                <div>
                    <DialogContent className='modalContent'>
                        <DialogContentText>
                            <p className='simpleTextOnWhite'>
                                {dialogMessage}
                            </p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='dialogActionFrame'>
                        <Button onClick={closeDialog}
                                className='dialogActionBtn' >
                            بستن
                        </Button>
                    </DialogActions>
                </div>
            }
        </Dialog>
    )
}

export default ErrorDialog;
