const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { request } = require('express')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate({
        path: "blogs",
        select: {url: 1, title: 1, author: 1, comments: 1},
    })

    response.json(users.map(user => user.toJSON()))
})


usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if(body.password.length < 3){
        return response.status(400).send({error: 'password must have length at least 3'})
    }else{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        })

        try{
            const savedUser = await user.save()
            response.json(savedUser)
        }catch(error){
            next(error)
        }
    }
})

module.exports = usersRouter