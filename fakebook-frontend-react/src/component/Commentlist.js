import React, { Component } from 'react';
import { Comment } from 'antd';

class Commentlist extends Component {

     renderlist =()=>{
       return this.props.commentList.map(comment=>(
            <Comment
            key={comment.id}
            author={comment.author}
            avatar={comment.avatar}
            content={comment.content}
            datetime={comment.datetime}
          />
        ))
     }
    render() {
        return (
            <div>
                {this.renderlist()}
                
                
            </div>
        );
    }
}

export default Commentlist;
