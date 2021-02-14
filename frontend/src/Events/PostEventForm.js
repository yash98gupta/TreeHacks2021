import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import {Form,Table} from 'semantic-ui-react'
import ModalSubmit from './ModalSubmit'

class postEventForm extends Component {

  state={}

  handleCreateEvent(params){
    let eventDetail = this.state;
    eventDetail.user = this.props.email;
    eventDetail.gender = this.props.gender;

    this.props.createEvent(eventDetail);

    this.setState({
      event: '',
      event_category: '',
      location: '',
      time: ''
    })
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

    let eventContent=(
    <Table definition>
      <Table.Body>
        <Table.Row>
            <Table.Cell width={2}>Name</Table.Cell>
            <Table.Cell>{this.state.event}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Category</Table.Cell>
            <Table.Cell>{this.state.event_category}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Location</Table.Cell>
            <Table.Cell>{this.state.location}</Table.Cell>
        </Table.Row>
        <Table.Row>
            <Table.Cell>Time</Table.Cell>
            <Table.Cell>{this.state.time}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
    let eventForm=(
      <div>
        <h1>Create Event</h1>
        <Form>
          <Form.Field>
            <label>Event Name</label>
            <input placeholder='Name' onChange={this.handleChangeEvent} value={this.state.event} required={true}/>
          </Form.Field>
          <Form.Field>
            <label>Event Category</label>
            <input placeholder='Category' onChange={this.handleChangeEvent} value={this.state.event_category} required={true}/>
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input placeholder='location' onChange={this.handleChangeEvent} value={this.state.location} required={true}/>
          </Form.Field>
          <Form.Field>
            <label>Time</label>
            <input placeholder='Time' onChange={this.handleChangeEvent} value={this.state.time} required={true}/>
          </Form.Field>
          <ModalSubmit buttonName ='Create' buttonIcon='add' eventHeader={"Please confirm event details!"} eventVerify={eventContent} event={this.state} approvedDetails={(param)=> this.handleCreateEvent(param)} decline='Edit' accept='Approve'/>
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