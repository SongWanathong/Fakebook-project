import React, { Component } from 'react';
import { Card, Col, Row, Avatar } from 'antd';
import Post from './Post';

class PostList extends Component {


    renderpostlist = () => {
        return this.props.postList.map(post => {
            return <Post
                render={this.props.render}
                post={post}
                //  arhor={post.arhor} message={post.message} imgSrc={post.imgSrc}
                // date={post.date} owner={post.owner} 
                comment={post.commentList}

            />
        })
    }
    render() {
        console.log(this.props.postList)
        return (
            <Row >
                <Col>

                    {this.renderpostlist()}

                </Col>
            </Row>
        );
    }
}

export default PostList;
