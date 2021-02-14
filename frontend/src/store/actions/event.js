import * as actionTypes from '../actions/actionTypes'
import axios , {setHeader} from '../../axios/axios-task'

// FETCH PUBLIC EVENT START
export const fetchPublicEventsRequest = (user) => {
    return dispatch => {
        axios.post('/events',user)
            .then(
                (response)=>{
                    dispatch(fetchPublicEventSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(fetchPublicEventFail(error))
                }
            )
    }
}

const fetchPublicEventSuccess = (response) => {
    return{
        type : actionTypes.FETCH_PUBLIC_EVENTS_SUCCESS,
        response : response
    }
}
const fetchPublicEventFail = (error) => {
    return{
        type : actionTypes.FETCH_PUBLIC_EVENTS_FAIL,
        response : error
    }
}
// FETCH PUBLIC EVENT END

// FILTER_CATEORY
export const selectedFilter = (category) => {
    return{
        type : actionTypes.FILTER_CATEORY,
        response : category
    }
}
// FILTER_CATEORY END

// REMOVE FILTER_CATEORY
export const handleRemoveFilter = () => {
    return{
        type : actionTypes.REMOVE_FILTER_CATEORY,
    }
}
// REMOVE FILTER_CATEORY END

// REQUEST INTERESTED
export const sendInterestedRequest =(interestReq) =>{
    return dispatch => {
        axios.post('/requestevent',interestReq)
            .then(
                (response)=>{
                    dispatch(sendInterestedRequestSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(sendInterestedRequestFail(error))
                }
            )
    }
}

const sendInterestedRequestSuccess = (response) => {
    return{
        type : actionTypes.INTERESTED_EVENT_SUCCESS,
        response : response
    }
}
const sendInterestedRequestFail = (error) => {
    return{
        type : actionTypes.INTERESTED_EVENT_FAILURE,
        response : error
    }
}
// REQUEST INTERESTED END


// REQUEST INTERESTED ACCEPTED/DECLINED START
export const acceptDeclineReq =(acceptDeclineReq) =>{
    return dispatch => {
        axios.post('/eventdecision',acceptDeclineReq)
            .then(
                (response)=>{
                    dispatch(acceptDeclineReqSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(acceptDeclineReqFail(error))
                }
            )
    }
}

const acceptDeclineReqSuccess = (response) => {
    return{
        type : actionTypes.ACCEPT_DECLINE_SUCCESS,
        response : response
    }
}
const acceptDeclineReqFail = (error) => {
    return{
        type : actionTypes.ACCEPT_DECLINE_FAIL,
        response : error
    }
}
// REQUEST INTERESTED ACCEPTED/DECLINED END

// CHECK IF A EVENT WAS REQUESTED
export const checkRequest =(eventId) =>{
    return dispatch => {
        axios.post('/getrequestforeventid',eventId)
            .then(
                (response)=>{
                    dispatch(checkRequestSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(checkRequestFail(error))
                }
            )
    }
}

const checkRequestSuccess = (response) => {
    return{
        type : actionTypes.CHECK_INTERESTED_SUCCESS,
        response : response
    }
}
const checkRequestFail = (error) => {
    return{
        type : actionTypes.CHECK_INTERESTED_FAIL,
        response : error
    }
}

// CHECK IF A EVENT WAS REQUESTED ENDED


// FETCH PRIVATE EVENT START
export const fetchPrivateEvents = (user) => {
    return dispatch => {
        axios.post('/geteventforuser',user)
            .then(
                (response)=>{
                    dispatch(fetchPrivateEventSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(fetchPrivateEventFail(error))
                }
            )
    }
}

const fetchPrivateEventSuccess = (response) => {
    return{
        type : actionTypes.FETCH_PRIVATE_EVENTS_SUCCESS,
        response : response
    }
}
const fetchPrivateEventFail = (error) => {
    return{
        type : actionTypes.FETCH_PRIVATE_EVENTS_FAIL,
        response : error
    }
}
// FETCH PRIVATE EVENT END


// CREATE EVENt START
export const createEvent = (eventDetails) => {
    return dispatch => {
        axios.post('/add_events',eventDetails)
            .then(
                (response)=>{
                    dispatch(createEventSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(createEventFail(error))
                }
            )
    }
}

const createEventSuccess = (response) => {
    return{
        type : actionTypes.CREATE_EVENT_SUCCESS,
        response : response
    }
}
const createEventFail = (error) => {
    return{
        type : actionTypes.CREATE_EVENT_FAIL,
        response : error
    }
}
// CREATE EVENT STOP