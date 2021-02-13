import React, { Component } from 'react';
import {Divider, Grid, Header,Icon,Segment,Form,Button } from 'semantic-ui-react'
import {Input, TextArea, Select,Image } from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import axios from '../axios/axios-task';


class AuthPage extends Component {

  state={
    forgotPasswordEmail:'',
    forgotPassword:false,
    createUser:{},
    resetPasswordNotification:''
  }

  handleSignInUser=()=>{
    let user = {
      email:this.state.email,
      password:this.state.password
    }
    let x = window.location.search;
    let confirmation_token = x.replace("?confirmation_token=", "");
    this.props.signInUser(user,confirmation_token)
  }

  handleChange=(e)=>{
    if(e.target.placeholder=='Email'){
      this.setState({
        email:e.target.value
      })
    }else{
      this.setState({
        password:e.target.value
      })
    }
  }

  forgotPasswordRequest=()=>{

      axios.post('/auth/reset_req',{email:this.state.forgotPasswordEmail})
    .then((response)=>{
      this.setState({
        resetPasswordNotification:'A Password Reset Link has been mailed to you'
      })
    })
    .catch(
      (error)=>{
      })
  }

  handleForgotPassword=()=>{
    this.setState({
      forgotPassword:!this.state.forgotPassword
    })
  }

  handlePasswordChange=(e)=>{
    this.setState({
      forgotPasswordEmail:e.target.value
    })
  }

  // SignUp functions below

  handleCreateUser=()=>{
    let user = this.state.createUser
    this.props.createUser(user)
  }

  handleSignUpForm=(key,value)=>{
    let x = this.state.createUser;
    x[key]=value
    this.setState({
      createUser:x
    })
  }


  render(){
    const segmentStyle={
      width: '95vw',
      left: '2.5vw',
      height: '88vh'
    }

    const genderOptions = [
      { key: 'm', text: 'Male', value: 'male' },
      { key: 'f', text: 'Female', value: 'female' },
    ]


      let submitButton = 'Sign Up'
      let PasswordField = <Form.Input label="Password (minimum of 6 length)" type='password' placeholder='Password' onChange={(e)=>this.handleSignUpForm('password',e.target.value)} required="true" />
      let confirmPassword = <Form.Input label="Confirm Password" type='password' placeholder='Confirm Password' onChange={(e)=>this.handleSignUpForm('confirmPassword',e.target.value)} required="true" />

    let displayForm=null
    if(!this.state.forgotPassword){
      displayForm=(
        <div>
          <h1>Sign In</h1>
          <span style={{color:'red'}}>{this.props.errorMsgLogIn}</span>
          <Form onSubmit={this.handleSignInUser}>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Email' onChange={this.handleChange} required="true" />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='password' type={'password'} onChange={this.handleChange} required="true" />
            </Form.Field>
            <Button type='submit'>Submit</Button>
            <p></p>
            <a onClick={this.handleForgotPassword}>Forgot your password?</a>
          </Form>
        </div>
      )
    }else{
      displayForm=(
        <div>
          <h1>Reset Password</h1>
          <p style={{color:'red',marginBottom:'10px'}}>{this.state.resetPasswordNotification}</p>
          <Form onSubmit={this.forgotPasswordRequest}>
            <Form.Field>
              <label>Email</label>
              <input placeholder='Reset password Email' onChange={this.handlePasswordChange} value={this.state.forgotPasswordEmail} required="true" />
            </Form.Field>
            <Button type='submit'>Reset Password</Button>
            <p></p>
            <a onClick={this.handleForgotPassword}>SignIn</a>
          </Form>
        </div>
      )
    }

    return(
      <Segment placeholder style={segmentStyle}>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>

          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='signup' />
              </Header>
              <Form onSubmit={this.handleCreateUser}>
              <h1>SignUp</h1>
              <span style={{color:'red'}}>{this.props.errorMsg}</span>
              <Form.Group widths='equal'>
                <Form.Field control={Input} label='First name' placeholder='First name' onChange={(e)=>this.handleSignUpForm('FirstName',e.target.value)} required="true" />
                <Form.Field control={Input} label='Last name' placeholder='Last name' onChange={(e)=>this.handleSignUpForm('LastName',e.target.value)} required="true" />
                <Form.Field control={Select} label='Gender' options={genderOptions} placeholder='Gender' onChange={(e)=>this.handleSignUpForm('Gender',e.target.textContent)} required="true" />
              </Form.Group>

              <Form.Group widths='equal'>
                <Form.Input
                  fluid
                  type='email'
                  label='Email'
                  placeholder='abc@example.com'
                  onChange={(e)=>this.handleSignUpForm('email',e.target.value)}
                  required="true"
                />
              </Form.Group>

                    {PasswordField}
                    {confirmPassword}
                  <Button animated type="submit">
                    <Button.Content visible>{submitButton}<Icon name='user plus' size={'small'} /></Button.Content>
                    <Button.Content hidden>
                      <Icon name='checkmark' />
                    </Button.Content>
                  </Button>
              </Form>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon name='sign-in' />
              </Header>
              {displayForm}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapPropsToState = (state) => {
  return{
    errorMsg : state.auth.errorMsg,
    errorMsgLogIn : state.auth.errorMsgLogIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      signInUser : (newUserDetails,confirmation_token) => dispatch(actionCreaters.signInUserRequest(newUserDetails,confirmation_token)),
      createUser : (newUserDetails) => dispatch(actionCreaters.createUserRequest(newUserDetails)),
  }
}


export default connect(mapPropsToState,mapDispatchToProps)(AuthPage);
