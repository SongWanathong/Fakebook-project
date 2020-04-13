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



const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
    <Layout>
      <Header style={{height:'100%'}} ><Navbar/></Header>
      <Content style={{height:'100%'}}>
        <Switch>
          
      
      <Route exact path='/changepassword' component={Changepassword} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />
     {localStorage.getItem('ACCESS_TOKEN')? 
     <Route exact path='/home' component={Home} />
     :null}
     {!localStorage.getItem('ACCESS_TOKEN')? 
     <Route exact path='/' component={Login} />
          :null}
      <Redirect to='/'/>
      </Switch>
      </Content>
    </Layout>
  );
}

export default App;
