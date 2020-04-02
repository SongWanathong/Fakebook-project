import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';

class Login extends Component {
    render() {
        return (
            <Row style={{height:'90vh'}} type='flex' justify='center' align='middle'>
                <Col style={{marginRight:'20px'}}><img height='250px' src="fb_icon.png"></img></Col>
                <Col >
                    <Row  style={{margin:'10px'}}>
                        Username
                    <Input placeholder="Username" />
                    </Row>
                    <Row  style={{margin:'10px'}}>
                        Password
                    <Input placeholder="Password" />
                    </Row>
                    <Row style={{margin:'10px'}}>
                        <Button href='/signup' type="link">Signup</Button>
                        <Button type="primary">Login</Button>
                    </Row>
                </Col>

            </Row>
        );
    }
}

export default Login;
