import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  
async function handleLogin(event) {
  event.preventDefault()
  setError('')

  const credentials = btoa(`${username}:${password}`)

  try {
    const response = await fetch('/api/departments', {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    })

    if (response.ok) {
      alert('Login successful!')
    } else if (response.status === 401) {
      setError('Invalid username or password')
    } else {
      setError('Unable to log in. Please try again.')
    }
  } catch  {
    setError('Cannot connect to the server')
  }
}


  return (
    <div className = "login-container">
      <form className = "login-form" onSubmit={handleLogin}>
        <h1>Employee Management System</h1>
        <p>Please sign in to continue.</p>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} 
        <button type="submit">Sign in</button>
      </form>
    </div>

        
  )

}

export default App