import React from 'react'
import HeadFakebook from '../component/HeadFakebook'
import { Row, Col, Divider } from 'antd'
import PostList from '../component/PostList'
import { connect } from 'react-redux';
import Axios from '../config/axios.setup';

 class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      postList:
        [
        ],
    }
  }

  componentDidMount =async ()=>{
      
   let result = await Axios.get('/my-posts')
   this.setState({
    postList:result.data
   })

  }

  render() {
    return (
      <Col>
        <Row type="flex" justify="center">
          <HeadFakebook
            imageSrc={this.props.user.profilePic}
            name={this.props.user.name}
          />
        </Row>
        <Row type="flex" justify="center">
          <Col md={18} sm={20} xs={22}>
            <Divider />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col md={12} sm={16} xs={24}>
            <PostList postList={this.state.postList} />
          </Col>
        </Row>
      </Col>
    )
  }
}
const mapStateToProps = (state)=>{
  return{
    user : state.user
  }
}

export default connect( mapStateToProps,null)(Profile)