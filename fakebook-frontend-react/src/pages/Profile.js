import React from 'react'
import HeadFakebook from '../component/HeadFakebook'
import { Row, Col, Divider } from 'antd'
import PostList from '../component/PostList'
import { connect } from 'react-redux';
import Axios from '../config/axios.setup';
import { profilepic } from '../redux/actions/actions';


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
     Axios.get('/myid').then(result=>{
console.log(result.data)
   this.props.profilepic(result.data.profile_img_url)

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
            <PostList render={this.componentDidMount} postList={this.state.postList} />
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

const mapDisPacthtoProps={
  profilepic :profilepic
}


export default connect( mapStateToProps,mapDisPacthtoProps)(Profile)