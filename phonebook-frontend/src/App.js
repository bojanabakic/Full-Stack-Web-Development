import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Message from './components/Message'
import personsServices from './services/personsServices'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [personsFilter, setPersonsFilter] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  const addNewName = (event) => {
    event.preventDefault()

    /*if (persons.some(x => x.name === newName)) {
        alert(`${newName} is already added to phonebook`)
        return
    }*/

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(x => x.name === personObject.name)) {
      const dialogBox = window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with the new one?`)

      if (dialogBox) {
        let match = persons.find(x => x.name === newName)

        personsServices
          .update(match.id, { ...match, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(x => x.id !== updatedPerson.id ? x : updatedPerson))
            setMessage({text:`${match.name}'s number successfully updated`, type:"success"})
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(() => {
            setMessage({text:`${match.name}'s number cannot be updated.`, type:"failed"})
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        setPersons(persons.concat(personObject))
      }
    } else {
      personsServices
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage({text:`${personObject.name} is successfully added to phonebook!`, type:"success"})
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(() => {
          setMessage({text:`${personObject.name} cannot be added to phonebook.`, type:"fail"})
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const deletePerson = (name, id) => {
    const dialogBox = window.confirm(`Delete ${name}`)

    if (dialogBox) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(x => x.id !== id))
          setMessage({text:`${name} is successfully deleted.`, type:"success"})
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(() => {
          setMessage({text:`Person '${name}' was already deleted from server.`, type:"fail"})
          setPersons(persons.filter(x => x.name !== name))
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    personsServices
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  const handleChange = (event) => {
    setNameFilter(event.target.value)
    console.log(nameFilter)
    setPersonsFilter(persons.filter((person) =>
      (person.name.toUpperCase().includes(nameFilter.toUpperCase()))))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
      <Filter nameFilter={nameFilter} handleChange={handleChange} />
      <h3>add a new</h3>
      <PersonForm addNewName={addNewName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      {nameFilter === '' ?
        <Persons personsFilter={persons} deletePerson={deletePerson} />
        :
        <Persons personsFilter={personsFilter} deletePerson={deletePerson} />}
    </div>
  )
}

export default App
