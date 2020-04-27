import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import CreatePost from '../component/CreatePost';
import PostList from '../component/PostList';
import Axios from '../config/axios.setup';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux'


class Home extends Component {
    state = {
        postList:
            [

            ],
    }

    componentDidMount = async () => {

        let result = Axios.get('/post-list').then((response) => {
            console.log(response.data)
            this.setState({ postList: response.data })
        })

    }


    render() {
        return (
            <Row type='flex' justify='center'>
                <Col>

                    <CreatePost
                     render={this.componentDidMount}   avatarsrc={this.props.user.profilePic}
                    />

                    <PostList render={this.componentDidMount} postList={this.state.postList} />

                </Col>

            </Row>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, null)(Home);
