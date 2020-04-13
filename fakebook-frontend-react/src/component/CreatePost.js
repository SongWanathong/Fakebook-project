import React, { Component } from 'react';
import { Row, Input, Card, Avatar, Col, Divider, Button,Upload } from 'antd';
import { UploadOutlined,FileImageOutlined} from '@ant-design/icons';

const { TextArea } = Input;


class CreatePost extends Component {

    render() {
        let { avatarsrc } = this.props
        return (


            <Card title="Create" style={{width:'650px'}}  >
                <Row  >
                    <Col   >
                        <Avatar icon="user" src={avatarsrc} size='large' />

                    </Col>
                    <Col  >
                        <TextArea style={{width:'500px'}} placeholder="เขียนอะไรบางอย่างสิ" allowClear
                            autoSize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Col>
                </Row>
                <Divider />

                <Upload >
                    <Button>
                       
                        <FileImageOutlined /> Click to Upload
                     </Button>
                </Upload>


            </Card>


        );
    }
}

export default CreatePost;
