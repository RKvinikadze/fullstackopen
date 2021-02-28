const User = require('../models/user')

const getAll = async()=>{
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const allUsers = [
    {
        "username": "first",
        "name": "first",
        "password": "first"
    }
]

module.exports ={
    allUsers,
    getAll
}