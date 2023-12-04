import React from 'react'

import Breadcrumbs from '../Breadcrumbs'
import UpdateDecks from './UpdateDecks'

function EditDeck ({ deck, handleEditDeck }) {
  return (
    <>
      <Breadcrumbs extraItems={[deck.name, 'Edit Deck']} />
      <h2 className='create-header'>Edit Deck: {deck.name}</h2>
      <UpdateDecks handleFormSubmit={handleEditDeck} deck={deck} />
    </>
  )
}

export default EditDeck
