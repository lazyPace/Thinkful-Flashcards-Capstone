import React from 'react'

import { useParams } from 'react-router-dom'

import Breadcrumbs from '../Breadcrumbs'
import UpdateCards from './UpdateCards'

function EditCard ({ deck, deckId, handleEditCard }) {
  const { cardId } = useParams()

  const card = deck.cards.find(card => card.id === Number(cardId))
  console.log(cardId)
  return (
    <>
      <Breadcrumbs extraItems={[deck.name, `Edit Card ${cardId}`]} />
      <h2 className='text-center'>Edit Card for {deck.name}</h2>
      <UpdateCards
        card={card}
        handleFormSubmit={handleEditCard}
        deckId={deckId}
      />
    </>
  )
}

export default EditCard
