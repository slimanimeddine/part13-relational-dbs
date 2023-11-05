const authorRouter = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../utils/database')

authorRouter.get('/', async (request, response, next) => {

  try {
    const authors = await Blog.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('author')), 'blogs'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        'author'

      ],
      group: ['author'],
      order: [
        [sequelize.col('likes'), 'DESC']
      ]
    })
    
    const formatResult = authors.map(author => {
      return {
        author: author.dataValues.author,
        blogs: author.dataValues.blogs.toString(),
        likes: author.dataValues.likes.toString()
      }
    })

    console.log(JSON.stringify(formatResult, null, 2))
    return response.status(200).json(formatResult)
  }
  catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = authorRouter