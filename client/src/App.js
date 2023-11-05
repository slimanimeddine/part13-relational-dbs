import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import logoutService from './services/logout'

import BlogShow from './components/BlogShow'
import LoginForm from './components/LoginForm'
import UserShow from './components/UserShow'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import NotificationMessage from './components/NotificationMessage'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(() => { // when app is loaded, check if user is logged in from localstorage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser') // get user from localstorage
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token) // set token to blogService
      return user
    }
    return null
  })

  const [notificationMessage, setNotificationMessage] = useState(null) // notification message
  const [errorHappened, setErrorHappened] = useState(false)

  const blogFormRef = useRef() // ref for Togglable component

  const sortBlogs = async () => { // sorting blogs
    const blogs = await blogService.getAll() // get all blogs
    blogs.sort((a, b) => b.likes - a.likes) // sort blogs by likes descending
    setBlogs(blogs) // set blogs 
  }

  const handleValidMessage = (message) => { // function for handling valid messages - green color
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleErrorMessage = (message) => { // function for handling error messages - red color
    setErrorHappened(true)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorHappened(false)
    }, 5000)
  }


  useEffect(() => {
    if (user) { // if user is logged in
      sortBlogs() // get all
    }
  }, []) // empty array as second parameter, so that the effect is only run along with the first render of the component



  const handleLogin = async (event) => { // function for handling login
    event.preventDefault()

    try {
      const user = await loginService.login({ // loginService login function
        username, password
      })

      window.localStorage.setItem( // set user to localstorage
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token) // set token to blogService

      setUser(user) // set user to state

      setUsername('') // set username and password to empty
      setPassword('')

      blogService.getAll().then(blogs => {// get all blogs
        setBlogs(blogs)
      }
      )

      handleValidMessage(`Welcome ${user.name}`)

    } catch (err) {
      handleErrorMessage('wrong username or password')
    }
  }


  


  const addBlog = async (blogObject) => { // function for adding a new blog
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      handleValidMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      sortBlogs() // sorting blogs after adding a new blog
    } catch (err) {
      handleErrorMessage('Blog could not be added')
    }
  }



  const handleLogout = async () => { // function for handling logout
    try {
      const result = await logoutService.logout(user.token) // logoutService logout function
      
      if (result.status === 204) {
        console.log('logged out')
      }
  
    } catch (err) {
      console.log(err)
      
    }
    
    window.localStorage.clear()
    setUser(null)
    handleValidMessage('logged out')

  }

  const handleBlogUpdate = async (blogId, updatedBlog) => { // function for handling blog update
    try {
      const blog = await blogService.update(blogId, updatedBlog) // update blog
      console.log('blog updated')
      handleValidMessage(`blog ${blog.title} by ${blog.author} updated`)
      return blog

    } catch (err) {
      handleErrorMessage('blog could not be updated')

    }
  }



  const handleBlogDelete = async (blog) => { // function for handling blog delete
    try {
      const result = await blogService.deleteBlog(blog.id) // delete blog by id
      if (result.status === 204) {
        handleValidMessage(`blog ${blog.title} by ${blog.author} deleted`)
        sortBlogs() // sorting blogs after deleting a blog
      }

    } catch (err) {
      handleErrorMessage('blog could not be deleted')
    }
  }


  // if user is not logged in, show login form and if user is logged in, show blogs
  return (
    <div>
      <div style={{ marginTop: notificationMessage === null ? "74px" : "0px" }}>
        <NotificationMessage notificationMessage={notificationMessage} errorHappened={errorHappened} />
      </div>

      {user === null ?

        <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> :

        <div id="allblogs">
          <h2>blogs</h2>
          <UserShow name={user.name} handleLogout={handleLogout} />


          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlogForm addBlog={addBlog}></NewBlogForm>
          </Togglable>


          <BlogShow blogs={blogs} updateBlog={handleBlogUpdate} deleteBlog={handleBlogDelete} user={user} />

        </div>}

    </div>)
}



export default App
