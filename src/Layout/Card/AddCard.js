import React from 'react'

import Breadcrumbs from '../Breadcrumbs'
import UpdateCards from './UpdateCards'

function AddCard ({ deck, handleCreateCard }) {
  return (
    <div>
      <Breadcrumbs extraItems={[deck.name, 'Add Card']} />
      <h2 className='text-center'>
        Add Card: <span>{deck.name}</span>
      </h2>
      <UpdateCards deckId={deck.id} handleFormSubmit={handleCreateCard} />
    </div>
  )
}

export default AddCard
