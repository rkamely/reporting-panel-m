import React, { useState } from 'react'
import { Menu, Segment, Sidebar, Responsive } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import { IoMdHome, IoIosPeople, IoMdListBox, IoIosCall, IoIosMenu } from "react-icons/io";


import './Sidebar.scss';

const SidebarMenu = () => {
    const [visible, setVisible] = useState(false);

    const openDrawerBtn = () => {
        setVisible({
            visible: true
        })
    };

    const hideSidebar = () => {
        setVisible(false)
    };

    return (
        <Responsive as={Segment} maxWidth={768} className='sidebarFrameHolder'>
            <Sidebar.Pushable as={Segment}>
                <Sidebar
                    direction='right'
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    onHide={() => setVisible(false)}
                    vertical
                    visible={visible}
                    width='thin'
                    className='sidebarFrame'
                >
                    <Link to='/'>
                        <Menu.Item as='a' className='eachMenuItem' onClick={hideSidebar}>
                            <IoMdHome className='eachMenuIcon' />
                            خانه
                        </Menu.Item>
                    </Link>
                    <Link to='/pricing'>
                        <Menu.Item as='a' className='eachMenuItem' onClick={hideSidebar}>
                            <IoMdListBox className='eachMenuIcon' />
                            لیست قیمت
                        </Menu.Item>
                    </Link>
                    <Link to='/about'>
                        <Menu.Item as='a' className='eachMenuItem' onClick={hideSidebar}>
                            <IoIosPeople className='eachMenuIcon' />
                            درباره ما
                        </Menu.Item>
                    </Link>
                    <Link to='/contact'>
                        <Menu.Item as='a' className='eachMenuItem' onClick={hideSidebar}>
                            <IoIosCall className='eachMenuIcon' />
                            تماس با ما
                        </Menu.Item>
                    </Link>
                </Sidebar>

                <Sidebar.Pusher>
                    <Segment basic>
                        <IoIosMenu onClick={openDrawerBtn} className='hamburgerMenuIcon' />
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        </Responsive>
    )
};

export default SidebarMenu;