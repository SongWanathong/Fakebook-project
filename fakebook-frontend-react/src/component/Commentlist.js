import React, { Component } from 'react';
import { Comment, Col, Row, Button } from 'antd';
import Axios from '../config/axios.setup';
import { connect } from 'react-redux';

class Commentlist extends Component {


  handleClickdeleteComment = (id) => () => {
    console.log(id)
    Axios.delete(`/delete-comment/${id}`).then(result => {
      this.props.render()
    }).catch(err => {
      console.log(err.respone)
    })
  }

  renderlist = () => {
    return this.props.commentList.map(comment => (
      <Row>
        <Comment
          key={comment.id}
          author={comment.user.name}
          avatar={comment.user.profile_img_url}
          content={comment.message}
          datetime={comment.updatedAt}
        />
        <div style={{ position: 'absolute', right: '50px' }} >
          {this.props.user.id == comment.user.id ?
            <Button onClick={this.handleClickdeleteComment(comment.id)} type='link'>delete</Button> : null
          }
        </div>

      </Row>
    ))
  }
  render() {
    console.log(this.props.commentList)
    return (
      <div>



        {this.renderlist()}




      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    user: state.user
  }

}

export default connect(mapStatetoProps, null)(Commentlist);
