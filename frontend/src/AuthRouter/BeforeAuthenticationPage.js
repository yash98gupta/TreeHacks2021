import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthPage from'../Auth/AuthPage'



class BeforeAuthenticationPage extends Component {

  render(){

    const navStyle={
      textAlign: 'center',
      background: '#fd4400',
      paddingTop: '2.5vh',
      marginBottom: '3px',
      height: '7vh'
    }

    let currentHead=`Connecti`

    return (
      <BrowserRouter>
        <div>
        <div style={navStyle}>
        <div>
           <span style={{fontSize:'30px',fontWeight:'bolder'}}>{currentHead}</span>
         </div>
        </div>
           <Switch>            
               <Route  path='/' component={AuthPage} />
           </Switch>
       </div>
      </BrowserRouter>
    );
  }
}



export default BeforeAuthenticationPage;
