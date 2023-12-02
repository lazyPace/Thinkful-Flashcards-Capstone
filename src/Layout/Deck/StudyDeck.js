import React, { useState } from 'react'

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
    }
  }

  function handlePreviousCard () {
    if (activeCardIndex > 0) {
      setFlipped(false)
      setActiveCardIndex(activeCardIndex - 1)
    }
  }

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
