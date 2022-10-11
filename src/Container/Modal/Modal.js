// import React, {Component} from 'react'
// import {Link} from "react-router-dom";
// import './Modal.scss';
// import {IoMdClose} from "react-icons/io";
// import DialogContent from "@material-ui/core/DialogContent";
// import Dialog from "@material-ui/core/Dialog";
// import DialogContentText from "@material-ui/core/DialogContentText";
//
// class BasicModal extends Component {
//
//     state = {
//         modalStatus: false
//     };
//
//     componentDidMount() {
//         this.setState({
//             modalStatus: true
//         });
//     }
//
//     closeModal() {
//         this.props.hideMyModal();
//         this.setState({
//             modalStatus: false
//         });
//     }
//
//     render() {
//         let modalContent;
//         const {modalStatus} = this.state;
//         const {modalType} = this.props;
//
//         if (modalType === 'menu') {
//             modalContent =
//                 <Dialog
//                     open={modalStatus}
//                     onClose={this.closeModal.bind(this)}
//                     aria-labelledby="alert-dialog-title"
//                     aria-describedby="alert-dialog-description"
//                     className='dialogContainer'
//                 >
//                     <DialogContent className='menuModalDescription mainMenuBackground'>
//                         <DialogContentText id="alert-dialog-description">
//                             <ul>
//                                 <Link to='/'>
//                                     <li className='eachMenuItem' onClick={this.closeModal.bind(this)}>
//                                         {/*<IoMdHome className='eachMenuIcon' />*/}
//                                         خانه
//                                     </li>
//                                 </Link>
//                                 <Link to='/pricing'>
//                                     <li className='eachMenuItem' onClick={this.closeModal.bind(this)}>
//                                         {/*<IoMdListBox className='eachMenuIcon' />*/}
//                                         لیست قیمت
//                                     </li>
//                                 </Link>
//                                 <Link to='/about'>
//                                     <li className='eachMenuItem' onClick={this.closeModal.bind(this)}>
//                                         {/*<IoIosPeople className='eachMenuIcon' />*/}
//                                         درباره ما
//                                     </li>
//                                 </Link>
//                                 <Link to='/contact'>
//                                     <li className='eachMenuItem' onClick={this.closeModal.bind(this)}>
//                                         {/*<IoIosCall className='eachMenuIcon' />*/}
//                                         تماس با ما
//                                     </li>
//                                 </Link>
//                                 <button className='closeModalBtn' onClick={this.closeModal.bind(this)}>
//                                     <IoMdClose/>
//                                 </button>
//                             </ul>
//                         </DialogContentText>
//                     </DialogContent>
//                 </Dialog>
//
//         }
//         return (
//             modalContent
//         )
//     }
// }
//
// export default BasicModal;
