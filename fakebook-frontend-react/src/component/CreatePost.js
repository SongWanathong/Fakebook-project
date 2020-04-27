import React, { Component } from 'react';
import { Row, Input, Card, Avatar, Col, Divider, Button, Upload } from 'antd';
import { UploadOutlined, FileImageOutlined } from '@ant-design/icons';
import Axios from '../config/axios.setup';

const { TextArea } = Input;


class CreatePost extends Component {

    state = {
        TextArea: '',
        fileList: [],
    }


    handlePost = () => {
        let payload = new FormData()
        payload.append('photoPost', this.state.fileList[0])
        payload.append('message', this.state.TextArea)

        Axios.post('/create-post', payload)
            .then(result => {
                console.log(result)
                this.setState(state => ({
                    TextArea: '',
                    fileList: [],
                }), () => {
                    this.props.render()

                })
            })

    }





    render() {
        let { avatarsrc } = this.props
        const { fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [file],
                }));
                return false;
            },
            fileList,
        }

        return (


            <Card style={{ marginTop: '15px' }} title="Create"  >
                <Row  >
                    <Col   >
                        <Avatar icon="user" src={avatarsrc} size='large' />

                    </Col>
                    <Col  >
                        <TextArea
                            value={this.state.TextArea}
                            onChange={(e) => { this.setState({ TextArea: e.target.value }) }}
                            style={{ width: '500px' }}
                            placeholder="เขียนอะไรบางอย่างสิ" allowClear
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Col>
                </Row>
                <Divider />

                <Row type='flex' justify='space-between'>
                    <Upload {...props} >
                        <Button>
                            <UploadOutlined /> Upload
                        </Button>
                    </Upload>
                    <Button onClick={this.handlePost}>Post</Button>
                </Row>


            </Card>


        );
    }
}

export default CreatePost;
