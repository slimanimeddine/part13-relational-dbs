const readinglistRouter = require('express').Router()
const { Readinglist } = require('../models')
const { Blog } = require('../models')
const { tokenExtractor, userExtractor } = require('../utils/middleware')

readinglistRouter.get('/', async (request, response, next) => {

  try {
    const readinglists = await Readinglist.findAll({})
    console.log(JSON.stringify(readinglists, null, 2))
    return response.status(200).json(readinglists)
  }
  catch (error) {
    next(error)
  }
})


readinglistRouter.post('/', tokenExtractor, userExtractor, async (request, response, next) => {

  if (request.body.user_id !== request.user.id) {
    console.log('user id does not match')
    return response.status(400).json({ error: 'user id does not match' })
  }

  const blog = Blog.findByPk(request.body.blog_id)

  if (!blog) {
    console.log('blog does not exist')
    return response.status(400).json({ error: 'blog does not exist' })
  }

  const body = request.body

  const newReadinglist = {
    title: body.title,
    blogId: body.blog_id,
    userId: body.user_id
  }

  try {
    const reading_list = await Readinglist.create(newReadinglist)
    console.log(`saved reading_list: ${JSON.stringify(reading_list, null, 2)}`)
    return response.status(201).json(reading_list)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

readinglistRouter.put('/:id', tokenExtractor, userExtractor, async (request, response, next) => {

  try {
    const readinglist = await Readinglist.findByPk(request.params.id)

    if (readinglist === null) {
      return next('readinglist could not be found by id')
    }

    if (readinglist.userId !== request.user.id) {
      return response.status(400).json({ error: 'user has no permission to update readinglist' })
    }

    readinglist.read = !readinglist.read

    await readinglist.save()

    console.log(JSON.stringify(readinglist, null, 2))
    return response.status(200).json(readinglist)

  } catch (error) {
    next(error)
  }
})



module.exports = readinglistRouter