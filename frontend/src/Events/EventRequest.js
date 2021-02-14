import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreaters from '../store/actions/index'
import {Icon,Button} from 'semantic-ui-react'

class EventRequest extends Component {

  acceptDeclineReq = (param,k) => e => {
    let acceptReq={
      "owner": param.owner,
      "requester": param.requester,
      "decision": k,
      "reqid": param._id.$oid
    }
    this.props.acceptDeclineReq(acceptReq);
  };

  render() {

    let invitations = this.props.invitations
    console.log(invitations)
    let pendingRequests=[];
    let approvedRequests=[];
    if(invitations != null && invitations.length != 0){
      let i;
      for(i=0;i<invitations.length;i++){
        if(invitations[i].decision == ''){
          pendingRequests.push(
            <div style={{display:'inline-flex',width: '35%',justifyContent: 'flex-start',marginRight: '65%', marginBottom: '2%'}}>
              <div style={{position:'relative',top:'1vh'}}>{invitations[i].requester}</div>
              <div style={{left:'20vw', position:'absolute'}}>
                <Button.Group>
                  <Button positive animated='fade' style={{margin:'0px', padding:'0px', width:'90%'}}>
                    <Button.Content  visible style={{ padding: '0px',margin: '0px',top: '0px'}}>Accept</Button.Content>
                    <Button.Content  hidden style={{ padding: '0px',margin: '0px',top:'10px'}} onClick={this.acceptDeclineReq(invitations[i],'Yes')}><Icon name='check' /></Button.Content>
                  </Button>
                  <Button.Or />
                  <Button animated='fade' style={{margin:'0px', padding:'0px', width:'90%'}}>
                    <Button.Content visible style={{ padding: '0px',margin: '0px',top: '0px'}}>Decline</Button.Content>
                    <Button.Content hidden style={{ padding: '0px',margin: '0px',top: '10px'}} onClick={this.acceptDeclineReq(invitations[i],'No')}><Icon name='close' /></Button.Content>
                  </Button>
                </Button.Group>
              </div>
            </div>
          )
        }else if(invitations[i].decision == 'Yes'){
          approvedRequests.push(
            <p>You have approved {invitations[i].requester} request</p>
          )
        }
      }
    }else{
      pendingRequests = 'No Requests'
    }


    return (
        <div>
          {pendingRequests}
          {approvedRequests}
        </div>
    )
  }
}

const mapPropsToState = (state) => {
    return{
      invitations : state.event.requesterEvent,
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
    acceptDeclineReq : (acceptDeclineReq) => dispatch(actionCreaters.acceptDeclineReq(acceptDeclineReq))
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(EventRequest);
// onClick={this.acceptDeclineReq(events[i],'Yes')}

