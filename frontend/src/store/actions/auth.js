import * as actionTypes from '../actions/actionTypes'
import axios , {setHeader} from '../../axios/axios-task'


// CREATE USER
export const createUserRequest = (newUserDetails) => {
    return dispatch => {
        axios.post('/signup',newUserDetails)
            .then(
                (response)=>{
                    dispatch(userCreateSuccess(newUserDetails))
                }
            )
            .catch(
                (error)=>{
                    dispatch(userCreateFail(error))
                }
            )
    }
}

const userCreateSuccess = (response) => {
    localStorage.setItem('token',response.email);
    localStorage.setItem('gender',response.gender)
    localStorage.setItem('name',response.name)
    localStorage.setItem('conatct',response.contact)
    setHeader()
    return{
        type : actionTypes.SIGN_UP_SUCCESSFUL,
        response : response
    }
}

const userCreateFail = (error) => {
    return{
        type: actionTypes.SIGN_UP_FAIL,
        response : error.response
    }
}
// CREATE USER END


// AUTO SIGN_IN
 export const autoSignIn = (auth_token) => {
    return autoSignSuccesful('success')
}

const autoSignSuccesful = (response) => {
    localStorage.setItem('token',localStorage.getItem('token'))
    localStorage.setItem('gender',localStorage.getItem('gender'))
    localStorage.setItem('name',localStorage.getItem('name'))
    localStorage.setItem('contact',localStorage.getItem('contact'))
    let resp = {email: localStorage.getItem('token'),gender: localStorage.getItem('gender'), name: localStorage.getItem('name'), contact: localStorage.getItem('contact')}
    setHeader()
    return{
        type: actionTypes.AUTO_SIGN_IN_SUCCESSFUL,
        response : resp
    }
}

// AUTO SIGN_IN END

// SIGN IN
export const signInUserRequest = (user) => {
  const token = {user : user}
    return dispatch => {
        axios.post('/login',token)
            .then(
                (response)=>{
                    dispatch(signInSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    dispatch(signInFail(error))
                }
            )
    }
}

const signInSuccess = (response) => {
    localStorage.setItem('token',response.data.email)
    localStorage.setItem('gender',response.data.gender)
    localStorage.setItem('name',response.data.name)
    localStorage.setItem('contact',response.data.contact)
    setHeader()
    return{
        type : actionTypes.SIGN_IN_SUCCESSFUL,
        response : response
    }
}

const signInFail = (error) => {
    return{
        type: actionTypes.SIGN_IN_FAIL,
        response : error.response
    }
}
// SIGN IN END

// LOGOUT
export const logOutUserRequest = (auth_token) => {
    signOutSuccessful()
}

const signOutSuccessful = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('gender')
    localStorage.removeItem('name')
    localStorage.removeItem('contact')
    return{
        type : actionTypes.SIGN_OUT_SUCCESSFUL
    }
}
// LOGOUT END

// CLEAR NOTIFICATIONS START
export const clearNotificationMsg = () => {
  return{
      type : actionTypes.CLEAR_NOTIFICATIONS,
  }
}
// CLEAR NOTIFICATIONS END
