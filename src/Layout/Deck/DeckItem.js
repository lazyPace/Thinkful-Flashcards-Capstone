import React from 'react'

import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { XCircle, Eye, Book } from 'react-bootstrap-icons'

export const DeckItem = ({
  id,
  name,
  description,
  count,
  handleDeleteDeck
}) => {
  return (
    <Card className='m-2'>
      <Card.Body>
        <div className='d-flex justify-content-around'>
          <Card.Title>{name}</Card.Title>
          <p>{count} cards</p>
        </div>
        <Card.Text>{description}</Card.Text>
        <div className='d-flex justify-content-around'>
          <div>
            <Link to={`/decks/${id}`}>
              <Button variant='secondary' className='m-2'>
                <Eye /> View
              </Button>
            </Link>
            <Link to={`/decks/${id}/study`}>
              <Button variant='primary' className='m-2'>
                <Book /> Study
              </Button>
            </Link>
          </div>
          <div>
            <Button
              variant='danger'
              className='m-2'
              onClick={() => handleDeleteDeck(id)}
            >
              <XCircle /> Delete Deck
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default DeckItem
