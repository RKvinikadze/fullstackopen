const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')


app.use(express.json())

app.use(cors())

app.use(express.static('build'))


morgan.token('body', (req, res) => {
    if  (req.method === 'POST'){
        return JSON.stringify(req.body)
    }else{
        return ''
    }
})

app.use(morgan(':method :url :status :response-time ms :body'))

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => {
        next(error)
    })
})

app.get('/info', (request, response, next) => {
    Person.find({}).then(person => {
        response.send(
            `<div>
                <p>Phonebook has info of ${person.length} person</p>
                <p>${new Date()}</p>
            </div>`
        )
    }).catch(error => {
        next(error)
    })
})

app.get('/api/persons/:id',(request,response,next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next ) => {
    Person.findByIdAndRemove(request.params.id).then( result => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const newPerson = {
        name : body.name,
        number : body.number
    }
    Person.findByIdAndUpdate(request.params.id,newPerson,{ new:true })
        .then(res => {
            response.json(res.toJSON())
        })
        .catch(error => {
            next(error)
        })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number,
    })
    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        return result.toJSON()
    }).then(savedPerson => {
        response.json(savedPerson)
    }).catch(error => {
        console.log(error)
        next(error)
    })
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})