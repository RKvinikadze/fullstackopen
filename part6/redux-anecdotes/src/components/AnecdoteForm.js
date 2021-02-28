import React from 'react'
import {connect} from 'react-redux'
import {newAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const add = async (event) => {
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.newAnecdote(anecdote)
        props.setNotification(`you created '${anecdote}'`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdote'/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const connectedAnecdoteForm = connect(null, {newAnecdote, setNotification})(AnecdoteForm)

export default connectedAnecdoteForm
