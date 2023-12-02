import React from 'react'

import CardItem from './CardItem'

import Card from 'react-bootstrap/Card'

function CardList ({ deck }) {
  const sufficientCards = deck.cards.length > 0 ? true : false

  let cardListItems
  if (sufficientCards) {
    cardListItems = deck.cards.map(card => (
      <CardItem
        key={card.id}
        front={card.front}
        back={card.back}
        id={card.id}
      />
    ))
  }

  const noCards = (
    <Card>
      <Card.Body>
        <Card.Title>No Cards in selected deck.</Card.Title>
        <Card.Text>Click the 'Add Cards' button to begin.</Card.Text>
      </Card.Body>
    </Card>
  )

  return <>{sufficientCards ? cardListItems : noCards}</>
}

export default CardList
