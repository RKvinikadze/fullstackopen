const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs)
    {
        blogs = blogs.map(x=>x.likes)
        return blogs.reduce((a, b) => a + b)
    }
    return 0
}

const favoriteBlog = (blogs) => {
    if (blogs)
    {
        let mostLiked = blogs[0]
        for (let i=0; i < blogs.length; i++)
            if (mostLiked.likes < blogs[i].likes)
                mostLiked = blogs[i]
        return {
            "title": mostLiked.title,
            "author": mostLiked.author,
            "likes": mostLiked.likes
        }
    }
    return 0 
}

const mostBlogs = (blogs) => {
    if (blogs){
        let tmp = _.countBy(blogs, 'author')
        let arr = []
        _.forEach(tmp, (blogs, author) => {
            arr.push({
                "author": author,
                "blogs": blogs
            })
        })
        return _.orderBy(arr, ['blogs'], ['desc'])[0]
    }
    return 0
}

const mostLikes = (blogs) => {
    if (blogs){
        let tmp = _.groupBy(blogs, 'author')
        let arr = []
        _.forEach(tmp, (blogs, author)=>{
            arr.push({
                "author": author,
                "likes": _.sumBy(blogs, 'likes')
            })
        })
        return _.orderBy(arr, ['likes'], ['desc'])[0]
    }
    return 0
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}