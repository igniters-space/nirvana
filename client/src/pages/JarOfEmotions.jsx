import React from 'react'
import '../styles/JarOfEmotions.css'
import NoteModal from '../components/NoteModal'

const JarOfEmotions = () => {
  return (
    <div className="jar">
      <h1> Add your emotions in the jars </h1>
      <div className="jar__row">
        <div className="jar__column1">
        <img className="blueJar" src="/blue-jar.svg" alt="JarOfHappiness"/>
        <NoteModal Title = "Jar Of Happiness" titlePH="Title for description" descriptionPH="You can add your happy moments, quotes that inspire you, things you are grateful for or incidents that bring a smile on your face"/>
         </div>
        <div className="jar__column2">
        <img className="redJar" src="/red-jar.svg" alt="JarOfSadness"/>
        <NoteModal Title = "Jar Of Sadness" titlePH="Relevant Title" descriptionPH="You can add few reasons for your failure or what you would like to learn and change from the incident"/>
        </div>
      </div>
    </div>
    );
}

export default JarOfEmotions