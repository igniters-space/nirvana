import React from 'react'
import '../styles/JarOfEmotions.css'

const JarOfEmotions = () => {
  return (
    <div className="jar">
      <h1> Add your emotions to jar </h1>
      <div className="jar__row">
        <div className="jar__column1">
          <img className="blueJar" src="/blue-jar.svg" alt="JarOfHappiness" />
          <button type="button" className="blueJarBtn">
            Add note
          </button>
        </div>
        <div className="jar__column2">
          <img className="redJar" src="/red-jar.svg" alt="JarOfSadness" />
          <button type="button" className="redJarBtn">
            Add note
          </button>
        </div>
      </div>
    </div>
  )
}

export default JarOfEmotions
