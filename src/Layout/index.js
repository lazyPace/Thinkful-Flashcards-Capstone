import React, { useState, useEffect } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import Header from './Header'
import NotFound from './NotFound'
import Deck from './Deck'
import CreateDeck from './CreateDeck'
import { listDecks, createDeck, deleteDeck } from '../utils/api/index'

function Layout () {
  // store the user decks in state
  const [decks, setDecks] = useState([])
  const [error, setError] = useState(undefined)
  const history = useHistory()

  // Create a new deck handler
  const handleCreateDeck = async formData => {
    const newDeck = await createDeck(formData)
    setDecks([...decks, newDeck])
    history.push(`/decks/${newDeck.id}`)
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
        history.push('/')
      } catch (error) {
        console.error('Problem deleting deck: ', error)
      }
    }
  }

  // Fetch list of decks from the database
  useEffect(() => {
    const abortController = new AbortController()
    listDecks(abortController.signal).then(setDecks).catch(setError)
    return () => abortController.abort()
  }, [])

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
            <p>Individual Deck Page</p>
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
