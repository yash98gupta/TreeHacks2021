import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import AuthPage from'../Auth/AuthPage'
import {Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class BeforeAuthenticationPage extends Component {

  render(){

    const navStyle={
      textAlign: 'center',
      background: '#D2691E',
      paddingTop: '2.5vh',
      marginBottom: '3px',
      height: '9.5vh'
    }

    const websiteName={
      fontSize: '55px',
      fontWeight: 'bolder',
      zIndex: '100',
      position: 'absolute',
      left: '8vw',
      fontFamily: 'sans-serif',
      fontStyle: 'italic',
      top: '3.3vh',
      fontStretch: 'extra-expanded'
    }

    let currentHead=`GetTogether`

    return (
      <BrowserRouter>
        <div>
        <div style={navStyle}>
                <Image src='/images/gt.png' circular style={{marginRight:'1vw',width: '32vh',top: '-3vw',display: 'inline-block',left: '-4vw',position: 'absolute'}}/>
                <Link to='/' style={{textDecoration:'none', color:'black'}}><span style={websiteName}>{currentHead}</span></Link>
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
