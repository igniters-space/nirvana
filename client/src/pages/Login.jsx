import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../state/authState'

const Login = () => {
  const history = useHistory()
  const login = useAuth((s) => s.login)
  const authUser = useAuth((s) => s.authUser)
  const [isLoading, setIsLoading] = useState(false)
  const setAuthUser = useAuth((s) => s.setAuthUser)
  const setIsAuthenticated = useAuth((s) => s.setIsAuthenticated)

  const [data, setData] = useState({
    email: 'sairaj2119@gmail.com',
    password: 'asdfaa',
  })

  useEffect(() => {
    if (authUser) history.push('/dash')
  }, [authUser, history])

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const user = await login(data)
      if (user) {
        setAuthUser(user)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      setIsAuthenticated(false)
      console.log(error)
    }
    setIsLoading(false)
  }
  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login
