import React from "react";
import ReactDOM from "react-dom";
import '../App.css';

const Form =(props)=>{
	
	const inputTextHandler=(element)=>{props.setInputText(element.target.value);};

	const inputDescriptionHandler=(element)=>{props.setInputDescription(element.target.value);};

	const submitTodoApp=(e)=>{	
		e.preventDefault();
		props.setTodos([
			...props.todos,
			{text:props.inputText,completed:false,id:Math.random()*1000}
			]);  
		props.setInputTodos([
			...props.inputTodos,
			{description:props.inputDescription,completed:false,id:Math.random()*1000}
			]);
		props.setInputText("");
		props.setInputDescription("");
	};

	const statusHandler=(element)=>props.setStatus(element.target.value);
	
	return (
		<form>
			<input value={props.inputText} onChange={inputTextHandler} type="text" className="todo-input"/>
			<input value={props.inputDescription} onChange={inputDescriptionHandler} type="text" className="todo-description"/>
			<button onClick={submitTodoApp} className="todo-button" type="submit">
				<i className="fas fa-plus-square"></i>
			</button>
			<div className="select">
				<select onChange={statusHandler} name="todos,inputTodos" className="filter-todo">
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="uncompleted">uncompleted</option>
				</select>
			</div>
		</form>
	);
};

export default Form;