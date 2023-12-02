import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

//Bootstrap imports
import Button from 'react-bootstrap/Button'

function CreateDeck ({ handleCreateDeck }) {
  const initialFormState = {
    name: '',
    description: ''
  }

  const [formData, setFormData] = useState({ ...initialFormState })

  // form handlers
  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleCreateDeck(formData)
    console.log(
      'New deck created:',
      formData.name + ' : ' + formData.description
    )
    setFormData({ ...initialFormState })
  }

  return (
    <>
      <Link to='/'>
        <Button>Home</Button>
      </Link>
      <h2 class='create-header'>Create Deck</h2>
      <form class='form-container' onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            required
            class='form-field'
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
            class='form-field'
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

export default CreateDeck
