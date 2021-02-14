import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import {Form,Button} from 'semantic-ui-react'

class postEventForm extends Component {

  state={}

  handleCreateEvent=()=>{
    let eventDetail = this.state;
    eventDetail.user = this.props.email;
    eventDetail.gender = this.props.gender;
    this.props.createEvent(eventDetail);
  }

  handleChangeEvent=(e)=>{
    if(e.target.placeholder=='Name'){
      this.setState({
        event : e.target.value
      })
    }else if(e.target.placeholder=='Category'){
      this.setState({
        event_category : e.target.value
      })
    }else if(e.target.placeholder=='location'){
      this.setState({
        location : e.target.value
      })
    }else if(e.target.placeholder=='Time'){
      this.setState({
        time : e.target.value
      })
    }
  }

  render(){

    // #{"event": "Table Tennis", "event_category": "Sports","lat": "37.4216", "lon": "122.1838", "time": "16:00-18:00", "user": "yash@usc.edu"}

    let eventForm=(
      <div>
        <h1>Create Event</h1>
        <Form onSubmit={this.handleCreateEvent}>
          <Form.Field>
            <label>Event Name</label>
            <input placeholder='Name' onChange={this.handleChangeEvent} />
          </Form.Field>
          <Form.Field>
            <label>Event Category</label>
            <input placeholder='Category' onChange={this.handleChangeEvent} />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input placeholder='location' onChange={this.handleChangeEvent} />
          </Form.Field>
          <Form.Field>
            <label>Time</label>
            <input placeholder='Time' onChange={this.handleChangeEvent} />
          </Form.Field>
          <Button type='submit'>Post Event</Button>
        </Form>
      </div>
    )

    return (
        <div style={{marginTop:'3vh', marginBottom:'3vh', width:'50vw', marginRight:'4vw'}}>
            {eventForm}
        </div>
    )
  }
}

const mapPropsToState = (state) => {
  return{
    email : state.auth.email,
    gender : state.auth.gender,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      createEvent : (eventDetails) => dispatch(actionCreaters.createEvent(eventDetails)),
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(postEventForm);