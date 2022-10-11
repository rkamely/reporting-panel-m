import React, {useEffect, useState} from 'react';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {HiPencil, IoMdClose} from "react-icons/all";
import {Button} from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
 

const EditDialog = (props) => {

    const [ scoreValue, setScoreValue ] = useState(null);

    useEffect(() => {
        setScoreValue(props.defaultValue);
    }, []);

    const { openDialog, closeDialog, dialogTitle, defaultType, propsHasChanged, loading} = props;

    const handleChange = (e) => {
        setScoreValue(e.target.value)
    }


    return(
        <Dialog
            open={openDialog}
            onClose={closeDialog} >
            <div className='customErrorModalHeader'>
                <span className='inRowFlexItems'>
                    <HiPencil className='dialogIcon' />
                    <h4>{dialogTitle}</h4>
                </span>
                <IoMdClose onClick={closeDialog} className="closeIcon" />
            </div>
            <DialogContent className='modalContent'>
                <div className="columnDirectionCenterAlign fullWidth">
                    <div className='customLabelAndInputInRow'>
                        <label htmlFor='typeInput'>تایپ</label>
                        <input
                            type='text'
                            id="typeInput"
                            className='inputTextStyleFrame'
                            value={defaultType}
                            disabled={true} />
                    </div>
                    
                    <div className='customLabelAndInputInRow'>
                        <label htmlFor='scoreInput'>درصد امتیاز</label>
                        <input
                            id="scoreInput"
                            type='text'
                            className='inputTextStyleFrame'
                            value={scoreValue}
                            onChange={handleChange} />
                        
                    </div>
                    <Button className="submitDialogButton fullWidth" disabled={loading}
                        onClick={() => propsHasChanged(scoreValue)}>
                            {
                                loading?
                                <BeatLoader
                                    size={8}
                                    margin='3px'
                                    color={"#fff"}
                                    loading={true}
                                />:'تایید'
                            }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditDialog;