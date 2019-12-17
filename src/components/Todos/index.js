import React from 'react'

import Todo from './Todo'
import TodoForm from './TodoForm'
import { StyledLabel, StyledPaper, StyledWrapper } from './styled'

class Todos extends React.Component {
	constructor() {
		super()

		this.handleClick = this.handleClick.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	state = {
		showCompleted: true,
		todos: [],
	}

	async handleClick(id, completed) {
		this.setState(({ todos }) => ({
			todos: todos.map((todo) =>
				todo.id === id ? { ...todo, completed } : todo
			),
		}))
	}

	async handleSubmit(text) {
		const todo = {
			id: String(Date.now()),
			text,
			completed: false,
		}
		this.setState(({ todos }) => ({ todos: [...todos, todo] }))
	}

	render() {
		const { showCompleted, todos } = this.state

		return (
			<StyledWrapper data-testid="todos">
				<TodoForm handleSubmit={this.handleSubmit} />
				<StyledLabel htmlFor="showCompleted">
					Show Completed:{' '}
					<input
						checked={showCompleted}
						id="showCompleted"
						onChange={() => this.setState({ showCompleted: !showCompleted })}
						type="checkbox"
					/>
				</StyledLabel>
				<StyledPaper data-testid="paper">
					{todos.map((todo) => (
						<Todo handleClick={this.handleClick} key={todo.id} {...todo} />
					))}
				</StyledPaper>
			</StyledWrapper>
		)
	}
}

export default Todos
