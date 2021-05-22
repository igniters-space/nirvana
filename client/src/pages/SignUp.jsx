import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../state/authState'

const SignUp = () => {
  const history = useHistory()
  const signup = useAuth((s) => s.signup)
  const authUser = useAuth((s) => s.authUser)
  const [isLoading, setIsLoading] = useState(false)
  const setAuthUser = useAuth((s) => s.setAuthUser)
  const setIsAuthenticated = useAuth((s) => s.setIsAuthenticated)

  useEffect(() => {
    if (authUser) history.push('/dash')
  }, [authUser, history])

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSignUp = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const user = await signup(data)
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
      <form onSubmit={handleSignUp}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={data.username}
          onChange={handleChange}
          name="username"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={handleChange}
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={handleChange}
          name="password"
        />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
