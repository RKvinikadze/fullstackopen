const Blog = require('../models/blog')

const getAll = async()=>{
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const allBlogs = [
    {
        title: "my blog",
        author: "romiko",
        url: "romiko123.co",
        likes: 999,
    },
    {
        title: "my blog 2",
        author: "romikooo",
        url: "romiko123456.co",
        likes: 1023,
    }
]

module.exports ={
    allBlogs,
    getAll
}