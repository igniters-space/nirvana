import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import axe from '../utils/api'
import '../styles/Todos.css'
import { useAuth } from '../state/authState'
import Card from '../components/Card'

const Todos = () => {
  const history = useHistory()
  const [data, setData] = useState({
    text: '',
    description: '',
  })
  const [loading, setLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const authUser = useAuth((s) => s.authUser)
  const isAuthenticated = useAuth((s) => s.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated) history.push('/login')
  }, [isAuthenticated, history])

  useEffect(() => {
    if (authUser) {
      ;(async () => {
        try {
          const res = await axe.get('/todos')
          setTodos(res.data.todos)
        } catch (err) {
          console.log('error in getting todos')
        }
      })()
    }
    setLoading(false)
  }, [authUser])

  const handleTodoCreate = async (e) => {
    e.preventDefault()

    if (data.text.trim() === '' || data.description.trim() === '') return
    console.log(data)
    try {
      const res = await axe.post('/todos', { ...data })
      setTodos((todos) => [res.data, ...todos])
      setData({ text: '', description: '' })
    } catch (err) {
      console.log(err)
      console.log(err.response.message)
    }
  }
  const handleChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  console.log(todos)

  if (loading) return <h1>Loading...</h1>

  return (
    <div className="todo">
      <div className="todo__left">
        <div className="todoForm__container">
          <h1>Add Todo</h1>
          <form onSubmit={handleTodoCreate}>
            <div className="todoForm__group">
              <label htmlFor="text">Todo</label>
              <input
                type="text"
                id="text"
                value={data.text}
                onChange={handleChange}
                name="text"
                placeholder="todo"
              />
            </div>
            <div className="todoForm__group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                value={data.description}
                onChange={handleChange}
                name="description"
                placeholder="description"
              />
            </div>
            <div className="todoForm__submit">
              <button>Add Todo</button>
            </div>
          </form>
        </div>
      </div>
      <div className="todo__right">
        {todos.length > 0 && <h1>Your Todos</h1>}
        <div className="cards__container">
          {todos.length > 0 ? (
            todos.map((todo) => <Card key={todo.id} todo={todo} />)
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1 style={{ fontSize: '5rem', color: '#1d3557' }}>No ToDos</h1>
              <h4 style={{ fontSize: '3rem', marginTop: '2rem' }}>
                Click on Add Todo to add a few :)
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Todos
