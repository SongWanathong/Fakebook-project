import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import CreatePost from '../component/CreatePost';
import PostList from '../component/PostList';
import Axios from '../config/axios.setup';
import jwtDecode from 'jwt-decode';

class Home extends Component {
    state = {
        postList:
          [
            // {
            //   id: 1,
            //   author: {
            //     name: "Nuttachai Kulthammanit",
            //     profilePic: "https://scontent.fbkk8-3.fna.fbcdn.net/v/t1.0-9/s960x960/74610637_2449857785332716_3986820112819683328_o.jpg?_nc_cat=111&_nc_sid=9e2e56&_nc_eui2=AeFLr84i2-uTG1oLjYBSMp1pBqJslMjTVNWAcwNYSab43UdgFZmoP5K3712ErXvst_B9H2r7yM1BeY4LOVSYwHh30wY9v5Q_5notHWKC2qx-Fw&_nc_ohc=deErvTbM4rQAX9-jrdr&_nc_ht=scontent.fbkk8-3.fna&_nc_tp=7&oh=469eb4835cb21bff24147eb2ee4f1b66&oe=5EAA4AD2"
            //   },
            //   message: "สวัสดีครับพี่น้องค้าบ ถึงแม้ผมจะฉลาดแต่ผมก็นิสัยดีนะค้าบ",
            //   imgSrc: "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-9/s960x960/75339578_1007353639618320_4097496854487367680_o.jpg?_nc_cat=105&_nc_sid=2d5d41&_nc_eui2=AeF6DnXgEWbdNim3y2vK0g-BMPrKw0JLGBK568L_AedxzWxA12j32uXE1uWTVFNdT3fCc972Tzg5TrdEGV8ddiiBg23PfEwXC3Zs7cM69qYojg&_nc_ohc=t6Km61qqBokAX9ng3NF&_nc_ht=scontent.fbkk12-2.fna&_nc_tp=7&oh=d40f9a068ca35ea8f6516a421f3cdf94&oe=5EABDBAC",
            //   date: "15 ชมที่แล้ว",
            //   commentList:
            //     [
            //       {
            //         id: 1,
            //         author: "Nuttachai Kulthammanit",
            //         avatar: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/60502088_2387153554670364_6354286041486065664_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeFsDB2UdXYJOmxlc7XHzkzqNOzxGlEgfZG5FI17zVVISQ_lrLHExgAQT-rz3CxvNIcBeeVY6z8Czh9QjoUmKYjAIImpH-rxKWLy7NUasMiehw&_nc_ohc=irYZP2KZht0AX8uaCu8&_nc_ht=scontent.fbkk12-3.fna&oh=7183919102d92a606926b629430bffb0&oe=5EABE74A",
            //         content: "I met the singer at the Brayan Star Tour and he was so nice and cuter in person! :)",
            //         datetime: "2 Days ago",
            //       },
            //       {
            //         id: 2,
            //         author: "Kittinun Postinun",
            //         avatar: "https://frontlinecloud.zendesk.com/system/photos/3600/0268/6511/shiro.jpg",
            //         content: "Your Frontline workspace features a Mock Phone which you can use to test the functionality in your workspace without needing to connect and send real SMS messages.",
            //         datetime: "2 Days ago",
            //       },
            //       {
            //         id: 3,
            //         author: "London English",
            //         avatar: "https://1.bp.blogspot.com/-ecxQPOn9U8s/XPaNhsTr2ZI/AAAAAAAABcc/O6H9aHK4ImYoSxJq7Gc-nCu5lLufFIC-QCLcBGAs/s1600/Hidden-Face-Girl-Profile-Pictures-for-Whatsapp.jpg",
            //         content: "No real SMS messages are actually created, however, which means you do not need to spend money on SMS",
            //         datetime: "1 Days ago",
            //       }
            //     ],
            //   owner: {
            //     name: "Nuttachai Kulthammanit",
            //     profilePic: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/60502088_2387153554670364_6354286041486065664_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeFsDB2UdXYJOmxlc7XHzkzqNOzxGlEgfZG5FI17zVVISQ_lrLHExgAQT-rz3CxvNIcBeeVY6z8Czh9QjoUmKYjAIImpH-rxKWLy7NUasMiehw&_nc_ohc=irYZP2KZht0AX8uaCu8&_nc_ht=scontent.fbkk12-3.fna&oh=7183919102d92a606926b629430bffb0&oe=5EABE74A"
            //   },
            // },
            // {
            //   id: 2,
            //   author: {
            //     name: "Apiwut Kittiparkun",
            //     profilePic: "https://scontent.fbkk12-1.fna.fbcdn.net/v/t1.0-9/s960x960/71759145_971704146516603_2353769548542377984_o.jpg?_nc_cat=101&_nc_sid=9e2e56&_nc_eui2=AeG0C5tF4AYMIx-PRWQnH1lPpJ3aMe2tkNNwe77AxHa8V_najdlc0U2j717_BhB02HxJiRzglUVYj5fsgiHY_XMo_sqvAfSRokCk26xNzsTCJQ&_nc_ohc=exbxet3qZ1wAX8Yw6C_&_nc_ht=scontent.fbkk12-1.fna&_nc_tp=7&oh=e9e9eff5aa96926589ec799ecad49725&oe=5EACA1BF"
            //   },
            //   message: "img elements must have an alt prop, either with meaningful text, or an empty string for decorative images",
            //   imgSrc: "https://scontent.fbkk8-2.fna.fbcdn.net/v/t1.0-9/p960x960/74932095_2478819532436541_4103675727583379456_o.jpg?_nc_cat=107&_nc_sid=9e2e56&_nc_eui2=AeGcgSVXTAT-ZFDNG3eK59t3BMwNbz83FmfiVR_iPHfXobGIjFrY7qck-HfoM3EDvAl9Bld4EajmG1Gl4dgDmtpsXN-8venOV-eh1C6osk7Muw&_nc_ohc=1m1Nqxlyi-kAX-Ga3zs&_nc_ht=scontent.fbkk8-2.fna&_nc_tp=6&oh=d305256b262fe86e510a89eb0bc24728&oe=5EAB27F1",
            //   date: "15 ชมที่แล้ว",
            //   commentList:
            //     [
            //       {
            //         id: 4,
            //         author: "Nuttachai Kulthammanit",
            //         avatar: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/60502088_2387153554670364_6354286041486065664_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeFsDB2UdXYJOmxlc7XHzkzqNOzxGlEgfZG5FI17zVVISQ_lrLHExgAQT-rz3CxvNIcBeeVY6z8Czh9QjoUmKYjAIImpH-rxKWLy7NUasMiehw&_nc_ohc=irYZP2KZht0AX8uaCu8&_nc_ht=scontent.fbkk12-3.fna&oh=7183919102d92a606926b629430bffb0&oe=5EABE74A",
            //         content: "I met the singer at the Brayan Star Tour and he was so nice and cuter in person! :)",
            //         datetime: "2 Days ago",
            //       },
            //       {
            //         id: 5,
            //         author: "Nuttachai Kulthammanit",
            //         avatar: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/60502088_2387153554670364_6354286041486065664_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeFsDB2UdXYJOmxlc7XHzkzqNOzxGlEgfZG5FI17zVVISQ_lrLHExgAQT-rz3CxvNIcBeeVY6z8Czh9QjoUmKYjAIImpH-rxKWLy7NUasMiehw&_nc_ohc=irYZP2KZht0AX8uaCu8&_nc_ht=scontent.fbkk12-3.fna&oh=7183919102d92a606926b629430bffb0&oe=5EABE74A",
            //         content: "Hold on just a little while longer.",
            //         datetime: "1 Days ago",
            //       },
            //       {
            //         id: 6,
            //         author: "Nuttachai Kulthammanit",
            //         avatar: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/60502088_2387153554670364_6354286041486065664_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeFsDB2UdXYJOmxlc7XHzkzqNOzxGlEgfZG5FI17zVVISQ_lrLHExgAQT-rz3CxvNIcBeeVY6z8Czh9QjoUmKYjAIImpH-rxKWLy7NUasMiehw&_nc_ohc=irYZP2KZht0AX8uaCu8&_nc_ht=scontent.fbkk12-3.fna&oh=7183919102d92a606926b629430bffb0&oe=5EABE74A",
            //         content: "อาหารทำให้เรามาชีวิต แต่ความฝันจะทำให้เราอยากมีชีวิต",
            //         datetime: "15 Hours ago",
            //       }
            //     ],
            //   owner: {
            //     name: "Nuttachai Kulthammanit",
            //     profilePic: "https://scontent.fbkk12-3.fna.fbcdn.net/v/t1.0-9/60502088_2387153554670364_6354286041486065664_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeFsDB2UdXYJOmxlc7XHzkzqNOzxGlEgfZG5FI17zVVISQ_lrLHExgAQT-rz3CxvNIcBeeVY6z8Czh9QjoUmKYjAIImpH-rxKWLy7NUasMiehw&_nc_ohc=irYZP2KZht0AX8uaCu8&_nc_ht=scontent.fbkk12-3.fna&oh=7183919102d92a606926b629430bffb0&oe=5EABE74A"
            //   },
            // }
          ],
      }

