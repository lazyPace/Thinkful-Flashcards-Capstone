import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

export const DeckInfo = ({ deck, handleDeleteDeck }) => {
  const { url } = useRouteMatch()

  return (
    <>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className='d-flex justify-content-between'>
        <div>
          <Link to={`${url}/edit`}>
            <Button>Edit</Button>
          </Link>
          <Link to={`${url}/study`}>
            <Button>Study</Button>
          </Link>
          <Link to={`${url}/cards/new`}>
            <Button>Add Cards</Button>
          </Link>
        </div>
        <div>
          <Button variant='danger' onClick={() => handleDeleteDeck(deck.id)}>
            Delete Deck
          </Button>
        </div>
      </div>
    </>
  )
}

export default DeckInfo
