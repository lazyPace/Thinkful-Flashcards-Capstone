import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons'

function CreateDeckButton () {
  return (
    <Link to={'/decks/new'}>
      <Button>
        <PlusCircle />
        Create Deck
      </Button>
    </Link>
  )
}

export default CreateDeckButton
