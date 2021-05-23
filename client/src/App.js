import React,{ useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { getUserData, useAuth } from './state/authState'

import Form from './components/Form.js'
import TodoList from './components/TodoList.js'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const setAuthUser = useAuth((s) => s.setAuthUser)
  const setIsAuthenticated = useAuth((s) => s.setIsAuthenticated)

  //Todo app 
  
  //States
  const[inputText,setInputText]=useState("");
  const[todos,setTodos]=useState([]);

  const [inputDescription,setInputDescription]=useState("");
  const[inputTodos,setInputTodos]=useState([]);

  const[status,setStatus]=useState("all");
  const [filteredTodos,setFilteredTodos]=useState([]);

  //Runs ones when the appstart
  useEffect(()=>{getLocalTodos();},[]); 

  //use effect
  useEffect(()=>{filterHandler(); saveLocalTodos();},[todos,status],[inputTodos,status]);
  //Functions
  const filterHandler=()=>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo=>todo.completed===true),
                        inputTodos.filter(inputTodos=>inputTodos.completed===true));
        break;
        
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo=>todo.completed===false),
                        inputTodos.filter(inputTodos=>inputTodos.completed===false));
        break;

      default:
        setFilteredTodos(todos,inputTodos);
        break;
    }
    };
    //save to local
    const saveLocalTodos=()=>{
        localStorage.setItem("todos,inputTodos",JSON.stringify(todos,inputTodos));
    };
    const getLocalTodos=()=>{
      if(localStorage.getItem("todos")===null  && localStorage.getItem("inputTodos")===null){
          localStorage.setItem("todos,inputTodos",JSON.stringify([]));
      }
      else{
       let todoLocal= JSON.parse(localStorage.getItem('todos,inpuTodos'));
       setTodos(todoLocal);
      }
    };
  //ends todo

  useEffect(() => {
    ;(async () => {
      try {
        const user = await getUserData()
        console.log(user)
        if (user) {
          setAuthUser(user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
        console.log(error)
      }
      setIsLoading(false)
    })()
  }, [setAuthUser, setIsAuthenticated])

  if (isLoading) return <h1>Loading...</h1>

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <div style={{ width: '80%', margin: '1rem auto 0 auto' }}>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/Form">
            <Form 
              inputText={inputText} 
              inputDescription={inputDescription}
              inputTodos={inputTodos}
              setTodos={setTodos} 
              setInputTodos={setInputTodos}
              setInputText={setInputText}
              setInputDescription={setInputDescription}
              setStatus={setStatus}
              todos={todos}
            />
            <TodoList 
              filteredTodos={filteredTodos}
              inputTodos={inputTodos}
              setInputTodos={setInputTodos}
              setTodos={setTodos} 
              todos={todos}
              inputDescription={inputDescription}
            /> 
          </Route>
          </div>
      </Switch>
    </BrowserRouter>
    
  )
}

export default App
