import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'antd';

class Signup extends Component {
    render() {
        return (
            <Row style={{ height: '95vh' }} type='flex' justify='center' align='middle'>
                <Col>
                    <Row type='flex' justify='center'><img width='145px' src="fb_icon.png"></img></Row>
                    <Row type='flex' style={{width:'30vh',marginTop:'15px'}}>
                        <Col span={24}> Username:
                   <Input placeholder="Username" />
                        </Col>
                        <Col span={24}>Password:
                   <Input type='password' placeholder="Username" />
                        </Col >
                        <Col span={24}>
                            Confirem Password:
                            <Input type='password' placeholder="Username" />
                        </Col>
                        <Col span={24}>Name:
                   <Input placeholder="Name" />
                        
                        </Col>

                    </Row>

                    <Row style={{marginTop:'15px'}} type='flex' justify='center'>
                        <Button type="primary">Signup</Button>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default Signup;
