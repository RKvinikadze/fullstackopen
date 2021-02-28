import anecdoteService from '../services/anecdote'

export const voteById = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})

    dispatch({
      type: 'vote',
      data: {
        id:updatedAnecdote.id
      }
    })
  }
}

export const newAnecdote = (new_anecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(new_anecdote)
    dispatch({
      type: 'new_anecdote',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = (anecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch({
      type: 'init_anecdote',
      data: anecdote
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  //console.log(action.type)
  
  switch(action.type){
    case 'new_anecdote':
      return [...state, action.data]
    case 'init_anecdote':
      return action.data
    case 'vote':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      const currentState = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )

      return currentState
      
    default: return state
  }


  return state
}

export default reducer