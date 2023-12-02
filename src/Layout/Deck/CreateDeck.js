import React from 'react'

import UpdateDecks from './UpdateDecks'

function CreateDeck ({ handleCreateDeck }) {
  return (
    <>
      <h2>Create Deck</h2>
      <UpdateDecks handleFormSubmit={handleCreateDeck} />
    </>
  )
}

export default CreateDeck
