import React from 'react'
import { Card, Row, Col, Avatar, Button } from 'antd'
import Axios from '../../config/axios.setup'

export default class FriendComponent extends React.Component {
  handleDeleteFriend = (id) => {
    console.log(id)
    Axios.delete(`/delete-friend/${id}`)
      .then(result => {
        console.log(result)
        this.props.fetchFriendsList()
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleAcceptFriend = (id) => {
    console.log(id)
    Axios.get(`/accep-friend-request/${id}`)
      .then(result => {
        console.log(result)
        this.props.fetchRequestList()
      })
      .catch(err => {
        console.error(err);
      })
  }

  handleDenyFriend = (id) => {
    console.log(id)
    Axios.get(`/deny-friend-request/${id}`)
      .then(result => {
        console.log(result)
        this.props.fetchRequestList()
      })
      .catch(err => {
        console.error(err.response);
      })
  }

  renderButton = () => {
    if (this.props.type == "friend") {
      return <Button onClick={() => this.handleDeleteFriend(this.props.friendInfo.id)}>ลบเพื่อน</Button>
    } else if ((this.props.type == "request")) {
      return (
        <div>
          <Button onClick={() => this.handleAcceptFriend(this.props.friendInfo.id)}>ยอมรับเพื่อน</Button>
          <Button onClick={() => this.handleDenyFriend(this.props.friendInfo.id)}>ปฏิเสธเพื่อน</Button>
        </div>
      )
    }
  }

  render() {
    console.log(this.props.friendInfo)
    return (
      <Row>
        <Card
          hoverable
        >
          <Row type="flex" justify="center">
            <Col>
              <Avatar src={this.props.friendInfo.profile_img_url} shape="square" size={64} icon="user" />
            </Col>
            <Col type="flex" align="center" style={{ marginLeft: '10px' }}>
              <Row type="flex" justify="center">
                <Button type="link"><strong>{this.props.friendInfo.name}</strong></Button>
              </Row>
              <Row type="flex" justify="center">
                <Col span={24}>
                  {this.renderButton()}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Row>
    )
  }
}