import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header'
import NotFound from './NotFound'
import Deck from './Deck'
import CreateDeck from './CreateDeck'
import { listDecks, createDeck } from '../utils/api/index'

function Layout () {
  // store the user decks in state
  const [decks, setDecks] = useState([])
  const [error, setError] = useState(undefined)

  // Create a new deck handler
  const handleCreateDeck = async formData => {
    const newDeck = await createDeck(formData)
    setDecks([...decks, newDeck])
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
            <Deck decks={decks} />
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
