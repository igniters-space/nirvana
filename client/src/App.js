import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import JarOfEmotions from './pages/JarOfEmotions'
import { getUserData, useAuth } from './state/authState'
import Todos from './pages/Todos'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const setAuthUser = useAuth((s) => s.setAuthUser)
  const setIsAuthenticated = useAuth((s) => s.setIsAuthenticated)

  useEffect(() => {
    ;(async () => {
      try {
        const user = await getUserData()
        console.log(user)
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
    })()
  }, [setAuthUser, setIsAuthenticated])

  if (isLoading) return <h1> Loading... </h1>

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/main" component={JarOfEmotions} />
        <Route path="/todos" component={Todos} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
