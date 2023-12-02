import React from 'react'

import UpdateCards from './UpdateCards'

function AddCard ({ deck, handleCreateCard }) {
  return (
    <div>
      <h2>
        Add Card<span>{deck.name}</span>
      </h2>
      <UpdateCards deckId={deck.id} handleFormSubmit={handleCreateCard} />
    </div>
  )
}

export default AddCard
