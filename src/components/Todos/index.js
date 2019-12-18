import React, { useState } from 'react'

import Todo from './Todo'
import TodoForm from './TodoForm'
import { StyledLabel, StyledPaper, StyledWrapper } from './styled'

const Todos = () => {
	const [showCompleted, setShowCompleted] = useState(true)
	const [todos, setTodos] = useState([])
	const handleSubmit = async (text) => {
		const todo = {
			id: String(Date.now()),
			text,
			completed: false,
		}
		setTodos([...todos, todo])
	}
	const handleClick = async (id, completed) => {
		setTodos(todos.map((todo) =>
			todo.id === id ? { ...todo, completed } : todo
		))
	}

	return (
		<StyledWrapper data-testid="todos">
			<TodoForm handleSubmit={ handleSubmit } />
			<StyledLabel htmlFor="showCompleted">
				Show Completed:{ ' ' }
				<input
					checked={ showCompleted }
					id="showCompleted"
					onChange={ () => setShowCompleted(!showCompleted) }
					type="checkbox"
				/>
			</StyledLabel>
			<StyledPaper data-testid="paper">
				{ todos.map((todo) => (
					<Todo handleClick={ handleClick } key={ todo.id } { ...todo } />
				)) }
			</StyledPaper>
		</StyledWrapper>
	)
}

export default Todos
