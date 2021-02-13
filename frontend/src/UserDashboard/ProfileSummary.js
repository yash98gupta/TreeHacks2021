import _ from 'lodash'
import React, { Component } from 'react'
import { Rating, Card, Image, Placeholder } from 'semantic-ui-react'

const cards = [
  {
    avatar: '/images/female.jpg',
    date: 'Joined in 2013',
    header: 'Helen',
    description: 'Primary Contact',
  },
  {
    avatar: '/images/male.png',
    date: 'Joined in 2013',
    header: 'Matthew',
    description: 'Primary Contact',
  },
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
    const { loading } = this.state

    return (

        <Card.Group doubling itemsPerRow={3} stackable>
          {_.map(cards, (card) => (
            <Card key={card.header}>
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
                    <Card.Header>{card.header}</Card.Header>
                    <Card.Meta>{card.date}</Card.Meta>
                    <Card.Description>{card.description}</Card.Description>
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
}