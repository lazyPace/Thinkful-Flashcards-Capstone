import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'

import Header from './Header'
import NotFound from './NotFound'
import Deck from './Deck/Deck'
import CreateDeck from './Deck/CreateDeck'
import ViewDeck from './Deck/ViewDeck'

import {
  listDecks,
  createDeck,
  deleteDeck,
  updateDeck,
  updateCard,
  createCard,
  deleteCard
} from '../utils/api/index'

function Layout () {
  // store the user decks in state
  const [decks, setDecks] = useState([])
  const [error, setError] = useState(undefined)
  const [isDeckUpdated, setIsDeckUpdated] = useState(false) // check for edits in existing decks for other components

  const history = useHistory()

  // Create a new deck handler
  const handleCreateDeck = async formData => {
    const newDeck = await createDeck(formData)
    setDecks([...decks, newDeck])
    history.push(`/decks/${newDeck.id}`)
  }
  // Create a new card handler
  const handleCreateCard = async (deckId, formData) => {
    await createCard(deckId, formData)
    setIsDeckUpdated(!isDeckUpdated)
    history.push(`/decks/${deckId}/cards/new`)
  }

  // edit a deck handler
  const handleEditDeck = async (deck, formData) => {
    const { name, description, ...updatedInfo } = deck
    const newDeck = {
      ...updatedInfo,
      name: formData.name,
      description: formData.description
    }
    const updatedDeck = await updateDeck(newDeck)
    setIsDeckUpdated(!isDeckUpdated)
    history.push(`/decks/${updatedDeck.id}`)
  }
  // edit a card handler
  const handleEditCard = async (card, formData) => {
    const { front, back, ...updatedInfo } = card
    const newCard = {
      ...updatedInfo,
      front: formData.front,
      back: formData.back
    }
    const updatedCard = await updateCard(newCard)
    setIsDeckUpdated(!isDeckUpdated)
    history.push(`/decks/${updatedCard.deckId}`)
  }

  // Delete a deck handler
  const handleDeleteDeck = async deckId => {
    const alert = window.confirm('Are you sure you want to delete this deck?')
    if (alert) {
      try {
        await deleteDeck(deckId)
        setDecks(resultantDecks =>
          resultantDecks.filter(deck => deck.id !== deckId)
        )
        setIsDeckUpdated(!isDeckUpdated)
        history.push('/')
      } catch (error) {
        console.error('Problem deleting deck: ', error)
      }
    }
  }
  // delete a card handler
  const handleDeleteCard = async cardId => {
    const alert = window.confirm('Are you sure you want to delete this card?')
    if (alert) {
      try {
        await deleteCard(cardId)
        setIsDeckUpdated(!isDeckUpdated)
      } catch (error) {
        console.error('Error occurred during deletion.')
      }
    }
  }

  // Fetch list of decks from the database
  useEffect(() => {
    const abortController = new AbortController()
    listDecks(abortController.signal).then(setDecks).catch(setError)
    return () => abortController.abort()
  }, [isDeckUpdated])

  // display error if applicable
  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/'>
            <Deck decks={decks} handleDeleteDeck={handleDeleteDeck} />
          </Route>

          <Route exact path={'/decks/new'}>
            <CreateDeck handleCreateDeck={handleCreateDeck} />
          </Route>

          <Route path={'/decks/:deckId'}>
            <ViewDeck
              handleDeleteDeck={handleDeleteDeck}
              handleEditDeck={handleEditDeck}
              isDeckUpdated={isDeckUpdated}
              handleEditCard={handleEditCard}
              handleCreateCard={handleCreateCard}
              handleDeleteCard={handleDeleteCard}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>

        {/* TODO: Implement the screen starting here */}
      </div>
    </>
  )
}

export default Layout
