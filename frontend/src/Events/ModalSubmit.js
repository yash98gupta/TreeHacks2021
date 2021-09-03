import React from 'react'
import { Button, Modal,Icon} from 'semantic-ui-react'

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { open: true, dimmer: action.dimmer }
    case 'CLOSE_MODAL':
      return { open: false }
    default:
      throw new Error()
  }
}

function ModalExampleDimmer(props) {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  })
  const { open, dimmer } = state

  let params = props.event;

  let modalActions=(
    <>
          <Button animated='fade' negative>
            <Button.Content visible>{props.decline}</Button.Content>
            <Button.Content hidden onClick={() => dispatch({ type: 'CLOSE_MODAL' })}><Icon name='edit' /></Button.Content>
          </Button>
          <Button animated='fade' positive>
            <Button.Content visible>{props.accept}</Button.Content>
            <Button.Content hidden onClick={() => {dispatch({ type: 'CLOSE_MODAL' }); props.approvedDetails(params);}}><Icon name='check' /></Button.Content>
          </Button>
    </>
  )

  return (
    <div>

<Button animated='fade' color='teal'>
      <Button.Content visible>{props.buttonName}</Button.Content>
      <Button.Content hidden onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}><Icon name={props.buttonIcon}/></Button.Content>
</Button>

      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
      >
        <Modal.Header>{props.eventHeader}</Modal.Header>
        <Modal.Content>
          {props.eventVerify}
        </Modal.Content>
        <Modal.Actions>
          {modalActions}
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default ModalExampleDimmer