import React, { Component } from 'react'
import {Container,Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import { Link } from 'react-router-dom'
import ProfileSummary from './ProfileSummary'
import PostEventForm from '../Events/PostEventForm'
import './userDashBoard.css'

class UserDashboard extends Component {

  render() {

    return (
      <Container style={{paddingTop:'7vh'}} id="userDashboardCenter">
        <Button inverted color='orange' as={ Link } to={'/private_events'}>My Events</Button>
        <Button inverted color='orange' as={ Link } to={'/public_events'}>View Event</Button>
        <div style={{display:"inline-flex"}}>
          <div style={{display:"contents", width:"40%"}}>
            <PostEventForm />
          </div>
          <div style={{display:"contents"}}>
            <ProfileSummary gender={this.props.gender} name={this.props.name} contact={this.props.contact} email={this.props.email}/>
          </div>
        </div>
      </Container>
    )
  }
}

const mapPropsToState = (state) => {
  return{
    gender : state.auth.gender,
    name: state.auth.name,
    contact: state.auth.contact,
    email: state.auth.email
  }
}

export default connect(mapPropsToState,null)(UserDashboard)
