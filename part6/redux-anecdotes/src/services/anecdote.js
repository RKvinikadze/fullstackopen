import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

const createNew = async (anecdote) => {
    const object = {
        content: anecdote,
        id: () => (100000 * Math.random()).toFixed(0),
        votes: 0
    }

    const response = await axios.post(baseUrl, object)
    
    return response.data
}

const update = async (updated_anecdote) => {
    const response = await axios.put(`${baseUrl}/${updated_anecdote.id}`, updated_anecdote)

    return response.data
}


export default {
    getAll,
    createNew,
    update
}