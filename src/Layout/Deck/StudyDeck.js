import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

function StudyDeck ({ deck }) {
  const [flipped, setFlipped] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const numberOfCards = deck.cards.length

  // deck navigation handlers
  function handleFlipCard () {
    setFlipped(!flipped)
  }

  function handleNextCard () {
    if (activeCardIndex < numberOfCards - 1) {
      setFlipped(false)
      setActiveCardIndex(activeCardIndex + 1)
    } else if (!flipped) {
      setFlipped(true)
    } else {
      const restart = window.confirm(
        `Restart cards?\n\nClick 'cancel' to return to the home page.`
      )
      if (restart) {
        setActiveCardIndex(0)
        setFlipped(!flipped)
      } else {
        window.location.href = '/'
      }
    }
  }

  function handlePreviousCard () {
    if (activeCardIndex > 0) {
      setFlipped(false)
      setActiveCardIndex(activeCardIndex - 1)
    }
  }

  // Check if user is on last card and is flipped and sends a dialogue box if so
  useEffect(() => {
    if (activeCardIndex === numberOfCards - 1 && flipped) {
      // Delay confirmation so last card will flip
      const timer = setTimeout(() => {
        const restart = window.confirm(
          `Restart the deck?\n\nClick 'cancel' to return to home page.`
        )
        if (restart) {
          setActiveCardIndex(0)
          setFlipped(false)
        } else {
          window.location.href = '/'
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [activeCardIndex, flipped, numberOfCards])

  return (
    <>
      <h1>
        Study: <span>{deck.name}</span>
      </h1>
      {numberOfCards < 3 ? (
        <Card className='m-2'>
          <Card.Body>
            <Card.Title>Not Enough Cards</Card.Title>
            <Card.Text>
              You need at least 3 cards to study. There
              {numberOfCards === 1
                ? ' is 1 card'
                : ` are ${numberOfCards} cards `}
              in this deck.
            </Card.Text>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className='btn btn-primary'
            >
              Add Cards
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Card className='m-2'>
          <Card.Body>
            <Card.Title>
              Card {activeCardIndex + 1} of {numberOfCards}
            </Card.Title>
            <Card.Text>
              {!flipped
                ? deck.cards[activeCardIndex].front
                : deck.cards[activeCardIndex].back}
            </Card.Text>
            <div className='d-flex justify-content-between'>
              <Button
                className='m-2'
                variant='secondary'
                onClick={handleFlipCard}
              >
                Flip
              </Button>
              <div>
                {flipped && (
                  <>
                    <Button
                      variant='primary'
                      className='m-2'
                      onClick={handlePreviousCard}
                      disabled={activeCardIndex === 0}
                    >
                      Previous
                    </Button>
                    <Button
                      variant='primary'
                      className='m-2'
                      onClick={handleNextCard}
                      disabled={activeCardIndex === numberOfCards - 1}
                    >
                      Next
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  )
}

export default StudyDeck
