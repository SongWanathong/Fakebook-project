import React, { Component } from 'react';
import { Card, Row, Avatar, Col, Button, Dropdown, Menu } from 'antd';
import Text from 'antd/lib/typography/Text';
import Commentlist from './Commentlist';
import TextArea from 'antd/lib/input/TextArea';
import { IconMap, Icon } from 'antd/lib/result';
import Axios from '../config/axios.setup';
import { connect } from 'react-redux';


let { Meta } = Card


class Post extends Component {
    state = {
        inputCommentValue: ''
    }

    handleClickdeletePost = (id) => () => {
        // console.log(id)
        Axios.delete(`/delete-post/${id}`).then(result => {
            this.props.render()
        }).catch(err => {
            console.log(err.respone)
        })
    }

    handleClickAddComment = (id) => () => {
        // console.log(id)
        Axios.post(`/create-comment/${id}`, {
            message: this.state.inputCommentValue
        }).then(result => {
            this.setState(state => ({
                inputCommentValue: ''

            }), () => {
                this.props.render()
            })

        })

    }
    render() {
        let { author, image_url, message, commentList, updatedAt, id } = this.props.post


        return (
            <Card style={{ marginTop: '10px' }} >
                <Row type='flex' style={{ margin: '15px' }}>

                    <Col style={{ height: '100%', width: 'max-content' }}>
                        <Avatar size='large' icon="user" src={author.profile_img_url} />
                    </Col>
                    <Col style={{ width: 'min-content' }}>
                        <Row>
                            <Button type="link"><strong> {author.name}</strong></Button>
                        </Row>
                        <Row style={{ paddingLeft: '15px' }}>
                            <Text>{updatedAt.slice(0, 10)}</Text>
                        </Row>
                    </Col>
                    <div style={{ position: 'absolute', right: '50px' }} >
                        {this.props.user.id == author.id ?
                            <Button onClick={this.handleClickdeletePost(id)} type='link'>delete</Button> : null
                        }
                    </div>
                </Row>


                <Row style={{ margin: '15px' }}><Col>{message}</Col></Row>
                <Row style={{ margin: '15px' }} type='flex' justify='center'><img width='450px' src={image_url}></img></Row>
                <Col>

                    <TextArea rows={3} value={this.state.inputCommentValue} onChange={(e) => { this.setState({ inputCommentValue: e.target.value }) }} />
                    <Button htmlType="submit"
                        onClick={this.handleClickAddComment(id)}
                        type="primary">
                        Add Comment
                            </Button>
                    <Commentlist render={this.props.render} commentList={commentList} />
                </Col>


            </Card>

        )

    }
}
const mapStatetoProps = (state) => {
    return {
        user: state.user
    }

}

export default connect(mapStatetoProps, null)(Post);
