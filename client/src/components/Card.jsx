import React, { useState } from 'react'

import axe from '../utils/api'
import '../styles/Card.css'

const Card = ({ todo }) => {
  const { text, description } = todo
  const [completed, setCompleted] = useState(todo.completed)
  const [deleted, setDeleted] = useState(false)

  const handleComplete = async () => {
    const res = await axe.put(`/todos/${todo._id}`)
    setCompleted(res.data.completed)
  }

  const handleDelete = async () => {
    try {
      await axe.delete(`/todos/${todo._id}`)
      setDeleted(true)
    } catch (err) {}
  }

  return (
    <div className={`card ${deleted ? 'delete' : ''}`}>
      <div className="tags">
        <div className="left"></div>
        <div className="right"></div>
      </div>
      <div className="card__container">
        <div className="line"></div>
        <div className="content">
          <h2 className={completed ? 'strike' : ''}>{text}</h2>
          <p className={completed ? 'strike' : ''}>{description}</p>
          <div className="card__controls">
            <button className="btn_complete" onClick={handleComplete}>
              complete
            </button>
            <button className="btn__delete" onClick={handleDelete}>
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
