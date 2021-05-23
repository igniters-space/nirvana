import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Form.css'
import { useAuth } from '../state/authState'

const SignUp = () => {
  const history = useHistory()
  const signup = useAuth((s) => s.signup)
  const authUser = useAuth((s) => s.authUser)
  const [isLoading, setIsLoading] = useState(false)
  const setAuthUser = useAuth((s) => s.setAuthUser)
  const setIsAuthenticated = useAuth((s) => s.setIsAuthenticated)

  useEffect(() => {
    if (authUser) history.push('/todos')
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
    <div className="form__container">
      <form onSubmit={handleSignUp}>
        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={data.username}
            onChange={handleChange}
            name="username"
            placeholder="Jhon Doe"
          />
        </div>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            name="email"
            placeholder="jhondoe@gmail.com"
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={handleChange}
            name="password"
            placeholder="password"
          />
        </div>
        <div className="form__submit">
          <button>SignUp</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
