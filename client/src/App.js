import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import axe from './utils/api'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const App = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('token')
      if (token) {
        axe.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
        }

        try {
          const res = await axe.get('/users/authuser')
          setUser(res.data)
        } catch (err) {
          setUser(null)
          localStorage.removeItem('token')
        }
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })()
  }, [])

  console.log(user)

  if (isLoading) return <h1>Loading...</h1>

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <div style={{ width: '80%', margin: '1rem auto 0 auto' }}>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export default App
