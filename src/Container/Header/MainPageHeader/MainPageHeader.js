import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './MainPageHeader.scss';

import BasicModal from '../../Modal/Modal';
import {IoIosMenu} from "react-icons/io";
import Hidden from "@material-ui/core/Hidden";



class MainPageHeader extends Component {

    state = {
        menuModal: false,
        activeStepper: 0,
        togglePriceList: false,
        backdrop: false,
        toggleAccount: false
    };

    toggleModal = () => {
        this.setState({
            menuModal: !this.state.menuModal
        })
    };
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    togglePriceList = () => {
        this.setState({
            togglePriceList: !this.state.togglePriceList
        })
    };
    toggleAccount = () => {
        this.setState({
            toggleAccount: !this.state.toggleAccount,
            backdrop: !this.state.backdrop
        })
    };

    render() {
        return (
            <div>
                {
                    this.state.togglePriceList?
                        <div className='backdropLayer' onClick={this.togglePriceList.bind(this)} />:
                        null
                }
                <div className='mainHeaderOrderFrameRelative'>
                    {
                        this.state.backdrop?
                            <div className='backdropLayer' onClick={this.toggleAccount.bind(this)} />:
                            null
                    }
                    <div className='myContainer mainNavbar'>
                        {
                            this.state.menuModal ?
                                <BasicModal modalType='menu' hideMyModal={this.toggleModal.bind(this)}/> :
                                null
                        }

                        <div className='menuFrame'>
                            <Hidden only={['md', 'lg']}>
                                <div className='mobileRightOfMenu'>
                                    <IoIosMenu onClick={this.toggleModal} className='hamburgerMenuIcon'/>
                                    <Hidden only={['sm', 'xs']}>
                                        <Link to='/'>
                                            <h1>
                                                آفتب
                                            </h1>
                                        </Link>
                                    </Hidden>
                                </div>
                            </Hidden>
                            <Link to='/' className='headerRight'>
                                <img src={require('../../../assets/images/icon/logo2.png')} alt='آفتاب'/>
                                <Hidden only={['sm', 'xs']}>
                                    <h1>
                                        لذت یک خرید شگفت انگیز
                                    </h1>
                                </Hidden>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        hasAuthenticated: state.AppReducer.hasAuthenticated,
        isLogOutPending: state.AppReducer.isLoginPending
    }
};

export default connect(mapStateToProps)(MainPageHeader);
