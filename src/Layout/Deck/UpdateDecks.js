import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

//Bootstrap imports
import Button from 'react-bootstrap/Button'

function UpdateDecks ({ deck = null, handleFormSubmit }) {
  const initialFormState = {
    name: deck?.name ?? '',
    description: deck?.description ?? ''
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
    if (deck) {
      handleFormSubmit(deck, formData)
    } else {
      handleFormSubmit(formData)
    }
    setFormData({ ...initialFormState })
  }

  return (
    <>
      <form className='form-container' onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            required
            className='form-field'
            type='text'
            placeholder='Deck Name:'
            name='name'
            onChange={handleChange}
            value={formData.name}
          />
        </label>
        <label>
          Description:
          <textarea
            required
            className='form-field'
            type='text'
            placeholder='Deck Description:'
            name='description'
            onChange={handleChange}
            value={formData.description}
          />
        </label>
        <Link to={'/'}>
          <Button variant='secondary'>Cancel</Button>
        </Link>

        <Button type='submit'>Submit</Button>
      </form>
    </>
  )
}

export default UpdateDecks
