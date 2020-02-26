describe('Todos', () => {
	it('should add a todo', () => {
		const todoText = 'Write first Cypress test'

		cy.visit('/')
			.addTodo(todoText)
			.findByText(todoText)
			.should('be.visible')
			.findByPlaceholderText(/add todo/i)
			.should('have.value', '')
	})

	it('should toggle a todo status', () => {
		const todoText = 'Toggle this task'

		cy.visit('/')
			.addTodo(todoText)
			.findByText(todoText)
			.should('not.have.css', 'text-decoration-line', 'line-through')
			.click()
			.should('have.css', 'text-decoration-line', 'line-through')
			.click()
			.should('not.have.css', 'text-decoration-line', 'line-through')
	})

	it('should hide a completed todo', () => {
		const incompleteTodoText = 'A task to leave incomplete'
		const completedTodoText = 'A task to complete'

		cy.visit('/')
			.addTodo(incompleteTodoText)
			.addTodo(completedTodoText)
			.toggleTodo(completedTodoText)
			.findByLabelText(/show completed/i)
			.click()
			.findByText(incompleteTodoText)
			.should('be.visible')
			.findByText(completedTodoText)
			.should('not.be.visible')
	})
})
