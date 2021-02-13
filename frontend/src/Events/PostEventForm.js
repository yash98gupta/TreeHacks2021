import React, { Component } from 'react';
import {connect} from 'react-redux'
import * as actionCreaters from '../store/actions/index'
import {Form,Button } from 'semantic-ui-react'

class postEventForm extends Component {

  state={
  }

  handleCreateEvent=()=>{
    // let user = this.state.createUser
    // this.props.createUser(user)
    console.log(this.state);
  }

  handleChangeEvent=(e)=>{
    if(e.target.placeholder=='Title'){
      this.setState({
        title:e.target.value
      })
    }else{
      this.setState({
        description:e.target.value
      })
    }
  }

  render(){

    let eventForm=(
      <div>
        <h1>Create Event</h1>
        <Form onSubmit={this.handleCreateEvent}>
          <Form.Field>
            <label>Title</label>
            <input placeholder='Title' onChange={this.handleChangeEvent} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='Description' onChange={this.handleChangeEvent} />
          </Form.Field>
          <Button type='submit'>Create</Button>
        </Form>
      </div>
    )

    return (
        <div style={{marginTop:'3vh', marginBottom:'3vh', width:'50vw'}}>
            {eventForm}
        </div>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return{
//       createUser : (newUserDetails) => dispatch(actionCreaters.createUserRequest(newUserDetails)),
//   }
// }

export default postEventForm;
// export default connect(null,mapDispatchToProps)(PostEventForm);
