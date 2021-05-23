import React from 'react'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../state/authState'
import '../styles/NavBar.css'

const NavBar = () => {
  const history = useHistory()
  const isAuthenticated = useAuth((s) => s.isAuthenticated)
  const setAuthUser = useAuth((s) => s.setAuthUser)
  const authUser = useAuth((s) => s.authUser)
  const setIsAuthenticated = useAuth((s) => s.setIsAuthenticated)

  const pushTo = (path) => {
    history.push(path)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthUser(null)
    setIsAuthenticated(false)
    history.push('/')
  }

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <h1 onClick={() => pushTo('/')}>NIRVANA</h1>
        <ul className="navbar__links">
          {isAuthenticated ? (
            <>
              <li className="navbar__link" style={{ cursor: 'inherit' }}>
                hi! {authUser.username}
              </li>
              <li
                className="navbar__link"
                onClick={() => history.push('/main')}
                Jars
              >
                Jars
              </li>
              <li
                className="navbar__link"
                onClick={() => history.push('/todos')}
              >
                Todos
              </li>

              <li className="navbar__link" onClick={handleLogout}>
                LogOut
              </li>
            </>
          ) : (
            <>
              <li className="navbar__link" onClick={() => pushTo('/signup')}>
                SignUp
              </li>
              <li className="navbar__link" onClick={() => pushTo('/login')}>
                Login
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
