import * as actionTypes from '../actions/actionTypes'
import axios , {setHeader} from '../../axios/axios-task'


// CREATE USER
export const createUserRequest = (newUserDetails) => {
    return dispatch => {
        axios.post('/login',newUserDetails)
            .then(
                (response)=>{
                    dispatch(userCreateSuccess(response))
                }
            )
            .catch(
                (error)=>{
                    console.log("Failed here",newUserDetails)
                    dispatch(userCreateFail(error))
                }
            )
    }
}

const userCreateSuccess = (response) => {
    localStorage.setItem('token',response.data.auth_token);
    setHeader()
    return{
        type : actionTypes.SIGN_UP_SUCCESSFUL,
        response : response
    }
}

const userCreateFail = (error) => {
  console.log("sign_up failed",error);
    return{
        type: actionTypes.SIGN_UP_FAIL,
        response : error.response
    }
}
// CREATE USER END


// AUTO SIGN_IN
 export const autoSignIn = (auth_token) => {
    const token = {token : auth_token}
    return autoSignSuccesful('success')
    // return dispatch => {
        // axios.post('/auth/auto_login',token)
        // .then(
            // (response) => {
                // dispatch(autoSignSuccesful(response))
            // }
        // )
        // .catch(
            // (error) => {
                // dispatch(autoSignFail(error))
            // }
        // )
    // }
}

const autoSignSuccesful = (response) => {
    // localStorage.setItem('token',response.data.auth_token)
    localStorage.setItem('token','12345')
    setHeader()
    return{
        type: actionTypes.AUTO_SIGN_IN_SUCCESSFUL,
        response : response
    }
}

const autoSignFail = (error) => {
    return{
        type : actionTypes.AUTO_SIGN_IN_FAIL,
        response : error
    }
}

// AUTO SIGN_IN END

// SIGN IN
export const signInUserRequest = (user,confirmation_token) => {
  const token = {user : user, confirmation_token:confirmation_token}
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
    localStorage.setItem('token',response.data.auth_token)
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
    return{
        type : actionTypes.SIGN_OUT_SUCCESSFUL
    }
}
const signOutFail = (error) => {
    return{
        type : actionTypes.SIGN_OUT_FAIL,
        response : error
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
