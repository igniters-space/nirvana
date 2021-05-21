import { useRef } from 'react'
import './App.css'

import axe from './utils/api'

const App = () => {
  const eRef = useRef()
  const pRef = useRef()
  const uRef = useRef()
  const handleSub = (e) => {
    e.preventDefault()
    const user = {
      username: uRef.current.value,
      email: eRef.current.value,
      password: pRef.current.value,
    }
    const res = axe.post('/auth/signup', user)
    console.log(res.data)
  }
  return (
    <div>
      <form onSubmit={handleSub}>
        <input type="text" defaultValue="saira" ref={uRef} />
        <input type="email" defaultValue="sairaj2119@gmail.com" ref={eRef} />
        <input type="password" defaultValue="asdfaa" ref={pRef} />
        <button>sumbit</button>
      </form>
    </div>
  )
}

export default App
