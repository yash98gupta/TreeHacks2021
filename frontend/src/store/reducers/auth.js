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
  console.log("console",action.response)
      return updateObject(state,{
          token : action.response.email,
          isAuth : true,
          email : action.response.email,
          gender: action.response.gender,
          name: action.response.name,
          contact: action.response.contact
      })
}

const signUpFail=(state,action)=>{
  return updateObject(state,{
    state:state
  })
}

const autoSignIn=(state,action)=>{
  return updateObject(state,{
    token : action.response.email,
    isAuth : true,
    email : action.response.email,
    gender : action.response.gender,
    name : action.response.name,
    contact : action.response.contact,
  })
}

const SignIn=(state,action)=>{
  console.log(action.response.data)
  return updateObject(state,{
    token : action.response.data.email,
    isAuth : true,
    email : action.response.data.email,
    gender : action.response.data.gender,
    name : action.response.data.name,
    contact : action.response.data.contact
  })
}

const signInFail=(state,action)=>{
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
