import Blog from './Blog'


const BlogShow = ({ blogs, updateBlog, deleteBlog, user }) => {

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
    </div>
  )
}

export default BlogShow