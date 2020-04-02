import React, { Component } from 'react';
import { Card, Row, Avatar, Col, Button } from 'antd';
import Text from 'antd/lib/typography/Text';
import Commentlist from './Commentlist';
import TextArea from 'antd/lib/input/TextArea';


let { Meta } = Card

class Post extends Component {
    render() {
        let { author, imgSrc, message, commentList, date } = this.props.post

        return (
            <Card  style={{ marginTop: '10px' }}>
                <Row type='flex' style={{ margin: '15px' }}>
                    <Col style={{ height: '100%', width: 'max-content' }}> <Avatar size='large' icon="user" src={author.profilePic} /></Col>
                    <Col style={{ width: 'min-content' }}>
                        <Row>
                            <Button type="link"><strong> {author.name}</strong></Button>
                        </Row>
                        <Row style={{ paddingLeft: '15px' }}>
                            <Text>{date}</Text>
                        </Row>


                    </Col>
                </Row>

                <Row style={{ margin: '15px' }}><Col>{message}</Col></Row>
                <Row style={{ margin: '15px' }} type='flex' justify='center'><img width='450px' src={imgSrc}></img></Row>
                    <Col>
                      
                            <TextArea rows={3} />
                            <Button htmlType="submit"
                                //  loading={} onClick={} 
                                type="primary">
                                Add Comment
                            </Button>
                        <Commentlist commentList={commentList} />
                        
                    </Col>
            </Card>

        )

    }
}

export default Post;
