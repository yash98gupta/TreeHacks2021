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
      1500
  );
}


  render(){
        if(this.state.flashMessage){
          this.loginSuccess();
        }

        const navStyle={
          textAlign: 'center',
          background: '#D2691E',
          paddingTop: '2.5vh',
          marginBottom: '3px',
          height: '9.5vh'
        }

        const avatarStyle={
          top:'3.6vh',
          display: 'inline-flex',
          position: 'absolute',
          alignItems: 'center',
          right:'2%',
        }

        const websiteName={
          fontSize: '55px',
          fontWeight: 'bolder',
          zIndex: '100',
          position: 'absolute',
          left: '8vw',
          fontFamily: 'sans-serif',
          fontStyle: 'italic',
          top: '3.3vh',
          fontStretch: 'extra-expanded'
        }

        const userNameStyle={
          background: 'transparent',
          border: 'none',
          boxShadow: 'none'
        }

        const options = [
          { key: 1, text: 'Dashboard', value:1 ,as: Link, to:'/'},
          { key: 2, text: 'Profile', value:1 ,as: Link, to:'/'},
          { key: 3, text: 'Logout', value: 2 }
        ]

        let avatar=null
        let flashMsg=null
        let currentHead=`GetTogether`
        
        if(this.state.flashMessage){
          currentHead=(
              <Message style={{position:'absolute',top:'-7vh', left:'-8vw', width:'100vw', zIndex:'1200', background:'orange', color:'white', padding:'30px'}}>
                <Message.Header>Login Successful</Message.Header>
              </Message>
          )
        }
        let profilePic = <Image src='/images/male.png' circular style={{width:'55px',marginRight:'1vw'}} />

        if(this.props.gender == 'F'){
          profilePic = <Image src='/images/female.jpg' circular style={{width:'55px',marginRight:'1vw'}} />
        }

        if(this.props.isAuth){
          avatar=(
            <div style={avatarStyle}>
              <Menu compact style={userNameStyle}>
                {profilePic}
                <Dropdown text={this.props.name} options={options} simple item onChange={(e)=>this.handleDropdown(e)} />
              </Menu>
            </div>
          )
        }

    return (
      <BrowserRouter>
      <div style={{ background: "#f5f5f5", height: "100vh",width: "100vw",margin: "0px", padding: "0px"}}>
         <div style={navStyle}>
         <div>
            <div>
                <Image src='/images/gt.png' circular style={{marginRight:'1vw',width: '32vh',top: '-3vw',display: 'inline-block',left: '-4vw',position: 'absolute'}}/>
                <Link to='/' style={{textDecoration:'none', color:'black'}}><span style={websiteName}>{currentHead}</span></Link>
              </div>
              {avatar}
            </div>
         </div>
         <br />
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
    email : state.auth.email,
    gender: state.auth.gender,
    name: state.auth.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      logOutUser : (token) => dispatch(actionCreaters.logOutUserRequest(token)),
  }
}


export default connect(mapPropsToState,mapDispatchToProps)(AfterAuthenticationPage);
