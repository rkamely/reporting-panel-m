import React from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import SelectDatePicker from "../DatePicker/SelectDatePicker";
import Dialog from "@material-ui/core/Dialog";
import {BsCalendar, IoMdClose} from "react-icons/all";
import { RangeDatePicker } from "jalali-react-datepicker";


const PersianDatePicker = (props) => {

    const { openDialog, closeDialog, formatDateFunc } = props;
    return(
        <Dialog
            open={openDialog}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div className='customModalHeader'>
                <span className='inRowFlexItems'>
                    <BsCalendar />
                    <h4>انتخاب تاریخ</h4>
                </span>
                <IoMdClose onClick={closeDialog} />
            </div>
            <DialogContent className='modalContent'>
                <SelectDatePicker
                    defaultDate=''
                    changeDate={(date) => formatDateFunc( date)}/>
                {/* <RangeDatePicker  /> */}
            </DialogContent>
        </Dialog>
    )
}

export default PersianDatePicker;