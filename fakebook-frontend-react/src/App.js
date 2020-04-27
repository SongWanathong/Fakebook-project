import React, { useReducer } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import Changepassword from './pages/Changepassword';
import Signup from './pages/authentication/Signup';
import Profile from './pages/Profile';
import Navbar from './component/navbar';
import { Redirect,Switch } from 'react-router';
import Home from './pages/Home';
import Login from './pages/authentication/Login';
import PrivateRoute from './component/privte-route/PrivateRoute';
import { connect } from 'react-redux';



const { Header, Footer, Sider, Content } = Layout;
class App extends React.Component{
render() {
  const role = this.props.user.role
    console.log(role)
  return (
    <Layout>
      <Header style={{height:'100%'}} >
        {role == 'guest' ? null:<Navbar/>}
        
        
        </Header>
      <Content style={{height:'100%'}}>
        <Switch>
          
          <PrivateRoute role={role} />
     
      </Switch>
      </Content>
    </Layout>
  );
}
}

const mapStateToProps =(state)=>{
  return{
    user:state.user
  }
}
export default connect(mapStateToProps,null)(App);
