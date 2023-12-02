import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const CardItem = ({ front, back, id, handleDeleteCard }) => {
  const { url } = useRouteMatch()

  return (
    <Card>
      <Card.Body>
        <Card.Text>{front}</Card.Text>
        <Card.Text>{back}</Card.Text>
        <Link to={`${url}/cards/${id}/edit`}>
          <Button variant='primary' className='m-2'>
            Edit
          </Button>
        </Link>
        <Button
          variant='danger'
          className='m-2'
          onClick={() => handleDeleteCard(id)}
        >
          Delete
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CardItem
