import React, { Component } from 'react';
import { BrowserRouter, Switch, Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import * as actionCreaters from '../store/actions/index'
import {Image,Menu,Dropdown, Message} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import UserDashboard from '../UserDashboard/UserDashboard'
import publicEvents from'../Events/PublicEvents'
import privateEvents from'../Events/PrivateEvents'

class AfterAuthenticationPage extends Component {

  state={
    flashMessage:true
  }

  handleLogout=()=>{
    window.location.href = "http://localhost:3000/"
    const token = localStorage.getItem('token')
    this.props.logOutUser(token)
  }

  handleDropdown=(e)=>{
    console.log(e.target.textContent,"value is here");
    if(e.target.textContent=='Logout'){
      this.handleLogout()
    }else if (e.target.textAlign=='My Profile') {
      // redirect to home page
    }
  }

loginSuccess=()=>{
  setTimeout(
      function() {
          this.setState({
            flashMessage:false
          })
      }
      .bind(this),
      3000
  );
}


  render(){
        if(this.state.flashMessage){
          this.loginSuccess();
        }

        const navStyle={
          textAlign: 'center',
          background: '#fd4400',
          paddingTop: '2.5vh',
          marginBottom: '3px',
          height: '7vh'
        }

        const avatarStyle={
          top:'2vh',
          display: 'inline-flex',
          position: 'absolute',
          alignItems: 'center',
          right:'3%'
        }

        const userNameStyle={
          background: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }

        const options = [
          { key: 1, text: 'My Profile', value:1 ,as: Link, to:'/profile'},
          { key: 2, text: 'Logout', value: 2 }
        ]

        let avatar=null
        let flashMsg=null
        let currentHead=`Connecti`
        
        if(this.state.flashMessage){
          currentHead=(
              <Message style={{position:'absolute',top:'-7px', width:'100vw', zIndex:'1200', background:'orange', color:'white'}}>
                <Message.Header>Login Successful</Message.Header>
              </Message>
          )
        }

        if(this.props.isAuth){
          avatar=(
            <div style={avatarStyle}>
              <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' circular style={{width:'50px',marginRight:'1vw'}} />
              <Menu compact style={userNameStyle}>
                <Dropdown text='User' options={options} simple item onChange={(e)=>this.handleDropdown(e)} />
              </Menu>
            </div>
          )
        }

    return (
      <BrowserRouter>
      <div>
         <div style={navStyle}>
         <div>
            <span style={{fontSize:'30px',fontWeight:'bolder', zIndex:100}}>{currentHead}</span>
            {avatar}
          </div>
          <div style={{zIndex:1000, marginTop:'0.6vh'}}>
            <Link to='/' style={{color:'black',marginRight:'8px',fontSize:'15px',top:'-1vh',position:'relative'}}>Dashboard</Link>
          </div>
         </div>
           <Switch>
               <Route  path='/public_events' component={publicEvents} />
               <Route  path='/private_events' component={privateEvents} />
               <Route path='/' component={UserDashboard} />
           </Switch>
       </div>
      </BrowserRouter>
    );
  }
}

const mapPropsToState = (state) => {
  return{
    isAuth : state.auth.isAuth,
    email : state.auth.email
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      logOutUser : (token) => dispatch(actionCreaters.logOutUserRequest(token)),
  }
}


export default connect(mapPropsToState,mapDispatchToProps)(AfterAuthenticationPage);
