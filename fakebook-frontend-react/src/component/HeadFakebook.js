import React from 'react'
import { Row, Col, Avatar, Upload } from 'antd'
import Title from 'antd/lib/typography/Title'
import '../index.css';
import { CameraOutlined } from '@ant-design/icons';
import Axios from '../config/axios.setup';
import { connect } from 'react-redux';
import { profilepic } from '../redux/actions/actions';


class HeadFakebook extends React.Component {
  state = { fileList: [] }


  componentDidUpdate = () => {
    this.handleuploadprofile()
  }
  handleuploadprofile = () => {

    let payload = new FormData()
        payload.append('photoPost', this.state.fileList[0])
        Axios.put('/upload-profilepic', payload)
            .then(result => {
              
                this.props.profilepic(result.data.profile_img_url)
                window.location.reload();
  
            })
  }

  render() {
    const { fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [file],
        }));
        return false;
      },
      fileList,
    }



    return (
      <Col md={12} sm={16} xs={20} style={{ paddingTop: '20px' }}>
        <Row type="flex">
          <Col md={8} sm={8} xs={8} type="flex" align="end" style={{ paddingRight: '15px' }}>
            {/* <Avatar
              size={128}
              src={this.props.imageSrc}
            /> */}
            <Upload {...props} >
              <div className="container">
                <Avatar className="image"
                  size={200}
                  src={this.props.imageSrc}
                />
                <div className="overlay">
                  <CameraOutlined />
                </div>
              </div>
            </Upload>


          </Col>
          <Col md={16} sm={16} xs={16} type="flex" align="start">
            <Row type="flex" style={{ height: '100%' }} align="middle">
              <Title level={1}>{this.props.name}</Title>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }
}

const mapDisPacthtoProps={
  profilepic :profilepic
}

export default connect(null,mapDisPacthtoProps)(HeadFakebook)