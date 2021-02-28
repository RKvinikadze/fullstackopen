import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {voteById} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteList = (props) => {    
    const anecdotes = props.anecdotes.sort((a, b) => {return b.votes - a.votes })
  
    const vote = (anecdote) => {
        props.voteById(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    const value = state.filter.toLowerCase()
    if(state.filter === ''){
        return {
            anecdotes: state.anecdotes
        }
    }else{
        return {
            anecdotes: state.anecdotes.filter(x => x.content.toLowerCase().includes(value))
        }
    }
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    {voteById, setNotification}
)(AnecdoteList)

export default ConnectedAnecdoteList