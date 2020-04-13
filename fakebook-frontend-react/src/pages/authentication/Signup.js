import React, { Component, useCallback } from 'react';
import { Row, Col, Input, Button, Form } from 'antd';
import Axios from '../../config/axios.setup'
import { successSingupNotification, failSingupNotification } from '../../component/notification';
import { FormProvider } from 'antd/lib/form/context';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
class Signup extends Component {



  handlesubmitform = async (value) => {

    console.log(value)
    const { email, password, name } = value
    await Axios.post('/registerUser', {
      username: email, password, name
    }).then((result) => {
      successSingupNotification()
      console.log(result)
      this.props.history.push('/login')
      

    }).catch((err) => {
      failSingupNotification(err.response.data)
      console.log(err.response.data)
      this.props.history.push('/login')
      
     
     
  
    })
    value.resetFields()

  }

  render() {
    return (
      <Row style={{ height: '95vh' }} type='flex' justify='center' align='middle'>
        <Col style={{ width: '50vh' }} >
          <Row type='flex' justify='center'><img width='145px' src="fb_icon.png"></img>
          </Row>
          <Form onFinish={this.handlesubmitform}

            {...formItemLayout}
          >

            <Row type='flex' justify='center' style={{ marginTop: '30px' }}>
              <Col style={{ width: '100%' }}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                
                  ]}
                  
                >
                  <Input  placeholder="Username" type='Username' 
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'please input your password'
                    }

                  ]}
                  hasFeedback

                >
                  <Input.Password type='password' placeholder="password" 
                  />
                </Form.Item>

                <Form.Item
                  name="Confirm Password"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'please input Confirm Password'
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                      },
                    }),

                  ]}
                  hasFeedback
                >
                  <Input.Password type='password' placeholder="Confirm password" 
                  
                  />
                </Form.Item>

                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                      message: 'please input your Name'
                    }
                  ]}
                >
                  <Input placeholder="Name"
                  
                  />
                </Form.Item>
                
              </Col>

            </Row>

            <Row style={{ marginTop: '15px' }} type='flex' justify='center'>
              <Form.Item>
                <Button htmlType="submit" type="primary">Signup</Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Signup;

