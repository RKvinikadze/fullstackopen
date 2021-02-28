import React, { useState } from 'react'
import Select from 'react-select'

import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const BirthYearForm = props => {
  const [changeBirthYear] = useMutation(EDIT_AUTHOR, {
    onError: error => console.log(error),
  })

  const [name, setName] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const options = props.authors.map(a => {
    return {
      value: a.name,
      label: a.name,
    }
  })

  const submit = async event => {
    event.preventDefault()
    changeBirthYear({
      variables: {
        name: name.value,
        setBornTo: parseInt(birthYear),
      },
    })
    setName('')
    setBirthYear('')
  }

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{' '}
          <Select defaultValue={name} onChange={setName} options={options} />
        </div>
        <div>
          born{' '}
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default BirthYearForm
