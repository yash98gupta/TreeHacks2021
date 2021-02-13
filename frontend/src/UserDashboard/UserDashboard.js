import React, { Component } from 'react'
import {Container,Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import { Link } from 'react-router-dom'
import ProfileSummary from './ProfileSummary'

class AccordionExampleFluid extends Component {
  render() {

    return (
      <Container style={{paddingTop:'7vh'}}>
        <Button inverted color='orange' as={ Link } to={'/private_events'}>My Events</Button>
        <Button inverted color='orange' as={ Link } to={'/public_events'}>View Event</Button>
        <h2>User Rating, Activity bar, Status</h2>
        <ProfileSummary />
      </Container>
    )
  }
}

const mapPropsToState = (state) => {
  return{
  }
}

export default connect(mapPropsToState,null)(AccordionExampleFluid)
