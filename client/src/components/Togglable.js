import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'


const Togglable = forwardRef((props, ref) => { // props.children contains the content between the opening and closing tags of a component
  const [visible, setVisible] = useState(false) // hidden by default

  const hideWhenVisible = { display: visible ? 'none' : '' } 
  const showWhenVisible = { display: visible ? '' : 'none' } 

  const toggleVisibility = () => { // toggleVisibility function is used to toggle the visibility of the divs
    setVisible(!visible)

  }

  useImperativeHandle(ref, () => { // useImperativeHandle hook is used to allow the component to pass a ref to one of its children (Togglable)
    return {
      toggleVisibility // toggleVisibility function is used to toggle the visibility of the divs
    }
  })


  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>cancel</button>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable' // name of the component that is displayed in React developer tools


Togglable.propTypes = { // togglable components prop types
  buttonLabel: PropTypes.string.isRequired // buttonLabel is required and it's type is string
}

export default Togglable