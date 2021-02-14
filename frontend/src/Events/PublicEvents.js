import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import {Accordion, Icon ,Label, Button} from 'semantic-ui-react'
import EventMap from './EventMap'
import Filter from './Filter'

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

    this.setState({ activeIndex: newIndex })
    }

    handleInterested = param => e => {
      let interest={
        "event": param._id.$oid, 
        "owner": param.user,
        "requester": this.props.email
      }
      this.props.sendInterestedRequest(interest);
    };

  render(){

    const { activeIndex } = this.state

    let eventList=[]

    let events = this.props.public_events 

      if(events != null && events.length != 0){
        var i
        for(i=0;i<events.length;i++){
        eventList.push(
            <Accordion fluid styled>
            <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
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
            <Accordion.Content active={activeIndex === i}>
                <p>
                {events[i].event_category}
                <Button animated='fade' style={{margin:'0px', padding:'0px'}}>
                  <Button.Content visible style={{ padding: '7px',margin: '0px',top: '0px'}}>Interested</Button.Content>
                  <Button.Content hidden style={{ padding: '7px',margin: '0px',top: '0px'}} onClick={this.handleInterested(events[i])}><Icon name='check' /></Button.Content>
                </Button>
                </p>
            </Accordion.Content>
            </Accordion>
        )
        }
    }

    let map = null;
    if(eventList.length==0){
      eventList='NO EVENTS AVAILABLE'
      map = 'NO Map Available'
    }else{
      map = <EventMap event={this.props.public_events}/>
    }

    return (
        <div style={{display: "inline-block", width: '100vw'}}>
          <div style={{display: "inline-block",width: "30vw", marginRight:"3vw", marginLeft:"3vw"}}>
            <span style={{marginBottom:'2.5vh', display:'block'}}>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
      fetchPublicEvents : (email) => dispatch(actionCreaters.fetchPublicEventsRequest(email)),
      sendInterestedRequest : (interestReq) => dispatch(actionCreaters.sendInterestedRequest(interestReq))
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(PublicEvents);