import _ from 'lodash'
import React, { Component } from 'react'
import { Rating, Card, Image, Placeholder } from 'semantic-ui-react'

const Malecard = [
  {
    avatar: '/images/male.png',
    date: 'Joined in 2013',
    header: 'Matthew',
    description: 'Primary Contact',
  },
]

const Femalecard =[
  {
    avatar: '/images/female.jpg',
    header: 'Helen',
    description: 'Primary Contact',
  }
]

export default class PlaceholderExampleCard extends Component {
  state = { loading: false }

  handleLoadingClick = () => {
    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({ loading: false })
    }, 3000)
  }

  render() {
    console.log(this.props.gender);
    const { loading } = this.state
    let cardDisplay='No AVATAR AVAILABLE'
    if(this.props.gender != null && this.props.gender == 'M'){
      cardDisplay = (
      <Card.Group doubling itemsPerRow={3} stackable>
      {_.map(Malecard, (card) => (
        <Card key={this.props.name}>
          {loading ? (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <Image src={card.avatar} />
          )}

          <Card.Content>
            {loading ? (
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length='very short' />
                  <Placeholder.Line length='medium' />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length='short' />
                </Placeholder.Paragraph>
              </Placeholder>
            ) : (
              <>
                <Card.Header>{this.props.name}</Card.Header>
                <Card.Meta>{this.props.email}</Card.Meta>
                <Card.Description>{this.props.contact}</Card.Description>
              </>
            )}
          </Card.Content>

          <Card.Content extra>
            <Rating icon='star' defaultRating={3} maxRating={5} size='massive' />
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
      )
    }else{
      cardDisplay = (
      <Card.Group doubling itemsPerRow={3} stackable>
      {_.map(Femalecard, (card) => (
        <Card key={this.props.name}>
          {loading ? (
            <Placeholder>
              <Placeholder.Image square />
            </Placeholder>
          ) : (
            <Image src={card.avatar} />
          )}

          <Card.Content>
            {loading ? (
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length='very short' />
                  <Placeholder.Line length='medium' />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length='short' />
                </Placeholder.Paragraph>
              </Placeholder>
            ) : (
              <>
                <Card.Header>{this.props.name}</Card.Header>
                <Card.Meta>{this.props.email}</Card.Meta>
                <Card.Description>{this.props.conatct}</Card.Description>
              </>
            )}
          </Card.Content>

          <Card.Content extra>
            <Rating icon='star' defaultRating={3} maxRating={5} size='massive' />
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
    )
    }

    return (
      <div style={{width:'60vw'}}>
        {cardDisplay}
      </div>
    )
  }
}