import React from 'react'
import About from './About'
import '../styles/Home.css'

const Home = () => {
  return (
    <div>
      <div className="Landing">
        <img src="/logo.jpg" alt="logo" />
        <h1>NIRVANA</h1>
        <p>Your gateway to happiness</p>
      </div>

      <About />
    </div>
  )
}

export default Home
