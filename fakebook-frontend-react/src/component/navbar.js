import React, { Component } from 'react';
import { Menu, Dropdown, Col, Button, Avatar } from 'antd';
import { connect } from 'react-redux'
import { logout } from '../redux/actions/actions';
import { Link, withRouter } from 'react-router-dom';



class Navbar extends Component {

    handlelogout = () => {
        this.props.logout()
        this.props.history.push('/login')
        window.location.reload(true);
    }
    render() {

        const menu = (
            <Menu>
              <Menu.Item>
                <Link to="/friends">
                  ดูรายชื่อเพื่อน
                </Link>
              </Menu.Item>
              {/* <Menu.Item>
                <Link to="/changepassword">
                  เปลี่ยนรหัสผ่าน
                </Link>
              </Menu.Item> */}
              <Menu.Item>
                <Link onClick={() => this.handlelogout()} to='#'>
                  ออกจากระบบ
                </Link>
              </Menu.Item>
            </Menu>
          );
          
        return (
            <>
                <Menu

                  selectedKeys=''
                    theme='dark'
                    mode='horizontal'
                >
                <Menu.Item><a href='/'>All Post</a> </Menu.Item>
                <Menu.Item> <a href='/'>My Post & friends</a></Menu.Item>
                    
                    {/* <Menu.Item style={{ position: 'absolute', right: '20px' }} >
                        <a onClick={() => this.handlelogout()}> ออกจากระบบ</a>
                    </Menu.Item> */}
                    <Menu.Item style={{ position: 'absolute', right: '120px' }} >
                        <Dropdown overlay={menu}>
                            <Col span={6} type="flex" align="start">
                        <Avatar icon="user" src={this.props.user.profilePic} size='large' />

                                <Link to="/my-profile">
                                    <Button  selectedKeys=''  type="link">{
                                    this.props.user.name
                                    
                                    }</Button>
                                </Link>
                            </Col>
                        </Dropdown>
                    </Menu.Item>

                </Menu>

            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

const mapDispatchToProps = {
    logout: logout
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
