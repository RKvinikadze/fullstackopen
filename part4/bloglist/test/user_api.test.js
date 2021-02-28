const supertest = require('supertest')
const User = require('../models/User')
const usersHelper = require('../utils/users_api_helper')
const app = require('../app')
const api = supertest(app)
const mongoose = require('mongoose')

beforeEach(async ()=>{
    await User.deleteMany({})

    await api.post('/api/users')
    .send({
        username: usersHelper.allUsers[0].username,
        name: usersHelper.allUsers[0].name,
        password: usersHelper.allUsers[0].password
    })
})

describe('adding invalid user to database', () => {
    test('test error for invalid password' , async()=>{
        const newuser = {
            username : "romikooo11",
            name : "romiko",
            password : "rk"
        }
        const resp = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })

    test('test error for invalid username' , async()=>{
        const newuser = {
            username : "ro",
            name : "romiko",
            password : "rkfsaf"
        }
        const resp = await api
        .post('/api/users')
        .send(newuser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongoose.connection.close()
}) 