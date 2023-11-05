
const Blog = require('./server/models/blog.js')
const { sequelize } = require('./server/utils/database.js')

const findBlogs = async () => {
  const blogs = await Blog.findAll()
  blogs.map(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`))
  sequelize.close()
}
findBlogs()








