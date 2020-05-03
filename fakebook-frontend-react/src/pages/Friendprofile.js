import React from 'react'
import HeadFakebook from '../component/HeadFakebook'
import { Row, Col, Divider, Button } from 'antd'
import PostList from '../component/PostList'
import { connect } from 'react-redux';
import Axios from '../config/axios.setup';
import { profilepic } from '../redux/actions/actions';


class Profile extends React.Component {
  state = {
    postList:
      [
      ],
    buttonstatus:[]
  }


  componentDidMount = async () => {
    let frindid = this.props.user.friendid.id
    let result = await Axios.get(`/frind-posts/${frindid}`)
    .then(resutl=>{console.log(resutl)
    this.setState({postList:resutl.data})}
    )
    .catch(err=>console.log(err.respone))
    let result2 = await Axios.get(`/user/${frindid}`)
    .then(resutl=>{console.log(resutl)
    this.setState({buttonstatus:resutl.data})}
    )
    .catch(err=>console.log(err.respone))
    
    // this.setState({
    //   postList: result.data,
    //   buttonstatus: result2.data
    // })
    console.log(this.state)

  }


  handleaddfriend = async ()=>{
    let frindid = this.props.user.friendid.id
    await Axios.get(`/friend-request-to/${frindid}`)
    this.componentDidMount()
  }







  renderbutton

  render() {
    return (
      <Col>
        <Row type="flex" justify="center">
          <HeadFakebook
            imageSrc={this.props.user.friendid.profile_img_url}
            name={this.props.user.friendid.name}
          />
          
        </Row>
        <Row  type="flex" justify="center">
          {
            this.props.user.id == this.props.user.friendid.id ?

            null :this.state.buttonstatus.statusName === 'ขอเป็นเพื่อน' ?
            <Button onClick={this.handleaddfriend} type='primary'>{this.state.buttonstatus.statusName}</Button>:
            <Button  type='primary'>{this.state.buttonstatus.statusName}</Button>
          }
  

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
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDisPacthtoProps = {
  profilepic: profilepic
}


export default connect(mapStateToProps, mapDisPacthtoProps)(Profile)