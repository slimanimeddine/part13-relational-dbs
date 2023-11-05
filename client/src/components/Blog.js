import { useState, useEffect } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => { // component that renders a single blog
  
  const [isVisible, setIsVisible] = useState(false)

  const [bloglikes, setBloglikes] = useState(blog.likes)

  useEffect(() => {
    setBloglikes(blog.likes)
  }, [blog.likes])

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
    border: '1px solid pink',
    borderRadius: 5,
  }

  const handleVisibility = () => { // function that handles visibility of blog
    setIsVisible(!isVisible)
  }


  const handleLikes = async (event) => { // function that handles likes +1
    event.preventDefault()

    let updatedBlog = { 
      title: blog.title,
      author: blog.author,
      likes: bloglikes + 1,
      url: blog.url
    }

    const returnedBlog = await updateBlog(blog.id, updatedBlog) // update blog by id
    
    setBloglikes(returnedBlog.likes) // update blog likes in state
    

  }

  const handleRemove = (event) => { // function that handles blog removal
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlog(blog)
      }
      catch (error) {
        console.log(error)
      }
    }
  }



  return (
    <>
      <div style={blogStyle} className='blog'>
        {blog.title}{blog.title && blog.author ? ' - ' : ''}{blog.author}<button onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
        {isVisible ?
          <div>
            <div className="url">link: {blog.url}</div>
            <div className="likes">likes: {bloglikes}<button className="likebutton" onClick={handleLikes}>like</button></div>
          </div>
          : <></>
        }
        {blog.user && user && blog.user.username === user.username ? <button onClick={handleRemove}>remove</button> : <></>}
      </div>

    </>
  )

}

export default Blog