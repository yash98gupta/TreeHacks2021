import React, { Component } from 'react';
import axios from '../axios/axios-task';
import { Link} from 'react-router-dom'
import { Accordion, Icon, Container ,Label, Form,  Button} from 'semantic-ui-react'

class PrivateEvents extends Component {
    
    state = { activeIndex: null }

    handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
    }

  render(){

    const { activeIndex } = this.state

    let jobsAppliedList=[]

    let jobsApplied=[
      {location:'A',Time:'2pm',date:'10 Feb 2021', category:'1'},
      {location:'B',Time:'3pm',date:'11 Feb 2021', category:'2'},
      {location:'C',Time:'4pm',date:'12 Feb 2021', category:'3'},
      {location:'D',Time:'5pm',date:'13 Feb 2021', category:'4'},
      {location:'LA',Time:'6pm',date:'14 Feb 2021', category:'5'},
      {location:'E',Time:'7pm',date:'15 Feb 2021', category:'6'},
      {location:'F',Time:'8pm',date:'16 Feb 2021', category:'7'},
      {location:'G',Time:'9pm',date:'17 Feb 2021', category:'8'},
      {location:'H',Time:'10pm',date:'18 Feb 2021', category:'9'}
    ]
    // if(this.props.jobsApplied!=null && this.props.jobsApplied!=undefined){
      if(jobsApplied.length != 0){
        var i
        // for(i=0;i<this.props.jobsApplied.length;i++){
        for(i=0;i<jobsApplied.length;i++){
        // var appliedOn=new Date(this.props.jobsApplied[i].appliedDate)
        jobsAppliedList.push(
            <Accordion fluid styled>
            <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                <Icon name='dropdown' />
                {jobsApplied[i].category}
                <div style={{marginTop:'5px'}}>
                    <span><Label color='blue' horizontal>{jobsApplied[i].location}</Label></span>
                    <span><Label color='blue' horizontal>{jobsApplied[i].Time}</Label></span>
                    <span><Label color='blue' horizontal>{jobsApplied[i].date}</Label></span>
                </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === i}>
                <p>
                {jobsApplied[i].location}
                </p>
            </Accordion.Content>
            </Accordion>
        )
        }
    }
    if(jobsAppliedList.length==0){
        jobsAppliedList='NO APPLIED JOBS'
    }

    return (
      <div>
        {jobsAppliedList}
      </div>
    )
  }
}



export default PrivateEvents;
