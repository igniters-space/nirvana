import React from 'react';

const Todo=({text,todo,todos,inputTodo,setTodos,setInputTodos,inputTodos,description})=>{
	//Events
	const deleteHandler=()=>{
		setTodos(todos.filter((item) =>item.id !== todo.id));
		setInputTodos(inputTodos.filter((item) =>item.id !== inputTodo.id));
	};

	const completeHandler=()=>{
		setTodos(todos.map((item)=>{
			if(item.id===todo.id){
				return{...item,completed:!item.completed}}
			return item;}));
		setInputTodos(inputTodos.map((description)=>{
				if(description.id===inputTodo.id){
					return{	...description,completed:!description.completed}}
				return description;
			})
		);
	};

	return(
		<div className="App">
	     	<div className="card">
			    <div className="tags">
			    <div className="left" /> 
			    <div className="right" />
		  	</div>  
			 <div className="card__container">
			   	<div className="line"></div>
			      	<div className="content">
					     <h1 className={'todoo-items ${todo.completed ?"completed":""}'}>{text}</h1>
					     <h4 className={'todoo-items ${inputTodo.completed ?"completed":""}'}>{description}</h4>
	  				</div>
	  				</div>
				    <button onClick={completeHandler} className="complete-btn">Mark as Done</button>
					<button onClick={deleteHandler}  className="trash-btn"><i className="fas fa-trash"></i></button>
			</div>
	    </div>
		);
};

export default Todo;