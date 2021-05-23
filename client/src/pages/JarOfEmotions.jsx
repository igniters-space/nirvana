import React, { useState } from 'react'
import '../styles/JarOfEmotions.css'

import NoteModal from '../components/NoteModal'
import axe from '../utils/api'

const JarOfEmotions = () => {
  const [hc, setHC] = useState({})
  const [sc, setSC] = useState({})
  const getOneHappy = async () => {
    setSC({})
    const res = await axe.get('/jars/happy/getone')
    setHC(res.data[0])
  }

  const getOneSad = async () => {
    setHC({})
    const res = await axe.get('/jars/sad/getone')
    setSC(res.data[0])
  }

  console.log(hc)
  return (
    <div className="jar">
      <h1> Add your emotions in the jars </h1>
      <div className="jar__row">
        <div className="jar__column1">
          <img
            onClick={getOneHappy}
            className="blueJar"
            src="/blue-jar.svg"
            alt="JarOfHappiness"
          />
          <NoteModal
            type="happy"
            Title="Jar Of Happiness"
            titlePH="Title for description"
            descriptionPH="You can add your happy moments, quotes that inspire you, things you are grateful for or incidents that bring a smile on your face"
          />
        </div>
        <div className="jar__column2">
          <img
            onClick={getOneSad}
            className="redJar"
            src="/red-jar.svg"
            alt="JarOfSadness"
          />
          <NoteModal
            type="sad"
            Title="Jar Of Sadness"
            titlePH="Relevant Title"
            descriptionPH="You can add few reasons for your failure or what you would like to learn and change from the incident"
          />
        </div>
      </div>
      <div style={{ width: '80%', margin: 'auto' }}>
        {Object.keys(hc).length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <h1>Here's your one of happy moments :) </h1>
            <div>
              <h3>{hc.title}</h3>
              <p>{hc.description}</p>
            </div>
          </div>
        )}
        {Object.keys(sc).length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <h1>Here's your one of sad moments :( </h1>
            <div>
              <h3>{sc.title}</h3>
              <p>{sc.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JarOfEmotions
