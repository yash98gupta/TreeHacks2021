import React, { Component } from 'react';
import * as actionCreaters from '../store/actions/index'
import {connect} from 'react-redux'
import { Accordion, Icon,Label,} from 'semantic-ui-react'
import EventRequest from './EventRequest'

class PrivateEvents extends Component {

  componentDidMount(){
    this.props.fetchPrivateEvents({"user":this.props.email});
  }
    
    state = { activeIndex: null }

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

    acceptDeclineReq = (param,k) => e => {
      let acceptReq={
        "event": param._id.$oid,
        "owner": param.user,
        "requester": this.props.email,
        "decision": k
      }
      this.props.acceptDeclineReq(acceptReq);
    };

  render(){

    const { activeIndex } = this.state
    let eventList=[]

    let events = this.props.private_event 

      if(events != null && events.length != 0){
        var i
        let accordianOpen = null
        for(i=0;i<events.length;i++){
        eventList.push(
            <Accordion fluid styled>
            <Accordion.Title active={activeIndex === events[i]._id.$oid} index={events[i]._id.$oid} onClick={this.handleClick}>
                <Icon name='dropdown' />
                {events[i].category}
                <div style={{marginTop:'5px'}}>
                    <span><Label color='blue' horizontal>{events[i].event}</Label></span>
                    <span><Label color='blue' horizontal>{events[i].event_category}</Label></span>
                    <span><Label color='blue' horizontal>{events[i].lat}</Label></span>
                    <span><Label color='blue' horizontal>{events[i].lon}</Label></span>
                    <span><Label color='blue' horizontal>{events[i].status}</Label></span>
                    <span><Label color='blue' horizontal>{events[i].time}</Label></span>
                    <span><Label color='blue' horizontal>{events[i].user}</Label></span>
                </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === events[i]._id.$oid}>
                <p>
                  <EventRequest invitations = {events[i].eventReq}/>
                </p>
              </Accordion.Content>
            </Accordion>
        )
        }
    }

    if(eventList.length==0){
      eventList='NO EVENTS AVAILABLE'
    }

    return (
      <div>
        {eventList}
      </div>
    )
  }
}

const mapPropsToState = (state) => {
  return{
    email : state.auth.email,
    private_event : state.event.private_event,
    requesterEvent : state.event.requesterEvent
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    fetchPrivateEvents : (email) => dispatch(actionCreaters.fetchPrivateEvents(email)),
    checkRequest : (e_id) => dispatch(actionCreaters.checkRequest(e_id))
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(PrivateEvents);

