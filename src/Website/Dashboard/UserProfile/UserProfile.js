import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import {getUserInformation, isLoginPending} from "../../../Redux/Actions/AuthenticationAction";
import DashboardSectionHeader from "../../../Container/Header/DashboardSectionHeader/DashboardSectionHeader";
import {AiOutlineUser} from "react-icons/all";

class UserProfile extends Component{

    state = {
        loadingData: false,
        fullName: '',
        nationalId: '',
        birthDate: '',
        telephone: '',
        phoneNumber: '',
        address: '',
        fieldOf: '',
        city: '',
        state: '',
        bankInfo: '',
        sheba: '',
        errors: {},
        calendarDialog: false,
        selectedDate: '',
        editDataLoading: false,
        changedDate: false
    };

    async componentDidMount() {
        const { fullName, nationalId,phoneNumber, field,
            city, state, bankInfo, sheba, address} = this.props;
        this.setState({
            fullName: fullName,
            nationalId: nationalId,
            phoneNumber: phoneNumber,
            fieldOf: field,
            city: city,
            state: state,
            bankInfo: bankInfo,
            sheba: sheba,
            address: address
        })
    }

    handleChange = (event) => {
        var name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    };

    validateForm = (callback) => {
        let isValid = true;
        let errors = {};
        const { nationalId } = this.state;

        /******************************* Validate username input****************************/
        if (validator.isEmpty(this.state.fullName)) {
            isValid = false;
            errors["fullName"] = 'این مقدار نمی تواند خالی باشد';
        } else if (!validator.isLength(this.state.fullName, {min: 6, max: undefined})) {
            isValid = false;
            errors["fullName"] = 'مقدار وارد شده برای نام حداقل 6 کارکتر باشد';
        }

        // /******************************* Validate NationalID input****************************/
        if (validator.isEmpty(this.state.nationalId)) {
            isValid = false;
            errors["nationalId"] = 'این مقدار نمی تواند خالی باشد';
        } else if (!validator.isLength(this.state.nationalId, {min: 10, max: undefined})) {
            isValid = false;
            errors["nationalId"] = 'مقدار وارد شده برای کد ملی حداقل 10 کارکتر باشد';
        }
        else if (!validator.isDecimal(this.state.nationalId)) {
            isValid = false;
            errors["nationalId"] = 'مقدار وارد شده فقط باید شامل عدد باشد';
        }
        else{
            if(nationalId === '1111111111' || nationalId === '2222222222' || nationalId === '3333333333' ||
                nationalId === '4444444444' || nationalId === '5555555555'  || nationalId === '6666666666'  ||
                nationalId === '7777777777'  || nationalId === '8888888888'  || nationalId === '9999999999' )
            {
                errors["nationalId"] = 'مقدار وارد شده برای کد ملی معتبر نیست';
                isValid = false;
            }else{
                var c = parseInt(nationalId.charAt(9));
                var n = parseInt(nationalId.charAt(0))*10 + parseInt(nationalId.charAt(1))*9 +
                    parseInt(nationalId.charAt(2))*8 + parseInt(nationalId.charAt(3))*7 +
                    parseInt(nationalId.charAt(4))*6 + parseInt(nationalId.charAt(5))*5 +
                    parseInt(nationalId.charAt(6))*4 + parseInt(nationalId.charAt(7))*3 +
                    parseInt(nationalId.charAt(8))*2;
                var r = n - parseInt(n/11)*11;
                if ((r === 0 && r === c) || (r === 1 && c === 1) || (r > 1 && c === 11 - r)) {
                    errors["nationalId"] = '';
                }
                else {
                    errors["nationalId"] = 'مقدار وارد شده برای کد ملی معتبر نیست';
                    isValid = false;
                }
            }
        }

        /******************************* Validate birthDate input****************************/
        if (validator.isEmpty(this.state.selectedDate) && this.props.birthDate === " ") {
            isValid = false;
            errors["birthDate"] = 'تاریخ تولد را انتخاب نکرده اید';
        }

        /******************************* Validate Field input****************************/
        if (validator.isEmpty(this.state.fieldOf)) {
            isValid = false;
            errors["fieldOf"] = 'زمینه کاری فروشگاه را وارد نکرده اید';
        } else if (!validator.isLength(this.state.fieldOf, {min: 3, max: undefined})) {
            errors["fieldOf"] = 'مقدار زمینه کاری فروشگاه  باید حداقل 3 کارکتر باشد';
            isValid = false;
        }

        /******************************* Validate Field input****************************/
        if (validator.isEmpty(this.state.city)) {
            isValid = false;
            errors["city"] = 'استان را وارد نکرده اید';
        } else if (!validator.isLength(this.state.city, {min: 2, max: undefined})) {
            errors["city"] = 'مقدار استان باید حداقل 2 کارکتر باشد';
            isValid = false;
        }

        /******************************* Validate Field input****************************/
        if (validator.isEmpty(this.state.state)) {
            isValid = false;
            errors["state"] = 'شهر را وارد نکرده اید';
        } else if (!validator.isLength(this.state.state, {min: 2, max: undefined})) {
            errors["state"] = 'مقدار شهر باید حداقل 2 کارکتر باشد';
            isValid = false;
        }

        /******************************* Validate Address input****************************/
        if (validator.isEmpty(this.state.address)) {
            isValid = false;
            errors["address"] = 'نشانی را وارد نکرده اید';
        } else if (!validator.isLength(this.state.address, {min: 10, max: undefined})) {
            errors["address"] = 'مقدار نشانی باید حداقل 2 کارکتر باشد';
            isValid = false;
        }


        this.setState({errors}, () => {
            return callback(isValid);
        })
    };

