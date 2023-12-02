import React from 'react'
import UpdateDecks from './UpdateDecks'

function EditDeck ({ deck, handleEditDeck }) {
  return (
    <>
      <h2 className='create-header'>Edit Deck: {deck.name}</h2>
      <UpdateDecks handleFormSubmit={handleEditDeck} deck={deck} />
    </>
  )
}

export default EditDeck
