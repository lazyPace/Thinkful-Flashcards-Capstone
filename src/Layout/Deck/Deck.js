import React from 'react'
import DeckItem from './DeckItem'
import CreateDeckButton from './CreateDeckButton'

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function Deck ({ decks, handleDeleteDeck }) {
  const listOfDecks = decks?.map(deck => (
    <Col md={4} key={deck.id}>
      <DeckItem
        key={deck.id}
        id={deck.id}
        name={deck.name}
        count={deck.cards.length}
        description={deck.description}
        handleDeleteDeck={handleDeleteDeck}
      />
    </Col>
  ))

  const noDecksFound = (
    <Card className='m-2'>
      <Card.Body>
        <Card.Title>No Decks Found</Card.Title>
        <Card.Text>
          Click the "Create Deck" button above to get started!
        </Card.Text>
      </Card.Body>
    </Card>
  )

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <CreateDeckButton />
      </div>
      <Row>{listOfDecks.length > 0 ? listOfDecks : noDecksFound}</Row>
    </div>
  )
}

export default Deck
