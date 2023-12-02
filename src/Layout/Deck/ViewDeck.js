import React, { useState, useEffect } from 'react'
import { Route, useParams, useRouteMatch } from 'react-router-dom'
import { readDeck } from '../../utils/api'

import NotFound from '../NotFound'
import EditDeck from './EditDeck'
import EditCard from '../Card/EditCard'
import DeckInfo from './DeckInfo'
import StudyDeck from './StudyDeck'
import AddCard from '../Card/AddCard'

function ViewDeck ({
  handleDeleteDeck,
  handleEditDeck,
  isDeckUpdated,
  handleEditCard
}) {
  const [deck, setDeck] = useState({})
  const [error, setError] = useState(undefined)

  const { deckId } = useParams()
  const { url } = useRouteMatch()

  // Fetch data for a single deck
  useEffect(() => {
    const abortController = new AbortController()
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError)
    return () => abortController.abort()
  }, [deckId, isDeckUpdated])

  console.log(deckId)
  if (deck.id) {
    return (
      <>
        <Route path={`${url}/edit`}>
          <EditDeck deck={deck} handleEditDeck={handleEditDeck} />
        </Route>

        <Route path={`${url}/study`}>
          <StudyDeck deck={deck} />
        </Route>

        <Route path={`${url}/cards/new`}>
          <AddCard deck={deck} />
        </Route>

        <Route path={`${url}/cards/:cardId/edit`}>
          <EditCard
            deck={deck}
            handleEditCard={handleEditCard}
            deckId={deckId}
          />
        </Route>

        <Route exact path={`${url}`}>
          <DeckInfo deck={deck} handleDeleteDeck={handleDeleteDeck} />
        </Route>
      </>
    )
  }

  return <NotFound />
}

export default ViewDeck
