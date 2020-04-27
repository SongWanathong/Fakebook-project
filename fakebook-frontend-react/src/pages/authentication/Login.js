import React, { Component } from 'react';
import { Row, Col, Input, Button,Form } from 'antd';
import Axios from '../../config/axios.setup';
import { failLoginNotification,successLoginNotification } from '../../component/notification';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux'
import { login } from '../../redux/actions/actions'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = () => {
        const username = this.state.username
        const password = this.state.password
        Axios.post('/loginUser', {
            username, password
        }).then((result) => {
            
            successLoginNotification()
           const token = result.data.token
            const user =jwtDecode(token)
            this.props.login(user, result.data.token)
            // localStorage.setItem('User',user)
            this.props.history.push('/')
            window.location.reload(true);

        }).catch((err) => {
            console.log(err);
            // failLoginNotification(err.response)
        })




    }
    render() {
        return (
            <Row style={{ height: '90vh' }} type='flex' justify='center' align='middle'>
                <Col style={{ marginRight: '20px' }}><img height='250px' src="fb_icon.png"></img></Col>
                <Col >
           
                  
               
                
                  <Form typeof='submit' >
                      
                  
                    <Row style={{ margin: '10px' }}>
                        Username
                    <Input type='username' value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} placeholder="Username" />
                    </Row>
                    <Row style={{ margin: '10px' }}>
                        Password
                    <Input type='password' value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" />
                    </Row>
                    <Row style={{ margin: '10px' }}>
                   
                    <Form.Item >
                        <Button href='/signup' type="link">Signup</Button>
                    </Form.Item>
                    <Form.Item >

                        <Button htmlType='submit' type="primary" onClick={this.handleSubmit}>Login</Button>
                    </Form.Item>
                    </Row>
                  </Form>

                </Col>

            </Row>
        );
    }
}

const mapDispatchToProps = {
    login: login
  }
export default connect(null,mapDispatchToProps)(Login);

