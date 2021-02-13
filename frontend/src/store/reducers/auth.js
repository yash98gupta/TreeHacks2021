import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const initialState = {
    token : null,
    isAuth : false,
    email : null,
    errorMsg: null,
    errorMsgLogIn:null,
    userCreatedMsg:null
}

const signUpSuccess=(state,action)=>{
  // console.log("sigup success reached reducer",action.response.data);
  // if(action.response.data.auth_token_valid){
      return updateObject(state,{
          // token : action.response.data.auth_token,
          token : '12345',
          isAuth : true,
          email: 'y@y.com'
          // email : action.response.data.email,
      })
    // }else{
    //   return updateObject(state,{
    //     state:state,
    //     errorMsg:`Please confirm your account by clicking the confirmation link sent at ${action.response.data.email}`
    //   })
    // }
}

const signUpFail=(state,action)=>{
  // console.log(action.response.data.message);
  // if(action.response.data.message){
  //   return updateObject(state,{
  //     errorMsg: action.response.data.message
  //   })
  // }else{
  //   return updateObject(state,{
  //     state:state
  //   })
  // }
  console.log("Failed")
  return updateObject(state,{
    state:state
  })
}

const autoSignIn=(state,action)=>{
  // console.log("Auto login success with new token value :",action.response.data.auth_token);
  return updateObject(state,{
    // token : action.response.data.auth_token,
    token : '12345',
    isAuth : true,
    email : 'y@y.com'
    // email : action.response.data.email,
  })
}

const SignIn=(state,action)=>{
  return updateObject(state,{
    token : '12345',
    isAuth : true,
    email : action.response.data.email
  })
}

const signInFail=(state,action)=>{
  console.log(action.response.data.message);
  if(action.response.data.message){
    return updateObject(state,{
      errorMsgLogIn: action.response.data.message
    })
  }else{
    return updateObject(state,{
      state:state
    })
  }
}

const signOutSuccess=(state,action)=>{
  // console.log("logout success");
  return updateObject(state,{
      token : null,
      isAuth : false,
      email : null,
  })
}

const clearNotificationMsg=(state,action)=>{
  return updateObject(state,{
    userCreatedMsg:null
  })
}


const auth = (state=initialState,action) => {
    switch(action.type){
        case actionTypes.SIGN_UP_SUCCESSFUL : return signUpSuccess(state,action)
        case actionTypes.SIGN_UP_FAIL : return signUpFail(state,action)
        case actionTypes.SIGN_IN_SUCCESSFUL : return SignIn(state,action)
        case actionTypes.SIGN_IN_FAIL : return signInFail(state,action)
        case actionTypes.AUTO_SIGN_IN_SUCCESSFUL : return autoSignIn(state,action)
        case actionTypes.SIGN_OUT_SUCCESSFUL : return signOutSuccess(state,action)
        case actionTypes.CLEAR_NOTIFICATIONS : return clearNotificationMsg(state,action)
        default: return state
    }
}

export default auth
