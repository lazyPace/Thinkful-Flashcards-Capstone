import React from 'react'
import Breadcrumbs from '../Breadcrumbs'

import UpdateDecks from './UpdateDecks'

function CreateDeck ({ handleCreateDeck }) {
  return (
    <>
      <Breadcrumbs extraItems={['Create Deck']} />
      <h2 className='text-center'>Create Deck</h2>
      <UpdateDecks handleFormSubmit={handleCreateDeck} />
    </>
  )
}

export default CreateDeck
