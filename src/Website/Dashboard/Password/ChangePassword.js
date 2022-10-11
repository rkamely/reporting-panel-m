import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BeatLoader} from "react-spinners";
import validator from "validator";
import {Input} from "@material-ui/core";

import SelectDatePicker from "../../../Container/DatePicker/SelectDatePicker";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import {getTokenFromLocalStorage} from "../../../AuthorizeStorage";
import BaseURL from "../../../BaseURL";
import {Link} from "react-router-dom";
import {VscKey} from "react-icons/vsc";

class changePassword extends Component {


    state = {
        loadingData: false,
        currentPassword: '',
        newPassword: '',
        rePassword: '',
        errors: {},
        currentPasswordError: '',
        editDataLoading: false,
    };

    async componentDidMount() {
    }

    handleChange = (event) => {
        var name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    validateForm = (callback) => {
        let isValid = true;
        let errors = {};

        /******************************* Validate password input****************************/
        if (validator.isEmpty(this.state.currentPassword)) {
            isValid = false;
            errors["currentPassword"] = 'کلمه عبور فعلی را وارد نکرده اید';
        }

        /******************************* Validate newPassword input****************************/
        if (validator.isEmpty(this.state.newPassword)) {
            isValid = false;
            errors["newPassword"] = 'کلمه عبور جدید را وارد نکرده اید';
        }

        /******************************* Validate rePassword input****************************/
        if (validator.isEmpty(this.state.rePassword)) {
            isValid = false;
            errors["rePassword"] = 'تکرار کلمه عبور جدید را وارد نکرده اید';
        } else if (!validator.equals(this.state.newPassword, this.state.rePassword)) {
            isValid = false;
            errors["rePassword"] = 'کلمه عبور و تکرار آن یکسان نمی باشد'
        }

        this.setState({errors}, () => {
            return callback(isValid);
        })
    };


    editProfileFunc = async () => {
        const token = await getTokenFromLocalStorage();
        let baseURL = BaseURL();
        const {currentPassword, newPassword} = this.state;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'POST',
                url: `${baseURL}/update/profile/password`,
                headers: {
                    'Content-Type': 'application/json',
                    'Pragma': 'no-cache'
                },
                data: JSON.stringify({
                    'token': token,
                    'lastpassword': currentPassword,
                    'newpassword': newPassword
                })
            })
                .then((response) => {
                    if (response.data.status === 200) {
                        resolve(true);
                    } else if (response.data.status === 403) {
                        reject('کلمه عبور فعلی اشتباه است');
                    }
                })

                .catch((err) => {
                    // reject(err.response.data.result[0].errorCode)
                    reject(false);
                });
        });
    };

    submitForm = (e) => {
        e.preventDefault();
        this.setState({
            editDataLoading: true
        });
        this.validateForm((valid) => {
            if (valid) {
                this.editProfileFunc()
                    .then(() => {
                        this.props.history.goBack();
                    })
                    .catch((err) => this.setState({
                        currentPasswordError: err,
                        editDataLoading: false
                    }))
            } else {
                this.setState({
                    editDataLoading: false
                });
            }

        });
    };

    render() {

        return (
            <div className='mainPageContentFrame'>
                {
                    this.state.loadingData ?
                        <div className='loadingBackDrop'>
                            <BeatLoader
                                size={12}
                                margin='3px'
                                color={"#00a1ff"}
                                loading={true}
                            />
                        </div> :
                        null
                }
                {
                    this.state.calendarDialog ?
                        <Dialog
                            open={this.state.calendarDialog}
                            onClose={() => this.setState({calendarDialog: false})}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle className='customModalHeader'>درخواست تسویه</DialogTitle>
                            <DialogContent className='modalContent'>
                                <SelectDatePicker
                                    defaultDate=''
                                    changeDate={(date) => this.formatDate(date)}/>
                            </DialogContent>
                        </Dialog> :
                        null
                }
                <div className='dashboardSectionHeader redGradiantBox'>
                    <h3>تغییر کلمه عبور</h3>
                    <p>
                        برای تغییر کلمه عبور، کلمه عبور قبلی و جدید را وارد کنید
                    </p>
                </div>
                {
                    this.props.profileStatus === '0' ?
                        <div className='failedFormStyle'>
                            <img src={require('../../../assets/images/Icons/failedForm.svg')} alt='تکمیل پروفایل'/>
                            <h3>شما هنوز اطلاعات کاربری خود را تکمیل نکرده اید</h3>
                            <Link className='newItemButton' to='/userProfile'>
                                تکمیل پروفایل
                            </Link>
                        </div> :
                        <div>
                            <div className='dashboardSectionContentFrame'>
                                <div className='fullWidth centerJustifyContent'>
                                    <img src={require('../../../assets/images/Icons/password.svg')}
                                         className='simpleImageSectionHeader'
                                         alt='تغییر کلمه عبور'/>
                                </div>
                            </div>
                            <div className='profileFormFrame'>
                                <div className='customProfileInput'>
                                    <div className='inputWithError'>
                                        <Input
                                            type='text'
                                            id='currentPassword'
                                            name='currentPassword'
                                            placeholder='کلمه عبور فعلی'
                                            value={this.state.currentPassword}
                                            onChange={this.handleChange}
                                        />
                                        <span>
                                {
                                    this.state.errors.currentPassword ?
                                        this.state.errors.currentPassword :
                                        null
                                }
                            </span>
                                        <span>
                                {
                                    this.state.currentPasswordError !== '' ?
                                        this.state.currentPasswordError :
                                        null
                                }
                            </span>

                                    </div>
                                </div>
                                <div className='customProfileInput'/>
                                <div className='customProfileInput'>
                                    <div className='inputWithError'>
                                        <Input
                                            type='text'
                                            id='newPassword'
                                            name='newPassword'
                                            placeholder='کلمه عبور جدید'
                                            value={this.state.newPassword}
                                            onChange={this.handleChange}
                                        />
                                        <span>
                                {
                                    this.state.errors.newPassword ?
                                        this.state.errors.newPassword :
                                        null
                                }
                            </span>
                                    </div>
                                </div>
                                <div className='customProfileInput'/>
                                <div className='customProfileInput'>
                                    <div className='inputWithError'>
                                        <Input
                                            type='text'
                                            id='rePassword'
                                            name='rePassword'
                                            placeholder='تکرار کلمه عبور جدید'
                                            value={this.state.rePassword}
                                            onChange={this.handleChange}
                                        />
                                        <span>
                                {
                                    this.state.errors.rePassword ?
                                        this.state.errors.rePassword :
                                        null
                                }
                            </span>
                                    </div>
                                </div>
                                <div className='customProfileInput'/>

                            </div>
                            <div className='inRowFlexItems centerJustifyContent'>
                                <button className='newItemButton' onClick={this.submitForm.bind(this)}>
                                    {
                                        this.state.editDataLoading ?
                                            <BeatLoader
                                                size={8}
                                                margin='3px'
                                                color={"#ffffff"}
                                                loading={true}
                                            /> :
                                            <div className='inRowFlexItems'>
                                                تغییر کلمه عبور
                                                <VscKey />
                                            </div>
                                    }
                                </button>
                            </div>
                        </div>
                }

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoginPending: state.AppReducer.isLoginPending,
        profileStatus: state.AppReducer.userInfo.status
    }
};


export default connect(mapStateToProps)(changePassword);
