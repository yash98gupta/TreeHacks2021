import React, { Component } from 'react';
import AfterAuthenticationPage from './AuthRouter/AfterAuthenticationPage'
import BeforeAuthenticationPage from './AuthRouter/BeforeAuthenticationPage'
import {connect} from 'react-redux';
import * as actionCreater from '../src/store/actions/index'

class App extends Component {

  componentDidMount(){
    const token = localStorage.getItem('token')
    if(token!=null){
       this.props.autoSignIn(token)
    }
  }

  render() {

    let displayComponent=null
    
    if(this.props.isAuth){
        displayComponent = <AfterAuthenticationPage />
    }else{
        displayComponent=<BeforeAuthenticationPage />
    }

    return (
      <div>
        {displayComponent}
      </div>
    )
  }
}

const mapPropsToState = (state) => {
  return{
    isAuth : state.auth.isAuth,
    email : state.auth.email,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    autoSignIn : (token) => dispatch(actionCreater.autoSignIn(token))
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(App);
