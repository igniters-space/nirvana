import React from "react";  
//import components
import Todo from "./Todo";

const TodoList = ({todos,setTodos,filteredTodos,inputTodos,setInputTodos}) => {
    
    return ( 
    	<div className = "todo-container" >
        	<ul className = "todo-list" > 
        	{filteredTodos.map((todo,inputTodo) => (
        		<Todo
                    description = {inputTodo.description}
                    key = {todo.id,inputTodo.id}
                    inputTodo={inputTodo}
                    inputTodos = {inputTodos}
	                setTodos = {setTodos}
	                setInputTodos = {setInputTodos}
	                todo = {todo}
                    todos = {todos}
	                text = {todo.text} />
            ))
        }
        </ul> 
        </div>
    );
};

export default TodoList;