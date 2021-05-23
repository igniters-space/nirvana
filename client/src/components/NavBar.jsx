import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/NavBar.css'

const NavBar = () => {
  const history = useHistory()

  const pushTo = (path) => {
    history.push(path)
  }

  return (
    <header className="navbar">
      <nav className="navbar__container">
        <h1 onClick={() => pushTo('/')}>NIRVANA</h1>
        <ul className="navbar__links">
          <li className="navbar__link" onClick={() => pushTo('/signup')}>
            SignUp
          </li>
          <li className="navbar__link" onClick={() => pushTo('/login')}>
            Login
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
