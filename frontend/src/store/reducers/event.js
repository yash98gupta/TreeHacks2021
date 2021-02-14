import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    public_event : null,
    categories : null,
    events : null,
    alreadyRequested: false
}


const fetchEventSuccess=(state,action)=>{
  let events = action.response.data;

  let categories = new Map()
  events.forEach(event => categories.set(event.event_category,'1'));
  let filter_keys = Array.from( categories.keys() );


  return updateObject(state,{
    public_event : events,
    events : events,
    categories: filter_keys
  })
}

const fetchEventFail=(state,action)=>{
    return updateObject(state,{
        public_event : null,
      })
}

const filterCategory=(state,action)=>{
  let filter = action.response['category'];

  let event = [];
  let all_events = state.events
  let i=0;
  for(i=0;i<all_events.length;i++){
    if(all_events[i].event_category == filter){
      event.push(all_events[i]);
    }
  }

  return updateObject(state,{
    public_event : event,
    categories: state.categories,
    filteredCategory : filter,
    events : all_events
  })
}

const handleRemoveFilter = (state,action)=>{
  return updateObject(state,{
    public_event : state.events,
    categories: state.categories,
    filteredCategory: null,
    events: state.events
  })
}

const ReqInterestedSuccess = (state,action)=>{
  return updateObject(state,{
    alreadyRequested: true
  })
}

const ReqInterestedFail = (state,action)=>{
  return updateObject(state,{
    public_event : state.events,
    categories: state.categories,
    filteredCategory: state.filteredCategory,
    events: state.events
  })
}

const ReqAcceptDeclineSuccess = (state,action)=>{
  console.log("hello",action.response.reqid);
  let i;
  let updatedRequester=[];
  for(i=0;i<state.requesterEvent.length;i++){
    let copyRequester = state.requesterEvent[i];
    if(state.requesterEvent[i]._id.$oid == action.response.reqid){
      copyRequester.decision = 'Yes'
    }
    updatedRequester.push(copyRequester);
  }
  return updateObject(state,{
    requesterEvent: updatedRequester
  })
}

const ReqAcceptDeclineFail = (state,action)=>{
  return updateObject(state,{
    public_event : state.events,
    categories: state.categories,
    filteredCategory: state.filteredCategory,
    events: state.events
  })
}

const fetchPvtEventSuccess=(state,action)=>{
  let events = action.response.data;
  return updateObject(state,{
    private_event : events,
  })
}

const fetchPvtEventFail=(state,action)=>{
    return updateObject(state,{
      private_event : null,
      })
}

const checkRequestSuccess = (state,action)=>{
  let requesterEvent = null;
  let alreadyRequested = false;
  if(action.response.data.length == 0){
    requesterEvent = null
  }else{
    requesterEvent = action.response.data
    let i;
    let j;
    for(i=0;i<requesterEvent.length;i++){
      if(requesterEvent[i].requester == localStorage.getItem('token')){
        alreadyRequested = true;
        break;
      }
    }
    if(state.private_event != undefined){
      for(i=0;i<state.private_event.length;i++){
        let copyPvtEvent = state.private_event[i]
        for(j=0;j<requesterEvent.length;j++){
          let eventReq = []
          if(state.private_event[i]._id.$oid == requesterEvent[j].event){
            eventReq.push({requester : requesterEvent[j].requester,decision : requesterEvent[j].decision});
          }
          copyPvtEvent.eventReq = eventReq
        }
      }
    }
  }


  return updateObject(state,{
    events: state.events,
    requesterEvent: requesterEvent,
    alreadyRequested: alreadyRequested
  });
}
const checkRequestFail = (state,action)=>{
  return updateObject(state,{
    public_event : state.events,
    categories: state.categories,
    filteredCategory: state.filteredCategory,
    events: state.events
  })
}

const createEventSuccess = (state,action)=>{
  console.log("Added",action.response.data)
  return updateObject(state,{
    public_event : state.events,
    categories: state.categories,
    filteredCategory: state.filteredCategory,
    events: state.events
  })
}

const createEventFail = (state,action)=>{
  return updateObject(state,{
    public_event : state.events,
    categories: state.categories,
    filteredCategory: state.filteredCategory,
    events: state.events
  })
}

const event = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.FETCH_PUBLIC_EVENTS_SUCCESS : return fetchEventSuccess(state,action)
        case actionTypes.FETCH_PUBLIC_EVENTS_FAIL : return fetchEventFail(state,action)

        case actionTypes.FILTER_CATEORY : return filterCategory(state,action)
        case actionTypes.REMOVE_FILTER_CATEORY : return handleRemoveFilter(state,action)

        case actionTypes.INTERESTED_EVENT_SUCCESS : return ReqInterestedSuccess(state,action)
        case actionTypes.INTERESTED_EVENT_FAILURE : return ReqInterestedFail(state,action)

        case actionTypes.ACCEPT_DECLINE_SUCCESS : return ReqAcceptDeclineSuccess(state,action)
        case actionTypes.ACCEPT_DECLINE_FAIL : return ReqAcceptDeclineFail(state,action)

        case actionTypes.CHECK_INTERESTED_SUCCESS : return checkRequestSuccess(state,action)
        case actionTypes.CHECK_INTERESTED_FAIL : return checkRequestFail(state,action)

        case actionTypes.FETCH_PRIVATE_EVENTS_SUCCESS : return fetchPvtEventSuccess(state,action)
        case actionTypes.FETCH_PRIVATE_EVENTS_FAIL : return fetchPvtEventFail(state,action)

        case actionTypes.CREATE_EVENT_SUCCESS : return createEventSuccess(state,action)
        case actionTypes.CREATE_EVENT_FAIL : return createEventFail(state,action)

        default: return state
    }
}

export default event