      componentDidMount(){
          
           console.log(localStorage)
          Axios.get('/post-list').then((response)=>{
              console.log(response.data)
          })
      }

      onClickUserDecode =()=>{
          const user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'))
          console.log(user)
      }
    render() {
        return (
            <Row   type='flex' justify='center'>
                <Col>
                   
                <CreatePost avatarsrc='https://scontent.fbkk8-3.fna.fbcdn.net/v/t1.0-9/s960x960/74610637_2449857785332716_3986820112819683328_o.jpg?_nc_cat=111&_nc_sid=9e2e56&_nc_eui2=AeFLr84i2-uTG1oLjYBSMp1pBqJslMjTVNWAcwNYSab43UdgFZmoP5K3712ErXvst_B9H2r7yM1BeY4LOVSYwHh30wY9v5Q_5notHWKC2qx-Fw&_nc_ohc=deErvTbM4rQAX9-jrdr&_nc_ht=scontent.fbkk8-3.fna&_nc_tp=7&oh=469eb4835cb21bff24147eb2ee4f1b66&oe=5EAA4AD2' />
                   
                  
                        <PostList postList={this.state.postList} />
                    

                </Col>
                <Row>
                    <Button onClick={this.onClickUserDecode}>onclick</Button>
                </Row>
            </Row>
        );
    }
}

export default Home;
