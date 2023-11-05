import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (

    <form onSubmit={handleLogin}>

      <h2>Log in to application</h2>
      <div>
        username
        <input id="username" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
      </div>

      <div>
        password
        <input id="password" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
      </div>

      <button id="loginsubmit" type="submit">login</button>
    </form>
  )

}
LoginForm.displayName = 'LoginForm' // name of the component that is displayed in React developer tools

LoginForm.propTypes = { // loginform components prop types
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}


export default LoginForm
