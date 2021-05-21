import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header style={{ background: 'lightgray', height: '7vh' }}>
      <nav
        style={{
          width: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '100%',
        }}
      >
        <h1>
          <Link to="/">LOGO</Link>
        </h1>
        <ul
          style={{
            display: 'flex',
            listStyleType: 'none',
            width: '10%',
            justifyContent: 'space-between',
          }}
        >
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
