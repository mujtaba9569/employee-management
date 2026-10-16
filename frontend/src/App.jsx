
import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/departments', {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password),
        },
      })

      if (response.ok) {
        const data = await response.json()
        setDepartments(data)
        setIsLoggedIn(true)
      } else if (response.status === 401) {
        setError('Invalid username or password')
      } else {
        setError('Unable to log in. Please try again.')
      }
    } catch {
      setError('Cannot connect to the server')
    }
  }

  async function handleDepartmentChange(event) {
    const departmentId = event.target.value

    setSelectedDepartment(departmentId)
    setEmployees([])
    setError('')

    if (!departmentId) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `/api/employees?departmentId=${departmentId}`,
        {
          headers: {
            Authorization: 'Basic ' + btoa(username + ':' + password),
          },
        }
      )

      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      } else {
        setError('Unable to load employees')
      }
    } catch {
      setError('Cannot connect to the server')
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setDepartments([])
    setSelectedDepartment('')
    setEmployees([])
    setError('')
    setLoading(false)
  }

  if (isLoggedIn) {
    return (
      <div className="login-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1>Employee Dashboard</h1>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          <label htmlFor="department">Select Department</label>

          <select
            id="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
          >
            <option value="">Choose a department</option>

            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          {selectedDepartment && (
            <div className="employee-list">
              <h2>Employees</h2>

              {loading ? (
                <p>Loading employees...</p>
              ) : employees.length > 0 ? (
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((employee) => (
                        <tr key={employee.id}>
                          <td>{employee.id}</td>
                          <td>{employee.name}</td>
                          <td>{employee.department}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : !error ? (
                <p>No employees to display.</p>
              ) : null}
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Employee Management</h1>
        <p>Please log in to continue</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default App
