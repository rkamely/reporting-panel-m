import React, { useState} from 'react';
import {useDispatch} from 'react-redux';
import '../../../../Dashboard.scss';
import { useSnackbar } from 'notistack';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from "@material-ui/core/Button";
import {AiOutlineCloudUpload} from 'react-icons/ai';


const UploadFile = () => {

    const [ isUploading, setIsUploading ] = useState(false);

    const [selectedFileName, setSelectedFileName] = useState('');
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const selectFileFunc = (e) => {
        setSelectedFileName(e.target.files[0].name);
    }
    const uploadExcelFile = (variant) => {
        setIsUploading(true);
        setTimeout(() => {
            setIsUploading(false);
            enqueueSnackbar('فایل با موفقیت  بارگذاری شد' , { variant });
        }, 3000);
    }

    return (
        <div className="inRowFlexItems">
            <div style={{ position: 'relative'}}>
                <input type='file' id='uploadFileInput' onChange={selectFileFunc} className='hiddenInputFileStyle' />
                <label htmlFor='uploadFileInput' className='inputFileLabelStyle'>
                    {selectedFileName !== ''? selectedFileName: 'انتخاب فایل'}
                </label>
                {
                    isUploading?
                    <LinearProgress color="secondary" style={{ position: 'absolute', width: '100%'}} />:
                    null
                }
            </div>
            
            <Button className='simpleUploadFileButton' onClick={() => uploadExcelFile('success')}
                disabled={isUploading}>
                آپلود فایل
                <AiOutlineCloudUpload className='icon' />
            </Button>
        </div>
    )
}

export default UploadFile;