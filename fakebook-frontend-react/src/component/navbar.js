import React, { Component } from 'react';
import { Menu } from 'antd';

class Navbar extends Component {
    render() {
        return (
            <Menu 
            
            theme='dark'
            mode='horizontal'
            >
                    <Menu.Item><a href='/'> login</a></Menu.Item>
                    <Menu.Item><a href='/signup'> Signup</a></Menu.Item>
                    <Menu.Item><a href='/changepassword'> Change Password</a></Menu.Item>
                    <Menu.Item><a href='/profile'> Profile</a></Menu.Item>
                    <Menu.Item><a href='/home'> Home</a></Menu.Item>


            </Menu>
            
        );
    }
}

export default Navbar;
