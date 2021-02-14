import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import {Accordion, Icon ,Label, Table} from 'semantic-ui-react'
import EventMap from './EventMap'
import Filter from './Filter'
import ModalSubmit from './ModalSubmit'
import './publicEventStyle.css'

class PublicEvents extends Component {

  componentDidMount(){
    this.props.fetchPublicEvents(this.props.email);
  }
    
    state = { 
      activeIndex: null,
    }

    handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index
    let event={
      "event": index
    }
    this.props.checkRequest(event);
    this.setState({ activeIndex: newIndex })
    }

    handleInterested(param){
      let interest={
        "event": param._id.$oid, 
        "owner": param.user,
        "requester": this.props.email
      }
      this.props.sendInterestedRequest(interest);
    };

    handleSubmission(param){
      this.handleInterested(param)
    }

  render(){

    const { activeIndex } = this.state

    let eventList=[]

    let events = this.props.public_events 

      if(events != null && events.length != 0){
        var i
        for(i=0;i<events.length;i++){
          if(this.props.alreadyRequested){
              eventList.push(
                <Accordion fluid styled>
                <Accordion.Title active={activeIndex === events[i]._id.$oid} index={events[i]._id.$oid} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    {events[i].category}
                    <div style={{marginTop:'5px'}}>
                        <span><Label color='blue' horizontal>{events[i].event}</Label></span>
                        <span><Label color='blue' horizontal>{events[i].event_category}</Label></span>
                        <span><Label color='blue' horizontal>{events[i].location}</Label></span>
                        <span><Label color='blue' horizontal>{events[i].status}</Label></span>
                        <span><Label color='blue' horizontal>{events[i].time}</Label></span>
                        <span><Label color='blue' horizontal>{events[i].gender}</Label></span>
                    </div>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === events[i]._id.$oid}>
                    <p>You Have Already Requested</p>
                </Accordion.Content>
                </Accordion>
            )
          }else{
            let eventContent=(
              <Table definition>
                <Table.Body>
                  <Table.Row>
                      <Table.Cell width={2}>Name</Table.Cell>
                      <Table.Cell>{events[i].event}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                      <Table.Cell>Category</Table.Cell>
                      <Table.Cell>{events[i].event_category}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                      <Table.Cell>Location</Table.Cell>
                      <Table.Cell>{events[i].location}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                      <Table.Cell>Time</Table.Cell>
                      <Table.Cell>{events[i].time}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            )

              eventList.push(
                <Accordion fluid styled style={{width:'85%'}}>
                  <Label as='a' color='orange' ribbon style={{left:'-0.7vw'}}>{events[i].event_category}</Label>
                <Accordion.Title active={activeIndex === events[i]._id.$oid} index={events[i]._id.$oid} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    {events[i].event}
                    <div style={{marginTop:'5px'}}>
                        {/* <span><Label color='blue' horizontal>{events[i].event}</Label></span> */}
                        <span><Label color='blue' image style={{margin:'2px'}}>Name<Label.Detail>{events[i].event}</Label.Detail></Label></span>
                        <span><Label color='grey' image style={{margin:'2px'}}>Time<Label.Detail>{events[i].time}</Label.Detail></Label></span>
                        <span><Label color='yellow' image style={{margin:'2px'}}>Location<Label.Detail>{events[i].location}</Label.Detail></Label></span>
                        <span><Label color='olive' image style={{margin:'2px'}}>Gender<Label.Detail>{events[i].gender}</Label.Detail></Label></span>
                        <span><Label color='green' image style={{margin:'2px'}}>Status<Label.Detail>{events[i].status}</Label.Detail></Label></span>
                    </div>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === events[i]._id.$oid}>
                    <p className="interestedModal">
                    <ModalSubmit buttonName ='Interested' buttonIcon='check' eventHeader={"Please confirm your interest!"} eventVerify={eventContent} event={events[i]} approvedDetails={(param)=> this.handleSubmission(param)} decline='Cancel' accept='Request'/>
                    </p>
                </Accordion.Content>
                </Accordion>
            )
          }
        }
    }

  //   <Button animated='fade' style={{margin:'0px', padding:'0px'}}>
  //   <Button.Content visible style={{ padding: '7px',margin: '0px',top: '0px'}}>Interested</Button.Content>
  //   <Button.Content hidden style={{ padding: '7px',margin: '0px',top: '0px'}} onClick={this.handleInterested(events[i])}><Icon name='check' /></Button.Content>
  // </Button>

    let map = null;
    if(eventList.length==0){
      eventList='NO EVENTS AVAILABLE'
      map = 'NO Map Available'
    }else{
      map = <EventMap event={this.props.public_events}/>
    }

    return (
        <div style={{display: "inline-block", width: '100vw'}}>
          <div className="scrollPublicHide" style={{display: "inline-block",width: "30vw", marginRight:"3vw", marginLeft:"3vw", overflowY:'auto', height:'84vh'}}>
            <span style={{marginBottom:'2.5vh', display:'block'}}>
                <h2 style={{display:'inline-block'}}>Public Events</h2>
                <Filter />
            </span>
            {eventList}
          </div>
          <div style={{display: "inline-block",width: "80vw",position: "absolute"}}>
            {map}
          </div>
        </div>
    )
  }
}

const mapPropsToState = (state) => {
  return{
    email : state.auth.email,
    public_events : state.event.public_event,
    alreadyRequested: state.event.alreadyRequested
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      fetchPublicEvents : (email) => dispatch(actionCreaters.fetchPublicEventsRequest(email)),
      sendInterestedRequest : (interestReq) => dispatch(actionCreaters.sendInterestedRequest(interestReq)),
      checkRequest : (e_id) => dispatch(actionCreaters.checkRequest(e_id))
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(PublicEvents);