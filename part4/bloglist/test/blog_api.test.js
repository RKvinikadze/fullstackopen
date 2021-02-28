const { isArguments } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { resource } = require('../app')
const app = require('../app')
const { init } = require('../models/blog')
const blogHelper = require('../utils/blogs_api_helper')
const userHelper = require('../utils/users_api_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    let first = new Blog(blogHelper.allBlogs[0])
    await first.save()
    let second = new Blog(blogHelper.allBlogs[1])
    await second.save()
})

const token = async () =>{ 
    const res = await api.post('/api/login').send({username: "first", password: "first"})
    return res.body.token
}


describe('easy tests', () => {
    test('amount of blog posts in the Json', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogHelper.allBlogs.length)

        if (response.body.length !== 0){
            await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        }
    })
    

    test('unique identifier of the blog posts is named "id"', async () => {
        const response = await api.get('/api/blogs')
    
        if (response.body.length !== 0){
            expect(response.body[0].id).toBeDefined()
        }
    })

    
    test('successfully added blog', async () => {

        const newBlog = {   
            title: "qwerty",
            author: "romiko",
            url: "qwerty.com",
            likes: 189
        }

        
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: "bearer " +  await token() })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const res = await api.get('/api/blogs')
        console.log(res.body)
        expect(res.body).toHaveLength(blogHelper.allBlogs.length + 1)
    })
})



describe('handling missing errors', () => {
    test('if "likes" property is missing from request, it has default value 0',  async () => {
        const newBlog = {   
            title: "qwerty",
            author: "romiko",
            url: "qwerty.com",
        }
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: "bearer " + await token() })
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const res = await api.get('/api/blogs')
        const newObj = res.body.filter(blog => blog.title === newBlog.title)
    
        if(!newBlog.likes){
            expect(newObj[0].likes === 0)
        }
    })
    
    
    test('missing "title" or "url"', async () => {
        const newBlog = {   
            author: "romiko",
            url: "qwertyoio.com",
            likes: 189
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('token missing error', async () => {
        const newBlog = {   
            title: "qwerty",
            author: "romiko",
            url: "qwerty.com",
            likes: 189
        }

        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

})


describe('delete and update in the database', () => {
    test("successfully deleted blog from database", async () => {
        const response = await api.post('/api/blogs')
        .send({   
            title: "qwerty",
            author: "romiko",
            url: "qwerty.com",
            likes: 189
        })
        .set({ Authorization: "bearer " + await token() })
        
        const id = response.body.id
        console.log(typeof(id))
    
        await api
        .delete(`/api/blogs/${id}`)
        .set({ Authorization: "bearer " + await token() })
        .expect(204)

    })
    
    
    test("likes successfully updated in database", async () => {
        const res = await api.get('/api/blogs')
    
        const body = res.body[0]
    
        const blogForUpdate = {   
            author: body.author,
            url: body.url,
            title: body.title,
            likes: 1234,
        }
    
        await api
        .put(`/api/blogs/${body.id}`)
        .send(blogForUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
        const blogs = await api.get('/api/blogs')
        const check = blogs.body.filter(blog => blog.title === blogForUpdate.title)
    
        expect(check[0].likes === blogForUpdate.likes)
    
    })
})


afterAll(() => {
    mongoose.connection.close()
})