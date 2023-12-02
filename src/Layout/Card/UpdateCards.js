import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

function UpdateCards ({ card = null, handleFormSubmit, deckId }) {
  const initialFormState = {
    front: card?.front ?? '',
    back: card?.back ?? ''
  }

  const [formData, setFormData] = useState({ ...initialFormState })

  // form handlers
  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData({ ...formData, [name]: value })
  }

  // edit handler to comply with edit functionality as well as create
  const handleSubmit = e => {
    e.preventDefault()
    if (card !== null) {
      handleFormSubmit(card, formData)
    } else {
      handleFormSubmit(deckId, formData)
    }
    setFormData({ ...initialFormState })
  }

  console.log(card)
  return (
    <>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>
          Front Side:
          <textarea
            required
            className='form-field'
            type='text'
            placeholder='Front of card:'
            name='front'
            onChange={handleChange}
            value={formData.front}
          />
        </label>
        <label>
          Back Side:
          <textarea
            required
            className='form-field'
            type='text'
            placeholder='Back side of card:'
            name='back'
            onChange={handleChange}
            value={formData.back}
          />
        </label>
        <Link to={`/decks/${deckId}`}>
          <Button variant='secondary'>Cancel</Button>
        </Link>

        <Button type='submit'>Save Card</Button>
      </form>
    </>
  )
}

export default UpdateCards
