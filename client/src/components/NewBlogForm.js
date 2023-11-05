import { useState } from 'react'

const BlogForm = ({ addBlog }) => { 

  const [newtitle, setNewtitle] = useState('') // details of the new blog
  const [newauthor, setNewauthor] = useState('')
  const [newurl, setNewurl] = useState('')


  const addBlogHandle = (event) => { // function that handles adding a new blog
    event.preventDefault() 

    const newBlog =
    {
      title: newtitle,
      author: newauthor,
      url: newurl
    }

    addBlog(newBlog)

    setNewtitle('') // empty the title, author and url
    setNewauthor('')
    setNewurl('')
  }


  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={addBlogHandle}>

        <div>
          title:
          <input id="blogtitle"
            value={newtitle}
            onChange={({ target }) => setNewtitle(target.value)}
            className="titleInput"
          />
        </div>
        <div>
          author:
          <input id="blogauthor"
            value={newauthor}
            onChange={({ target }) => setNewauthor(target.value)}
            className="authorInput"
          />
        </div>

        <div>
          url:
          <input id="blogurl"
            value={newurl}
            onChange={({ target }) => setNewurl(target.value)}
            className="urlInput"
          />
        </div>

        <button id='blogsubmit' type="submit">save</button>
      </form>
    </div>
  )

}

export default BlogForm