    getUserInformation = async () => {
        const token = await getTokenFromLocalStorage();
        let baseURL = BaseURL();

        axios({
            method: 'POST',
            url: `${baseURL}/seller/profile/info`,
            headers: {
                'Pragma': 'no-cache',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                token: token
            })
        })
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        editDataLoading: false
                    });
                    this.props.dispatch(getUserInformation(response.data.detail));
                    this.props.dispatch(isLoginPending(false));
                    this.props.history.goBack();
                }
            })

            .catch((err) => {
                console.log(err);
            });
    };

    editProfileFunc = async () => {
        const token = await getTokenFromLocalStorage();
        let baseURL = BaseURL();
        const {fullName, nationalId, address, city, state, fieldOf, bankInfo, sheba, selectedDate} = this.state;
        return new Promise(function (resolve, reject) {
            axios({
                method: 'POST',
                url: `${baseURL}/seller/profile/edit`,
                headers: {
                    'Content-Type': 'application/json',
                    'Pragma': 'no-cache'
                },
                data: JSON.stringify({
                    'token': token,
                    'fullname': fullName,
                    'nationalid': nationalId,
                    'address': address,
                    'city': city,
                    'state': state,
                    'field': fieldOf,
                    'bankinfo': bankInfo,
                    'sheba': sheba,
                    'birthdate': selectedDate
                })
            })
                .then((response) => {
                    if (response.status === 200) {
                        resolve(true);
                    } else {
                        reject(false);
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
        // this.setState({
        //     editDataLoading: true
        // });
        // this.validateForm((valid) => {
        //     if (valid) {
        //         this.editProfileFunc()
        //             .then((response) => {
        //                 if (response){
        //                     this.getUserInformation();
        //                 }
        //             })
        //     } else {
        //         this.setState({
        //             editDataLoading: false
        //         });
        //     }

        // });
    };

    formatDate(dateValue) {
        if (!dateValue)
            return '';
        const inputFormat = 'jYYYY-jM-jD';
        var finalDate = dateValue.locale('fa').format(inputFormat);
        this.setState({
            selectedDate: finalDate,
            calendarDialog: false,
            changedDate: true
        });

    }

    render() {

        return(
            <div className='mainPageContentFrame'>
                {
                    this.state.loadingData?
                        <div className='loadingBackDrop'>
                            <BeatLoader
                                size={12}
                                margin='3px'
                                color={"#00a1ff"}
                                loading={true}
                            />
                        </div>:
                        null
                }
                {
                    this.state.calendarDialog?
                        <Dialog
                            open={this.state.calendarDialog}
                            onClose={() => this.setState({ calendarDialog: false })}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle className='customModalHeader'>انتخاب تاریخ</DialogTitle>
                            <DialogContent className='modalContent'>
                                <SelectDatePicker
                                    defaultDate=''
                                    changeDate={(date) => this.formatDate(date)}/>
                            </DialogContent>
                        </Dialog>:
                        null
                }

                <DashboardSectionHeader title='پروفایل' icon={<AiOutlineUser />} color='blueGradiantBox'
                    message='اطلاعات کاربری خود را مشاهده می کنید' />

                <div className='dashboardSectionContentFrame'>
                    <div className='fullWidth inRowFlexItemsSpaceBetween'>
                        <img src={require('../../../assets/images/defaultProfile.jpg')}
                             className='profileAvatarImage'
                             alt='پروفایل' />
                    </div>
                </div>
                <div className='profileFormFrame'>
                    <div className='customProfileInput'>
                        <label htmlFor='fullName'>
                            نام کامل
                        </label>
                        <div className='inputWithError'>
                            <Input
                                type='text'
                                id='fullName'
                                name='fullName'
                                placeholder='نام کامل'
                                defaultValue={this.props.fullName}
                                onChange={this.handleChange}
                            />
                            <span>
                                {
                                    this.state.errors.fullName ?
                                        this.state.errors.fullName :
                                        null
                                }
                            </span>
                        </div>
                    </div>
                    <div className='customProfileInput'>
                        <label htmlFor='nationalId'>
                            شماره ملی
                        </label>
                        <div className='inputWithError'>
                            <Input
                                type='text'
                                id='nationalId'
                                name='nationalId'
                                placeholder='شماره ملی'
                                defaultValue={this.props.nationalId}
                                onChange={this.handleChange}
                            />
                            <span>
                                {
                                    this.state.errors.nationalId ?
                                        this.state.errors.nationalId :
                                        null
                                }
                            </span>
                        </div>
                    </div>
                    <div className='customProfileInput'>
                        <label htmlFor='birthDate'>
                            تاریخ تولد
                        </label>
                        <div className='inputWithError'>
                            <Input
                                type='text'
                                id='birthDate'
                                name='birthDate'
                                placeholder='انتخاب تاریخ'
                                value={
                                    this.state.changedDate?
                                        this.state.selectedDate:
                                        this.props.birthDate
                                }
                                onClick={() => this.setState({ calendarDialog: true })}
                            />
                            <span>
                                {
                                    this.state.errors.birthDate ?
                                        this.state.errors.birthDate :
                                        null
                                }
                            </span>
                        </div>
                    </div>
            
                    <div className='customProfileInput'>
                        <label htmlFor='phoneNumber'>
                            تلفن همراه
                        </label>
                        <Input
                            type='text'
                            id='phoneNumber'
                            disabled={true}
                            name='phoneNumber'
                            placeholder='تلفن همراه'
                            defaultValue={this.props.phoneNumber}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className='inRowFlexItems centerJustifyContent'>
                    <button className='newItemButton' onClick={this.submitForm.bind(this)}>
                        {
                            this.state.editDataLoading?
                                <BeatLoader
                                    size={8}
                                    margin='3px'
                                    color={"#ffffff"}
                                    loading={true}
                                />:
                                'ثبت اطلاعات'
                        }
                    </button>
                </div>

            </div>
        )
    }
}


export default connect()(UserProfile);
