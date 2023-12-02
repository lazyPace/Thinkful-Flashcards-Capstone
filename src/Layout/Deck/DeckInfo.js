import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import CardList from '../Card/CardList'

import Button from 'react-bootstrap/Button'

export const DeckInfo = ({ deck, handleDeleteDeck, handleDeleteCard }) => {
  const { url } = useRouteMatch()

  return (
    <>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className='d-flex justify-content-between'>
        <div>
          <Link to={`/decks/${deck.id}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Link to={`/decks/${deck.id}/study`}>
            <Button>Study</Button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <Button>Add Cards</Button>
          </Link>
        </div>
        <div>
          <Button variant='danger' onClick={() => handleDeleteDeck(deck.id)}>
            Delete Deck
          </Button>
        </div>
      </div>

      <h2>Cards</h2>
      <CardList deck={deck} handleDeleteCard={handleDeleteCard} />
    </>
  )
}

export default DeckInfo
